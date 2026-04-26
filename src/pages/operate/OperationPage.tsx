import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  Activity,
  UserPlus,
  RefreshCw,
  CheckCircle2,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";

import {
  useGetMembers,
  useCreateMember,
  useRenewMember,
} from "../../hooks/useMembersApi";
import { useRecordPayment } from "../../hooks/usePaymentsApi";
import { useRecordSession } from "../../hooks/useSessionsApi";

export const OperationPage = () => {
  const [activeTab, setActiveTab] = useState("check-in"); // Default to check-in for speed!
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: members, isLoading: loadingMembers } = useGetMembers();
  const { mutateAsync: renewMember } = useRenewMember();
  const { mutateAsync: createMember } = useCreateMember();
  const { mutateAsync: recordPayment } = useRecordPayment();
  const { mutateAsync: recordSession } = useRecordSession();

  // Form setups
  const {
    handleSubmit: handleCheckIn,
    control: checkInControl,
    reset: resetCheckIn,
  } = useForm();
  const {
    register: regDropIn,
    handleSubmit: handleDropIn,
    reset: resetDropIn,
  } = useForm();
  const {
    register: regNewMember,
    handleSubmit: handleNewMember,
    reset: resetNewMember,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      contact: "",
      email: "",
      age: "",
      sex: "",
      method: "Cash",
      amount: "",
    },
  });
  const {
    handleSubmit: handleRenewal,
    control: renewControl,
    register: regRenew,
    reset: resetRenew,
  } = useForm({ defaultValues: { method: "Cash", member_id: "", amount: "" } });

  // Watch the selected member for Check-in to show their status
  const selectedCheckInMemberId = useWatch({
    control: checkInControl,
    name: "member_id",
  });
  const selectedCheckInMember = members?.find(
    (m) => m.id === selectedCheckInMemberId,
  );
  // ==========================================
  // TRANSACTION HANDLERS
  // ==========================================
  const onCheckInSubmit = async (data: any) => {
    setIsProcessing(true);

    recordSession(
      { type: "member", member_id: data.member_id },
      {
        onSuccess: () => {
          resetCheckIn();
          setIsProcessing(false);
        },
      },
    );
  };

  const onDropInSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      await recordSession({ type: "single", visitor_name: data.visitorName });

      await recordPayment({
        type: "single_session",
        method: data.method,
        amount: Number(data.amount),
        payor_name: data.visitorName,
        notes: "Walk-in session",
      });

      resetDropIn();
    } catch {
      toast.error("Transaction failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onNewMemberSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      // Step 1: Create the member
      const newMember = await createMember({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        contact_number: data.contact,
        sex: data.sex,
        age: Number(data.age) || undefined,
      });

      // Step 2: Record their initial payment using the ID returned from Step 1
      await recordPayment({
        type: "new_membership",
        method: data.method,
        amount: Number(data.amount),
        member_id: newMember.id, // Assuming backend returns the created member object
        payor_name: `${data.firstname} ${data.lastname}`,
      });

      resetNewMember();
    } catch {
      toast.error("Failed to complete the registration workflow.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onRenewalSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      await renewMember({ id: data.member_id });
      await recordPayment({
        type: "membership_renewal",
        method: data.method,
        amount: Number(data.amount),
        member_id: data.member_id,
      });
      resetRenew();
    } catch {
      toast.error("Renewal transaction failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-card grid h-14 w-full grid-cols-4 border shadow-sm">
        {/* NEW TAB TRIGGER */}
        <TabsTrigger
          value="check-in"
          className="text-sm data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          <UserCheck className="mr-2 h-4 w-4" /> Check-in
        </TabsTrigger>
        <TabsTrigger
          value="drop-in"
          className="text-sm data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          <Activity className="mr-2 h-4 w-4" /> Walk-in
        </TabsTrigger>
        <TabsTrigger
          value="new-member"
          className="text-sm data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Register
        </TabsTrigger>
        <TabsTrigger
          value="renew"
          className="text-sm data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Renew
        </TabsTrigger>
      </TabsList>

      {/* 1. MEMBER CHECK-IN */}
      <TabsContent value="check-in">
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>Member Check-in</CardTitle>
            <CardDescription>
              Record a daily gym entry for an existing active member.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleCheckIn(onCheckInSubmit)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label>Select Member *</Label>
                <Controller
                  control={checkInControl}
                  name="member_id"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-14 text-lg">
                        <SelectValue
                          placeholder={
                            loadingMembers
                              ? "Loading..."
                              : "Search member by name..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {members?.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name} {m.isActive ? "" : "(Expired)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Dynamic Status UI */}
              {selectedCheckInMember && (
                <div
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    selectedCheckInMember.isActive
                      ? "border-emerald-500/20 bg-emerald-500/10"
                      : "border-red-500/20 bg-red-500/10"
                  }`}
                >
                  <div>
                    <h4 className="font-semibold">
                      {selectedCheckInMember.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedCheckInMember.days_remaining} days remaining
                    </p>
                  </div>
                  <div>
                    {selectedCheckInMember.isActive ? (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <AlertTriangle className="h-3 w-3" /> Expired
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={
                  isProcessing ||
                  !selectedCheckInMember ||
                  !selectedCheckInMember.isActive
                }
                className="h-14 w-full bg-emerald-600 text-lg text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  "Recording..."
                ) : !selectedCheckInMember ? (
                  "Select Member to Continue"
                ) : !selectedCheckInMember.isActive ? (
                  "Cannot Check In (Expired)"
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Record Check-in
                  </>
                )}
              </Button>

              {/* Quick Action Helper */}
              {selectedCheckInMember && !selectedCheckInMember.isActive && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                  onClick={() => setActiveTab("renew")}
                >
                  Jump to Renewal Form
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 2. SINGLE SESSION (DROP-IN) */}
      <TabsContent value="drop-in">
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>Walk-in Day Pass</CardTitle>
            <CardDescription>
              Record a single session for a non-member visitor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDropIn(onDropInSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label>Visitor Name *</Label>
                <Input
                  placeholder=""
                  required
                  {...regDropIn("visitorName")}
                  className="h-12 text-lg"
                />
              </div>
              <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-lg border p-4">
                <div className="space-y-2">
                  <Label>Amount (₱) *</Label>
                  <Input
                    type="number"
                    placeholder="150"
                    required
                    {...regDropIn("amount")}
                    className="h-12 text-lg font-bold text-emerald-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <select
                    {...regDropIn("method")}
                    className="border-input bg-background flex h-12 w-full rounded-md border px-3 py-2 text-lg"
                  >
                    <option value="Cash">Cash</option>
                    <option value="GCash">GCash</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isProcessing}
                className="h-14 w-full bg-emerald-600 text-lg text-white hover:bg-emerald-700"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Complete
                    Transaction
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 3. NEW MEMBER REGISTRATION */}
      <TabsContent value="new-member">
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>Register New Member</CardTitle>
            <CardDescription>
              Capture details and record the initial membership payment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleNewMember(onNewMemberSubmit)}
              className="space-y-6"
            >
              {/* Member Details */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                  1. Member Details
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input required {...regNewMember("firstname")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input required {...regNewMember("lastname")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input required {...regNewMember("email")} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Contact</Label>
                    <Input {...regNewMember("contact")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input type="number" {...regNewMember("age")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sex</Label>
                    <select
                      {...regNewMember("sex")}
                      className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm"
                    >
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                  2. Initial Payment
                </h3>
                <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-lg border p-4">
                  <div className="space-y-2">
                    <Label>Amount (₱) *</Label>
                    <Input
                      type="number"
                      placeholder="999"
                      required
                      {...regNewMember("amount")}
                      className="h-12 text-lg font-bold text-emerald-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Method</Label>
                    <select
                      {...regNewMember("method")}
                      className="border-input bg-background flex h-12 w-full rounded-md border px-3 py-2 text-lg"
                    >
                      <option value="Cash">Cash</option>
                      <option value="GCash">GCash</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="h-14 w-full bg-emerald-600 text-lg text-white hover:bg-emerald-700"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Register & Record
                    Payment
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 4. RENEWAL */}
      <TabsContent value="renew">
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>Renew Membership</CardTitle>
            <CardDescription>
              Extend an existing member's active status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleRenewal(onRenewalSubmit)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label>Select Member *</Label>
                <Controller
                  control={renewControl}
                  name="member_id"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="h-12 text-lg">
                        <SelectValue
                          placeholder={
                            loadingMembers ? "Loading..." : "Search member..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {members?.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name} {m.isActive ? "" : "(Expired)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-lg border p-4">
                <div className="space-y-2">
                  <Label>Amount (₱) *</Label>
                  <Input
                    type="number"
                    placeholder="999"
                    required
                    {...regRenew("amount")}
                    className="h-12 text-lg font-bold text-emerald-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Method</Label>
                  <select
                    {...regRenew("method")}
                    className="border-input bg-background flex h-12 w-full rounded-md border px-3 py-2 text-lg"
                  >
                    <option value="Cash">Cash</option>
                    <option value="GCash">GCash</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="h-14 w-full bg-emerald-600 text-lg text-white hover:bg-emerald-700"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Record Renewal
                    Payment
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

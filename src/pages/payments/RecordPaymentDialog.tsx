import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhilippinePeso } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { paymentSchema, type PaymentFormValues } from "../../lib/validation";
import { useRecordPayment } from "../../hooks/usePaymentsApi";
import { useGetMembers } from "../../hooks/useMembersApi"; // Reusing existing hook!

export const RecordPaymentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: recordPayment, isPending } = useRecordPayment();
  const { data: members, isLoading: isLoadingMembers } = useGetMembers();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: "single_session",
      method: "Cash",
    },
  });

  // Watch the payment type so we can dynamically show/hide fields
  const selectedType = useWatch({ control: control, name: "type" });

  const onSubmit = (data: PaymentFormValues) => {
    recordPayment(data, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
          <PhilippinePeso className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Record New Payment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Payment Type */}
          <div className="space-y-1">
            <Label>Payment Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_session">
                      Single Session (Day Pass)
                    </SelectItem>
                    <SelectItem value="membership_renewal">
                      Membership Renewal
                    </SelectItem>
                    <SelectItem value="new_membership">
                      New Membership
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* DYNAMIC FIELD: Member Select OR Visitor Name */}
          {selectedType === "membership_renewal" ||
          selectedType === "new_membership" ? (
            <div className="space-y-1">
              <Label>Select Member *</Label>
              <Controller
                control={control}
                name="member_id"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingMembers
                            ? "Loading members..."
                            : "Choose a member"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {members?.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.member_id && (
                <p className="text-xs text-red-500">
                  {errors.member_id.message}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              <Label>Visitor Name *</Label>
              <Input placeholder="John Doe" {...register("payor_name")} />
              {errors.payor_name && (
                <p className="text-xs text-red-500">
                  {errors.payor_name.message}
                </p>
              )}
            </div>
          )}

          {/* Amount & Method */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Amount (₱) *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="50"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Method</Label>
              <Controller
                control={control}
                name="method"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="GCash">GCash</SelectItem>
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {isPending ? "Processing..." : "Confirm Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

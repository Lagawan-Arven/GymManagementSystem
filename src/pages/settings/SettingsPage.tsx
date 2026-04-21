import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Building,
  Palette,
  Save,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Spinner } from "../../components/ui/loader";

import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { useGetGymDetails, useUpdateGym } from "../../hooks/useGymApi";
import { useUpdateProfile } from "../../hooks/useAuthApi";
import {
  useGetAdmins,
  useCreateAdmin,
  useDeleteAdmin,
} from "../../hooks/useAdminsApi";

// Inline schemas for quick settings validation
const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const gymSchema = z.object({
  gymName: z.string().min(2, "Gym name is required"),
});

const adminSchema = z.object({
  firstname: z.string().min(2, "firstname is required"),
  lastname: z.string(),
  email: z.email("Invalid email").optional().or(z.literal("")),
  username: z.string().min(3, "Username is required"),
  password: z
    .string()
    .min(6, "Temporary password must be at least 6 characters"),
});

export const SettingsPage = () => {
  const { user } = useAuth();
  const { setTheme } = useTheme();

  const { data: gymDetails } = useGetGymDetails();
  const { mutate: updateGym, isPending: isUpdating } = useUpdateGym();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const { data: admins, isLoading: loadingAdmins } = useGetAdmins();
  const { mutate: createAdmin, isPending: isCreatingAdmin } = useCreateAdmin();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  const [showAddForm, setShowAddForm] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
    },
  });

  // Gym Form
  const {
    register: registerGym,
    handleSubmit: handleGymSubmit,
    reset: resetGym,
    formState: { errors: gymErrors },
  } = useForm({
    resolver: zodResolver(gymSchema),
    defaultValues: {
      gymName: gymDetails?.name || "ArvFit", // <-- 2. Add optional chaining and a fallback string
    },
  });

  const onProfileSave = (data: any) => {
    updateProfile({
      name: data.name,
      email: data.email,
      username: data.username,
    });
  };

  const onGymSave = (data: any) => {
    updateGym({ name: data.gymName });
  };

  // Use useEffect to reset the form once the data loads from the API
  useEffect(() => {
    if (gymDetails) {
      resetGym({ gymName: gymDetails.name });
    }
  }, [gymDetails, resetGym]);

  const {
    register: registerAdmin,
    handleSubmit: handleAdminSubmit,
    reset: resetAdmin,
    formState: { errors: adminErrors },
  } = useForm({
    resolver: zodResolver(adminSchema),
  });

  const onAdminSave = (data: any) => {
    createAdmin(data, {
      onSuccess: () => {
        resetAdmin();
        setShowAddForm(false); // Hide form after success
      },
    });
  };

  const handleDeleteAdmin = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this staff member's access?",
      )
    ) {
      deleteAdmin(id);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:w-100">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="gym" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> Gym
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Admin
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Theme
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                Update your personal admin account information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleProfileSubmit(onProfileSave)}
                className="max-w-md space-y-4"
              >
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...registerProfile("name")} />
                  {profileErrors.name && (
                    <p className="text-xs text-red-500">
                      {profileErrors.name.message as string}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerProfile("email")}
                  />
                  {profileErrors.email && (
                    <p className="text-xs text-red-500">
                      {profileErrors.email.message as string}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" {...registerProfile("username")} />
                  {profileErrors.username && (
                    <p className="text-xs text-red-500">
                      {profileErrors.username.message as string}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="mt-4"
                  disabled={isUpdatingProfile}
                >
                  {isUpdatingProfile ? (
                    <>
                      <Spinner size={16} className="mr-2 text-white" />
                      Saving...{" "}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Profile
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GYM DETAILS TAB */}
        <TabsContent value="gym">
          <Card>
            <CardHeader>
              <CardTitle>Gym Information</CardTitle>
              <CardDescription>
                Update the name of your facility as seen by your staff.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleGymSubmit(onGymSave)}
                className="max-w-md space-y-4"
              >
                <div className="space-y-1">
                  <Label htmlFor="gymName">Gym Name</Label>
                  <Input
                    id="gymName"
                    {...registerGym("gymName")}
                    placeholder={gymDetails?.name || "ArvFit"}
                  />
                  {gymErrors.gymName && (
                    <p className="text-xs text-red-500">
                      {gymErrors.gymName.message as string}
                    </p>
                  )}
                </div>
                <Button type="submit" className="mt-4" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Spinner size={16} className="mr-2 text-white" />
                      Saving...{" "}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Gym Details
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPEARANCE TAB */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how ArvFit looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-muted-foreground text-sm">
                    Switch between the light and dark theme.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          {/* We wrap this in RequirePlan so Starter users see the Upsell message! */}

          <div className="space-y-6">
            {/* Header & Add Button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Admin Management</h3>
                <p className="text-muted-foreground text-sm">
                  Manage admin accounts for your front-desk operations.
                </p>
              </div>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {showAddForm ? (
                  "Cancel"
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Admin
                  </>
                )}
              </Button>
            </div>

            {/* Collapsible Add Staff Form */}
            {showAddForm && (
              <Card className="animate-in fade-in slide-in-from-top-4 border-red-500/20 bg-red-500/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">
                    Create Temporary Credentials
                  </CardTitle>
                  <CardDescription>
                    The staff member can log in and change these details later.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleAdminSubmit(onAdminSave)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label>First Name *</Label>
                        <Input
                          placeholder="Alex"
                          {...registerAdmin("firstname")}
                        />
                        {adminErrors.firstname && (
                          <p className="text-xs text-red-500">
                            {adminErrors.firstname.message as string}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>Last Name *</Label>
                        <Input
                          placeholder="Desk"
                          {...registerAdmin("lastname")}
                        />
                        {adminErrors.lastname && (
                          <p className="text-xs text-red-500">
                            {adminErrors.lastname.message as string}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>Email (Optional)</Label>
                        <Input
                          type="email"
                          placeholder="alex@gym.com"
                          {...registerAdmin("email")}
                        />
                        {adminErrors.email && (
                          <p className="text-xs text-red-500">
                            {adminErrors.email.message as string}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="bg-background grid grid-cols-2 gap-4 rounded-lg border p-4">
                      <div className="space-y-1">
                        <Label>Temporary Username *</Label>
                        <Input
                          placeholder="frontdesk_alex"
                          {...registerAdmin("username")}
                        />
                        {adminErrors.username && (
                          <p className="text-xs text-red-500">
                            {adminErrors.username.message as string}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>Temporary Password *</Label>
                        <Input
                          type="text"
                          placeholder="randompass123"
                          {...registerAdmin("password")}
                        />
                        {adminErrors.password && (
                          <p className="text-xs text-red-500">
                            {adminErrors.password.message as string}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isCreatingAdmin}
                      className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      {isCreatingAdmin ? "Creating..." : "Create Staff Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Staff Table */}
            <div className="bg-card rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Always show the Owner at the top */}
                  <TableRow className="bg-muted/20">
                    <TableCell className="font-medium">
                      {user?.name} (You)
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user?.username || "Owner Account"}
                    </TableCell>
                    <TableCell>
                      <Shield className="h-4 w-4 text-amber-500" />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right text-xs">
                      Cannot delete owner
                    </TableCell>
                  </TableRow>

                  {/* Map through the Admins */}
                  {loadingAdmins ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-muted-foreground py-6 text-center"
                      >
                        Loading staff...
                      </TableCell>
                    </TableRow>
                  ) : admins?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-muted-foreground py-6 text-center"
                      >
                        No staff accounts created yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    admins?.map((admin: any) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                          {admin.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {admin.username}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600">
                            Admin
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

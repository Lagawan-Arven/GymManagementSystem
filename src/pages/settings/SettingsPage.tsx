import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Building, Palette, Save } from "lucide-react";
import { toast } from "sonner";

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
import { Spinner } from "../../components/ui/loader";

import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeContext";
import { useGetGymDetails, useUpdateGym } from "../../hooks/useSystemApi";
import { useUpdateProfile } from "../../hooks/useAuthApi";

// Inline schemas for quick settings validation
const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const gymSchema = z.object({
  gymName: z.string().min(2, "Gym name is required"),
});

export const SettingsPage = () => {
  const { user } = useAuth();
  const { setTheme } = useTheme();

  const { data: gymDetails } = useGetGymDetails();
  const { mutate: updateGym, isPending: isUpdating } = useUpdateGym();

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

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
    toast.success("Gym details updated successfully!");
  };

  // Use useEffect to reset the form once the data loads from the API
  useEffect(() => {
    if (gymDetails) {
      resetGym({ gymName: gymDetails.name });
    }
  }, [gymDetails, resetGym]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-100">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="gym" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> Gym
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
      </Tabs>
    </div>
  );
};

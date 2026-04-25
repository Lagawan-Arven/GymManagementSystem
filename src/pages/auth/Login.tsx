import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Building2, UserCircle2 } from "lucide-react";
//import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Spinner } from "../../components/ui/loader";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { loginSchema, type LoginFormValues } from "../../lib/validation";

import { useLogin } from "../../hooks/useAuthApi";
import { useAuth } from "../../context/useAuth";

//const mockGoogleClientID = import.meta.env.VITE_MOCK_GOOGLE_CLIENT_ID;

export const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { subscription, user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as Resolver<LoginFormValues>,
    defaultValues: { role: "owner" },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      // Using the response data directly ensures we don't hit race conditions
      // with the context updating slightly after the navigate triggers
      onSuccess: (responseData) => {
        const currentUser = responseData?.user || user;
        const currentSub = responseData?.subscription || subscription;

        navigate(
          currentSub?.isActive
            ? currentUser?.role === "owner"
              ? "/dashboard"
              : "/operation" // Sending staff directly to the POS mode!
            : currentUser?.role === "owner"
              ? "/billing"
              : "/unauthorized",
        );
      },
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your dashboard."
    >
      <div className="space-y-6">
        {/* Role Selector Tabs */}
        <Tabs
          defaultValue="owner"
          onValueChange={(val) => setValue("role", val as "owner" | "admin")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="owner" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Gym Owner
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <UserCircle2 className="h-4 w-4" /> Staff / Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Google SSO (Commented out for future scaling) */}
        {/*<div className="flex w-full justify-center">
          {mockGoogleClientID ? (
            <GoogleOAuthProvider clientId={mockGoogleClientID}>
              <GoogleLogin
                onSuccess={(res) => console.log("Google Auth Success", res)}
                onError={() => console.log("Google Login Failed")}
                theme="filled_black"
              />
            </GoogleOAuthProvider>
          ) : (
            // Dummy button for local UI testing to prevent console errors
            <Button
              type="button"
              variant="outline"
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={() => console.log("Dummy Google Login clicked")}
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Continue with Google (Dev Mode)
            </Button>
          )}
        </div>*/}

        {/*<div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>*/}

        {/* Standard Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="usernameOrEmail">Username or Email</Label>
            <Input
              id="usernameOrEmail"
              placeholder="johndoe or johndoe@email.com"
              {...register("usernameOrEmail")}
            />
            {errors.usernameOrEmail && (
              <p className="text-xs text-red-500">
                {errors.usernameOrEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button className="bg-transparent text-xs text-red-600 hover:underline">
                Forgot password?
              </Button>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner size={16} className="mr-2 text-white" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-red-500 hover:underline"
          >
            Register your Gym
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

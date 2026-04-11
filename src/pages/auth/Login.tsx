import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Spinner } from "../../components/ui/loader";
import { loginSchema, type LoginFormValues } from "../../lib/validation";
import { useLogin } from "../../hooks/useAuthApi";

const mockGoogleClientID = import.meta.env.VITE_MOCK_GOOGLE_CLIENT_ID;

export const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as Resolver<LoginFormValues>,
    defaultValues: { role: "owner" },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => navigate("/dashboard"), // Redirect to dashboard on success
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your dashboard."
    >
      <div className="space-y-6">
        {/* Google SSO */}
        <div className="flex w-full justify-center">
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
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google (Dev Mode)
            </Button>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="johndoe"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner size={16} className="mr-2 text-white" />
                Signing in...{" "}
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

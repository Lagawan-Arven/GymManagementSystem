import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Spinner } from "../../components/ui/loader";

import { registerSchema, type RegisterFormValues } from "../../lib/validation";
import { useRegisterGym } from "../../hooks/useGymApi";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerGym, isPending } = useRegisterGym();

  const onSubmit = (data: RegisterFormValues) => {
    // We map the flat form data into the nested JSON payload your backend expects
    const payload = {
      name: data.gymName,
      owner: {
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    // This will hit FastAPI, create the Gym, and create the Owner!
    registerGym(payload);
  };

  return (
    <AuthLayout
      title="Launch Your Gym"
      subtitle="Create an ArvFit account to start managing your facility."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="gymName">Gym Name</Label>
          <Input
            id="gymName"
            placeholder="Bakal Gym"
            {...register("gymName")}
          />
          {errors.gymName && (
            <p className="text-xs text-red-500">{errors.gymName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="owner@gym.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
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
        </div>

        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner size={16} className="mr-2 text-white" />
              Creating account...{" "}
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="pt-2 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-red-500 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { memberSchema, type MemberFormValues } from "../../lib/validation";
import { useCreateMember } from "../../hooks/useMembersApi";

export const AddMemberDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createMember, isPending } = useCreateMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = (data: MemberFormValues) => {
    createMember(data, {
      onSuccess: () => {
        setIsOpen(false);
        reset(); // Clear the form for the next time
      },
    });
  };

  // Handle dialog open/close state to ensure form resets if they cancel
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Register New Member</DialogTitle>
          <DialogDescription>
            Add a new gym member to your database. They will receive an initial
            30-day active status.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstname">First Name *</Label>
              <Input id="firstname" {...register("firstname")} />
              {errors.firstname && (
                <p className="text-xs text-red-500">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Last Name *</Label>
              <Input id="lastname" {...register("lastname")} />
              {errors.lastname && (
                <p className="text-xs text-red-500">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="optional@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              id="contact_number"
              placeholder="09..."
              {...register("contact_number")}
            />
            {errors.contact_number && (
              <p className="text-xs text-red-500">
                {errors.contact_number.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <p className="text-xs text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="sex">Sex</Label>
              <select
                id="sex"
                className="border-input focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                {...register("sex")}
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

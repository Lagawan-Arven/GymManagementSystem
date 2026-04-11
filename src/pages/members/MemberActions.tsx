import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

import { memberSchema, type MemberFormValues } from "../../lib/validation";
import { useUpdateMember, useDeleteMember } from "../../hooks/useMembersApi";
import { type Member } from "../../types";

interface MemberActionsProps {
  member: Member;
}

export const MemberActions = ({ member }: MemberActionsProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();
  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

  // Initialize form with the member's current data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstname: member.name.split(" ")[0], // Simplistic split for example
      lastname: member.name.split(" ").slice(1).join(" "),
      email: member.email || "",
      contact_number: member.contact_number || "",
      age: member.age || undefined,
      sex: (member.sex as any) || "",
    },
  });

  const onEditSubmit = (data: MemberFormValues) => {
    updateMember(
      { id: member.id, data },
      {
        onSuccess: () => setIsEditDialogOpen(false),
      },
    );
  };

  const onDeleteConfirm = () => {
    deleteMember(member.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    });
  };

  return (
    <>
      {/* The 3-Dot Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-500 focus:text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Modal (Reusing the form structure) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onEditSubmit)}
            className="space-y-4 pt-4"
          >
            {/* Same fields as AddMemberDialog... */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-firstname">First Name</Label>
                <Input id="edit-firstname" {...register("firstname")} />
                {errors.firstname && (
                  <p className="text-sm text-red-500">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-lastname">Last Name</Label>
                <Input id="edit-lastname" {...register("lastname")} />
                {errors.lastname && (
                  <p className="text-sm text-red-500">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input id="edit-email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-contact">Contact Number</Label>
              <Input id="edit-contact" {...register("contact_number")} />
              {errors.contact_number && (
                <p className="text-sm text-red-500">
                  {errors.contact_number.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-age">Age</Label>
                <Input
                  id="edit-age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                />
                {errors.age && (
                  <p className="text-sm text-red-500">{errors.age.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-sex">Sex</Label>
                <select
                  id="edit-sex"
                  className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                  {...register("sex")}
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && (
                  <p className="text-sm text-red-500">{errors.sex.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <strong>{member.name}</strong> from the database and remove their
              active subscription.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              size="default"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              size="default"
              onClick={onDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, delete member"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DeleteIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/api/api";

const DeleteUserDetailModal = (value) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(value),
    onMutate: () => {
      return { id: 1 };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
    },
  });

  function handleDelete() {
    mutate(value);
  }

  return (
          <AlertDialog >
            <AlertDialogTrigger>
            <Button variant="ghost" size="icon"> <DeleteIcon/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel >Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} >Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> );
};

export default DeleteUserDetailModal;

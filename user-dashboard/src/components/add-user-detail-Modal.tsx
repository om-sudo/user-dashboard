  import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/api/api";
import { useState } from "react";

import DetailForm from "./user-detail-form"
import { formSchema } from "./user-detail-form.config";
  
const AddUserDetailModal = () => {

    const [isDialogOpen,setIsDialogOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            country: "",
        },
      })

      const queryClient = useQueryClient();
     
      const {mutate, isError,error,isPending,reset} = useMutation({
        mutationFn: addUser,
        onMutate: () => {
            return {id : 1}
        },
        onSuccess: (data,variables,context) => {
            queryClient.invalidateQueries({
                queryKey:['users'],
                exact: true,
            })
        }
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const currentTime = new Date();
        const valueToAdd = {...values,"lastUpdate" : currentTime};
        mutate(valueToAdd);
        setIsDialogOpen(false);
      }  

    return(
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
     <DialogTrigger asChild>
        <Button size="sm">Add User</Button>
     </DialogTrigger>
     <DialogContent className="sm:max-w-md">
       <DialogHeader>
         <DialogTitle>Add User Details</DialogTitle>
       </DialogHeader>
    <DetailForm form={form} onSubmit={onSubmit} />
    </DialogContent>
    </Dialog>
    );
};

export default AddUserDetailModal;
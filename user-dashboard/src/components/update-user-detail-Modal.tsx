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
import { updateUser } from "@/api/api";
import { useState } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";
import DetailForm from "./user-detail-form"
import { formSchema } from "./user-detail-form.config";
  
const UpdateUserDetailModal = ({value}) => {

    const [isDialogOpen,setIsDialogOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: value.name,
            email: value.email,
            country: value.country,
        },  
      })

      const queryClient = useQueryClient();
     
      const {mutate} = useMutation({
        mutationFn: updateUser,
        onMutate: () => {
            return {id : 1}
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:['users'],
                exact: true,
            })
        }
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const currentTime = new Date();
        const valueToAdd = {...value,...values,"lastUpdate" : currentTime};
        mutate(valueToAdd);
        setIsDialogOpen(false);
      }  

    return(
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
     <DialogTrigger asChild>
        <Button variant="ghost" size="icon"><UpdateIcon/></Button>
     </DialogTrigger>
     <DialogContent className="sm:max-w-md">
       <DialogHeader>
         <DialogTitle>Update User Details</DialogTitle>
       </DialogHeader>
    <DetailForm form={form} onSubmit={onSubmit} />
    </DialogContent>
    </Dialog>
    );
};

export default UpdateUserDetailModal;
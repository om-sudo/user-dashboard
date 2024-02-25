import { z } from "zod"

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import {formSchema} from './user-detail-form.config' 

type FormData = z.infer<typeof formSchema>;
interface DetailFormProps {
    form: UseFormReturn<FormData>; 
    onSubmit: SubmitHandler<FormData>;
  }
const DetailForm: React.FC<DetailFormProps>  = ({ form ,onSubmit}) => {
    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="add your name here" {...field} />
                </FormControl>
                <FormDescription>
                  This is your  User name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Id</FormLabel>
                <FormControl>
                  <Input placeholder="add your email-id here" {...field} />
                </FormControl>
                <FormDescription>
                  This is your  Email Id.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Name</FormLabel>
                <FormControl>
                  <Input placeholder="add your Country name here" {...field} />
                </FormControl>
                <FormDescription>
                  This is your Country name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
};

export default DetailForm;
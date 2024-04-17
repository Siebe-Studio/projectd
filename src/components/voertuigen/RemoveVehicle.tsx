"use client"

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    id: z.coerce.number().int().positive()
});

export function RemoveVehicle() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Voertuig Verwijderen</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
                <DialogHeader>
                  <DialogTitle>Verwijderen een voertuig</DialogTitle>
                  <DialogDescription>Klik op Opslaan als u klaar bent.</DialogDescription>
                </DialogHeader>

                <FormField control={form.control} name="id" render={({ field }) => (
                  <FormItem>
                      <FormLabel htmlFor="name" className="text-right">ID</FormLabel>
                      <FormControl>
                          <Input {...field} id="name" placeholder="001" className="col-span-3" />
                      </FormControl>
                      <FormMessage/>
                  </FormItem>
                )}/>

                <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
                </form>
            </Form>
          </DialogContent>
        </Dialog>
    )
}
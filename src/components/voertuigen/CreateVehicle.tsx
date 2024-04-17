"use client"

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    platenumber: 
        z.string()
        .min(3, { message: "Nummerplaaten hebben minimaal 3 characters nodig!" })
        .max(10, { message: "Nummerplaaten hebben maximaal 10 characters nodig!"}),
    description: z.string().min(0).max(2000, { message: "Beschrijving heeft een maximaal van 2000 characters!"}),
    location: z.coerce.number().int().positive({ message: "Selecteer een locatie!" })
});

export function CreateVehicle() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { platenumber: "", description: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Voertuig Creëren</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
            
            <DialogHeader>
              <DialogTitle>Voeg een voertuig toe</DialogTitle>
              <DialogDescription>Klik op Opslaan als u klaar bent.</DialogDescription>
            </DialogHeader>
              
            <FormField control={form.control} name="platenumber" render={({ field }) => (
              <FormItem>
                  <FormLabel htmlFor="name" className="text-right">NummerPlaat</FormLabel>
                  <FormControl>
                      <Input {...field} id="name" placeholder="00-XX-00" className="col-span-3" />
                  </FormControl>
                  <FormMessage/>
              </FormItem>
            )}/>

            <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor="username" className="text-right">Locaties</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[275px]"> <SelectValue placeholder="Selecteer een locatie" /></SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Locaties</SelectLabel>
                                    <SelectItem value="0">Rotterdam</SelectItem>
                                    <SelectItem value="1">Amsterdam</SelectItem>
                                    <SelectItem value="2">Schiedam</SelectItem>
                                    <SelectItem value="3">Utrecht</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor="name" className="text-right">Beschrijving (optioneel)</FormLabel>
                    <FormControl>
                        <Textarea {...field} className="w-[275px]" placeholder="Type your message here." />
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

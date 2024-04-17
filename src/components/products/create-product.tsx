"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product moet minimaal 3 karakters bevatten",
  }),
  description: z.optional(
    z.string().max(255, {
      message: "Product beschrijving mag maximaal 255 karakters bevatten",
    }),
  ),
  categoryId: z.coerce.number().int().positive({
    message: "Categorie is verplicht",
  }),
  serialnumber: z.optional(
    z.string().min(3, {
      message: "Serienummer moet minimaal 3 karakters bevatten",
    }),
  ),
});

export default function CreateProduct() {
  const { toast } = useToast();
  const categories = api.product.getCategories.useQuery().data;

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Product toegevoegd",
        description: `Product ${form.getValues().name} is toegevoegd`,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Fout bij toevoegen van product",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
    createProduct.mutate(values);
  }

  return (
    <Card className="md:min-w-[400px]">
      <CardHeader>
        <CardTitle>Product Toevoegen</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Naam van het product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>
                    Beschrijving (optioneel)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      required={false}
                      {...field}
                      onChange={field.onChange} 
                      value={field.value}
                      placeholder="Ex. 200kg, wit, 2000 kW/h"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Categorie</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={`${category.id}`}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serialnumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>
                    Serienummer (optioneel)
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={false}
                      placeholder="Ex. AB202933"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button className="mt-3" type="submit">
                Toevoegen
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

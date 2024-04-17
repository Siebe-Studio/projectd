import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        description: z.optional(z.string().min(3).max(255)),
        categoryId: z.number().int().positive(),
        serialnumber: z.optional(z.string().min(3)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.product.create({
        data: {
          name: input.name,
          categoryId: input.categoryId,
          description: input.description,
          item: {
            create: {
              serialNumber: input.serialnumber,
              history: {
                create: {
                  title: "Product gecreëerd",
                  description: "Product is toegevoegd aan de voorraad",
                },
              },
            },
          }
        },
      });
    }),

  
  getCategories: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.category.findMany();
    }),
});

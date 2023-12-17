import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const entityRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.entity.create({
        data: {
          name: input.name,
        },
      });
    }),

  list: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.db.entity.findMany();
  }),
});

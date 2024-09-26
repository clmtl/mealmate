import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const weightHistoryRouter = createTRPCRouter({
  getWeightHistoryByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const weightHistory = await ctx.prisma.weightHistory.findMany({
        where: { userId: input.userId },
        orderBy: {
          created_at: "desc",
        },
      });

      if (!weightHistory) throw new TRPCError({ code: "NOT_FOUND" });
      return weightHistory;
    }),

  create: protectedProcedure
    .input(z.object({ weight: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const wh = await ctx.prisma.weightHistory.create({
        data: {
          userId,
          weight: input.weight,
        },
      });

      return wh;
    }),
});

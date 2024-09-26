import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Color } from "@prisma/client";
import { calculateNewLevel } from "~/utils/levelManager";
import { TRPCError } from "@trpc/server";

export const mateRouter = createTRPCRouter({
  getMateByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const mate = await ctx.prisma.mate.findUnique({
        where: { userId: input.userId },
      });

      return mate;
    }),

  create: protectedProcedure
    .input(z.object({ color: z.nativeEnum(Color) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const mate = await ctx.prisma.mate.create({
        data: {
          userId,
          level: 1,
          color: input.color,
        },
      });

      return mate;
    }),

  tryToUpdateLevelByUserId: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const infos = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        objective: true,
        mate: { select: { level: true } },
      },
    });
    if (infos === null || infos.mate === null) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
    const history = await ctx.prisma.weightHistory.findMany({
      where: {
        userId,
      },
      select: {
        weight: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 2,
    });
    console.table(history)
    const newLevel = calculateNewLevel({
      matesLevel: infos.mate.level,
      usersObjective: infos.objective,
      todaysWeight: history[0]?.weight,
      yesterdaysWeight: history[1]?.weight,
    });
    const mate = await ctx.prisma.mate.update({
      where: {
        userId: userId,
      },
      data: {
        level: newLevel,
      },
    });

    return mate;
  }),
});

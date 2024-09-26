import { type BlackList } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const blackListRouter = createTRPCRouter({

  getUserBlackList: protectedProcedure.query(async ({ ctx }) => {
    const allDatas = await ctx.prisma.blackList.findMany();
    const result:string[] = [];
    allDatas.forEach((blackListedElement: BlackList) => {
      if (blackListedElement.userId === ctx.session.user.id) {
        result.push(blackListedElement.food);
      }
    });
    return result;
  }),

  create : protectedProcedure.input(
    z.object({
      content: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const blacklistedFood = await ctx.prisma.blackList.create({data: {userId, food: input.content}});

    return blacklistedFood;
  }),

  delete : protectedProcedure.input(
    z.object({
      content: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const blacklistedFood = await ctx.prisma.blackList.deleteMany({where: {userId, food: input.content}});

    return blacklistedFood;
  }),

});

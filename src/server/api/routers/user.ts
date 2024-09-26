import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { UserInfos } from "~/types/userInfos.type";

export const userRouter = createTRPCRouter({
  getUserInfos: protectedProcedure.query(async ({ ctx }) => {
    const allDatas = await ctx.prisma.user.findMany();

    const result = allDatas.find((user) => user.id === ctx.session.user.id);
    return result;
  }),

  addUserInfos: protectedProcedure.input((UserInfos)
  ).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const data = await ctx.prisma.user.findUnique({
      where: { id: userId },
    });

    if (data) {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: userId },
        data: input,
      });
      return updatedUser;
    }
  }),
});

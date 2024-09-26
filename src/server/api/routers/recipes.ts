import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getExternalRecipes } from "../external/recipes.external";

export const recipesRouter = createTRPCRouter({
  getSuggested: protectedProcedure.query(async ({ ctx }) => {
    const blackListed = await ctx.prisma.blackList.findMany({
      where: { userId: ctx.session.user.id },
    });
    return await getExternalRecipes({
      type: "public",
      excluded: blackListed.map((b) => b.food),
      calories: "600+",
    });
  }),
});

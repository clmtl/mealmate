import type { NextPage } from "next";
import Image from "next/image";
import { Alert, Badge, Card } from "react-daisyui";
import { api } from "~/utils/api";

const RecipesPage: NextPage = () => {
  const { data, isLoading } = api.recipes.getSuggested.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (Array.isArray(data))
    return (
      <Alert status="error">
        <p>Something went wrong</p>
      </Alert>
    );
  return (
    <>
      <h1 className="ml-2 py-2 text-3xl font-bold">Recipes</h1>
      <div className="flex flex-col gap-2 p-2 pb-20">
        {data?.hits.map(({ recipe }) => (
          <Card
            key={recipe.url}
            className="flex flex-row gap-2 overflow-hidden"
          >
            <Image
              width="112"
              height="112"
              className="aspect-square h-28 w-28 rounded-[var(--rounded-box,_1rem)] object-cover"
              src={recipe.image}
              alt={recipe.label}
            />
            <div className="flex w-full flex-col py-1 pr-1">
              <b className="text-lg font-bold leading-tight">{recipe.label}</b>
              <div className="flex gap-1 overflow-x-auto">
                {recipe.dietLabels.map((label) => (
                  <Badge size="xs" key={label}>
                    {label}
                  </Badge>
                ))}
              </div>
              <a
                href={recipe.url}
                className="btn-secondary btn-xs btn mt-auto"
                target="_blank"
              >
                See the recipe
              </a>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RecipesPage;

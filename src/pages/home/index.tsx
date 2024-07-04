import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const { loading, recipeList } = useContext(GlobalContext);
  if (loading) return <div>Loading... Please wait!</div>;
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList.length > 0 ? (
        recipeList.map((recipeItem) => (
          <RecipeItem key={recipeItem.id} item={recipeItem} />
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show. Please search something
          </p>
        </div>
      )}
    </div>
  );
}

import { FormEvent, ReactNode, createContext, useState } from "react";
import { FullRecipe, Recipe, RecipeListResponse } from "../interfaces/receipe";
import { useNavigate } from "react-router-dom";
export type GlobalContent = {
  searchParam: string;
  setSearchParam: (s: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  recipeList: Recipe[];
  favouritesList: Recipe[];
  recipeDetailsData?: FullRecipe;
  setRecipeDetailsData: (e: FullRecipe) => void;
  handleAddToFavorite: (e: Recipe) => void;
};
export const GlobalContext = createContext<GlobalContent>({
  searchParam: "",
  setSearchParam: () => {},
  handleSubmit: () => {},
  loading: false,
  recipeList: [],
  favouritesList: [],
  recipeDetailsData: undefined,
  setRecipeDetailsData: () => {},
  handleAddToFavorite: () => {},
});

interface Props {
  children: ReactNode;
}
export default function GlobalState({ children }: Props) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState<
    FullRecipe | undefined
  >(undefined);
  const [favouritesList, setFavouritesList] = useState<Recipe[]>([]);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data: RecipeListResponse = await res.json();
      if (data.data.recipes) {
        setRecipeList(data.data.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorite(getCurrentItem: Recipe) {
    console.log(getCurrentItem);
    const cpyFavouritesList = [...favouritesList];
    const index = cpyFavouritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      cpyFavouritesList.push(getCurrentItem);
    } else {
      cpyFavouritesList.splice(index, 1);
    }

    setFavouritesList(cpyFavouritesList);
  }
  console.log(loading, recipeList);
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        recipeList,
        loading,
        recipeDetailsData,
        setRecipeDetailsData,
        favouritesList,
        handleAddToFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

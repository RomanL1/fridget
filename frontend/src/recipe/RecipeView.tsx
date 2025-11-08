import { ReactElement } from "react";
import sampleData from "./sample-data";
import RecipeCard from "./card/RecipeCard";
import { PageShell } from "../shared/components/page/PageShell";

const RecipeView = (): ReactElement =>
    <PageShell title={"Rezepte"}>
        {sampleData.map(({ imageUrl, title, rating, originURL, ratingCount }) =>
            <RecipeCard imageUrl={imageUrl} title={title} rating={rating} originUrl={originURL} ratingCount={ratingCount} />)}
    </PageShell>

export default RecipeView
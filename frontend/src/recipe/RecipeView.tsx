import { ReactElement } from "react";
import sampleData from "./sample-data";
import RecipeCard from "./card/RecipeCard";
import { PageShell } from "../shared/components/page/PageShell";
import { Flex } from "@radix-ui/themes";

const RecipeView = (): ReactElement =>
    <PageShell title={"Rezepte"}>
        <Flex direction="row" gap="6">
            {sampleData.map(({ imageUrl, title, rating, originURL, ratingCount }) =>
                <RecipeCard imageUrl={imageUrl} title={title} rating={rating} originUrl={originURL} ratingCount={ratingCount} />)}
        </Flex>
    </PageShell>

export default RecipeView
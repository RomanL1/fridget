import { AspectRatio, Card } from "@radix-ui/themes";
import { ReactElement } from "react";

interface RecipeCard {
    imageUrl: string
    originUrl: string
    title: string
    rating: number,
    ratingCount: number
}

const RecipeCard = ({ imageUrl, title, rating, ratingCount }: RecipeCard): ReactElement =>
    <Card>
        <AspectRatio ratio={16 / 8}>
            <img src={imageUrl} />
        </AspectRatio>
    </Card >
export default RecipeCard
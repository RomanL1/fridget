import { Flex, Text } from "@radix-ui/themes";
import { LucideStar } from "lucide-react";
import { ReactElement } from "react";

interface RecipeRatingProps {
    rating: number,
    ratingCount: number,
    className?: string
}

const RecipeRating = ({ rating, ratingCount, className }: RecipeRatingProps): ReactElement =>
    <Flex gap="1" align="center" className={className}>
        <LucideStar />
        <Text size="4">
            <strong>{rating}</strong> ({ratingCount})
        </Text>
    </Flex >

export default RecipeRating
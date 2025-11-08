import { Box, Card, Flex, Inset, Link, Text } from "@radix-ui/themes";
import { ReactElement } from "react";
import styles from './RecipeCard.module.css'
import { LucideExternalLink, LucideStar } from "lucide-react";
import RecipeRating from "./rating/RecipeRating";

interface RecipeCard {
    imageUrl: string
    originUrl: string
    title: string
    rating: number,
    ratingCount: number
}

const RecipeCard = ({ imageUrl, originUrl, title, rating, ratingCount }: RecipeCard): ReactElement =>
    <Box width="350px">
        <Flex direction="column">
            <Card size="2">
                <Inset clip="padding-box" side="top" mb="3">
                    <img className={styles.cardImage} src={imageUrl} />
                </Inset>
                <Text as="p" size="4" mb="1">
                    <strong>{title}</strong>
                </Text>
                <Link href={originUrl} size="3">
                    <Flex gap="2" align="center">
                        Zum Rezept
                        <LucideExternalLink />
                    </Flex>
                </Link>
                <RecipeRating rating={rating} ratingCount={ratingCount} className={styles.rating} />
            </Card >
        </Flex >
    </Box>
export default RecipeCard
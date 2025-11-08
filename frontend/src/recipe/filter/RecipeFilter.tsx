import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { LucideFlame, LucideSlidersHorizontal } from "lucide-react";
import { ReactElement } from "react";

const RecipeFilter = (): ReactElement =>
    <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "6" }}>
        <RadioCards.Item value="1">
            <Flex gap="2" width="100%">
                <LucideFlame />
                <Text size="3" weight="bold">
                    Tägliche Hits
                </Text>
            </Flex>
        </RadioCards.Item>
        <RadioCards.Item value="2">
            <Flex gap="2" width="100%">
                <LucideSlidersHorizontal />
                <Text size="3" weight="bold">
                    Filter
                </Text>
            </Flex>
        </RadioCards.Item>
    </RadioCards.Root>

export default RecipeFilter
import { Box, Card, Flex, Inset, Skeleton, Text } from '@radix-ui/themes';
import { ReactElement } from 'react';

interface RecipeCardSkeletonProps {
  loading: boolean;
}

const RecipeCardSkeleton = ({ loading }: RecipeCardSkeletonProps): ReactElement => (
  <Box width="350px">
    <Flex direction="column">
      <Card size="2">
        <Skeleton loading={loading}>
          <Inset clip="padding-box" side="top" mb="3">
            <Box height="140px" />
          </Inset>
        </Skeleton>
        <Skeleton loading={loading}>
          <Text as="p" size="4" mb="1" mt="3">
            Text
          </Text>
        </Skeleton>
        <Skeleton loading={loading}>
          <Text as="p" size="3">
            Text
          </Text>
        </Skeleton>
      </Card>
    </Flex>
  </Box>
);
export default RecipeCardSkeleton;

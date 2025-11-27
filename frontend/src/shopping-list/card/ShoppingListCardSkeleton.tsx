import { Box, Card, Flex, Skeleton, Text } from '@radix-ui/themes';
import { ReactElement } from 'react';

interface CardSkeletonInterface {
  loading: boolean;
}

const CardSkeleton = ({ loading }: CardSkeletonInterface): ReactElement => (
  <Box width="250px">
    <Card size="2">
      <Flex direction="column" gap="2">
        <Skeleton loading={loading}>
          <Text as="p" size="6">
            Text
          </Text>
        </Skeleton>
        <Skeleton loading={loading}>
          <Text as="p" size="2">
            Text
          </Text>
        </Skeleton>
      </Flex>
    </Card>
  </Box>
);

export default CardSkeleton;

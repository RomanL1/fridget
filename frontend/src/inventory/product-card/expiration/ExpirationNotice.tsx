import { Text } from '@radix-ui/themes';

interface ExpirationNoticeProps {
  bestBeforeDate?: Date;
}

export function ExpirationNotice({ bestBeforeDate }: ExpirationNoticeProps) {
  if (!bestBeforeDate) {
    return <span />;
  }

  const aboutToExpireInDays = 3;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  const daysUntilExpiration = (bestBeforeDate.getTime() - now.getTime()) / millisecondsPerDay;

  if (daysUntilExpiration < 0) {
    return (
      <Text size="2" weight="light" color="red">
        Abgelaufen
      </Text>
    );
  }

  if (daysUntilExpiration <= aboutToExpireInDays) {
    return (
      <Text size="2" weight="light" color="orange">
        Läuft bald ab
      </Text>
    );
  }

  return <span />;
}

import { Text } from '@radix-ui/themes';

interface ExpirationNoticeProps {
  bestBeforeDate?: Date;
}

export function ExpirationNotice({ bestBeforeDate }: ExpirationNoticeProps) {
  if (!bestBeforeDate) {
    return <span />;
  }

  const daysUntilExpiration = getDaysUntilExpiration(bestBeforeDate);

  if (daysUntilExpiration < 0) {
    return (
      <Text size="2" weight="light" color="red">
        Abgelaufen
      </Text>
    );
  }

  const aboutToExpireInDays = 3;
  if (daysUntilExpiration <= aboutToExpireInDays) {
    return (
      <Text size="2" weight="light" color="orange">
        Läuft bald ab
      </Text>
    );
  }

  return <span />;
}

function getDaysUntilExpiration(expirationDate: Date): number {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  return (expirationDate.getTime() - now.getTime()) / millisecondsPerDay;
}

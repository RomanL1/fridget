import { Text } from '@radix-ui/themes';

interface ExpirationNoticeProps {
  bestBeforeDate?: Date;
}

export function ExpirationNotice({ bestBeforeDate }: ExpirationNoticeProps) {
  if (!bestBeforeDate) {
    return <ExpirationUnknown />;
  }

  const daysUntilExpiration = getDaysUntilExpiration(bestBeforeDate);

  if (daysUntilExpiration < 0) {
    return <AlreadyExpired />;
  }

  const aboutToExpireInDays = 3;
  if (daysUntilExpiration <= aboutToExpireInDays) {
    return <AboutToExpire />;
  }

  return <NotYetExpired />;
}

function getDaysUntilExpiration(expirationDate: Date): number {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  return (expirationDate.getTime() - now.getTime()) / millisecondsPerDay;
}

const ExpirationUnknown = () => <span />;
const NotYetExpired = () => <span />;

const AlreadyExpired = () => (
  <Text size="2" weight="light" color="red">
    Abgelaufen
  </Text>
);

const AboutToExpire = () => (
  <Text size="2" weight="light" color="orange">
    Läuft bald ab
  </Text>
);

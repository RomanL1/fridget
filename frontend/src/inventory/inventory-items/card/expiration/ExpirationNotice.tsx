import { Text } from '@radix-ui/themes';

interface ExpirationNoticeProps {
  bestBeforeDate?: Date;
  textSize?: TextSizes;
}

type TextSizes = '1' | '2';

export function ExpirationNotice({ bestBeforeDate, textSize }: ExpirationNoticeProps) {
  if (!bestBeforeDate) {
    return <ExpirationUnknown />;
  }

  const daysUntilExpiration = getDaysUntilExpiration(bestBeforeDate);

  if (daysUntilExpiration < 0) {
    return <AlreadyExpired textSize={textSize} />;
  }

  const aboutToExpireInDays = 3;
  if (daysUntilExpiration <= aboutToExpireInDays) {
    return <AboutToExpire textSize={textSize} />;
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

interface StatusProps {
  textSize?: TextSizes;
}

const AlreadyExpired = ({ textSize }: StatusProps) => (
  <Text size={textSize || '2'} weight="light" color="red">
    Abgelaufen
  </Text>
);

const AboutToExpire = ({ textSize }: StatusProps) => (
  <Text size={textSize || '2'} weight="light" color="orange">
    Läuft bald ab
  </Text>
);

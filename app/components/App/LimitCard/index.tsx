import React, {useEffect, useState} from 'react';

import {AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {formatCurrency, ICONS} from '@/utils';

interface LimitCardProps {
  title: string;
  rest: number;
  total: number;
}

const LimitCard = (props: LimitCardProps) => {
  const {rest, total, title} = props;
  const [progress, setProgress] = useState(0);

  // Calculation of amount
  useEffect(() => {
    const percentage = (rest / total) * 100;
    setProgress(percentage);
  }, [rest, total]);

  // Styled Components
  const CardContainer = useStyledTag(Block, 'h-80 relative bg-primary-lighter middle');
  const TitleText = useStyledTag(Text, 'white fs-14 mb-2');
  const Progress = useStyledTag(Block, 'h-80 bg-primary-light absolute', () => ({
    width: progress + '%',
  }));

  return (
    <CardContainer>
      <>
        <Progress />
        <Block row center px-24>
          <Block h-40 w-40 rounded-4 center middle bg-primary>
            <AppIcon name={ICONS.Coins1} size={24} color={COLORS.white} />
          </Block>
          <Block column ml-12>
            <TitleText>{title}</TitleText>
            <Block row center>
              <Text white fs-18 bold>
                {formatCurrency(rest)}{' '}
              </Text>
              <Text white fs-14>
                / {formatCurrency(total)}
              </Text>
            </Block>
          </Block>
        </Block>
      </>
    </CardContainer>
  );
};

export default LimitCard;

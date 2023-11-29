import React from 'react';

import {AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, RequestStatuses} from '@/utils';

interface CardStepperProps {
  status: RequestStatuses;
  title: string;
}

// #region Card Variations
const CardColors = {
  info: {
    bg: COLORS.infoLight,
    text: COLORS.info,
    border: COLORS.info,
    iconColor: COLORS.info,
    iconName: ICONS.Clock2,
  },
  success: {
    bg: COLORS.successLight,
    text: COLORS.font,
    border: COLORS.success,
    iconColor: COLORS.success,
    iconName: ICONS.Check2,
  },
  error: {
    bg: COLORS.errorLight,
    text: COLORS.error,
    border: COLORS.error,
    iconColor: COLORS.error,
    iconName: ICONS.Close,
  },
};
// #endregion

const statusStyles = [
  {
    statuses: [0, 30, 70],
    style: CardColors.info,
    type: 'info',
  },
  {
    statuses: [71],
    style: CardColors.success,
    type: 'success',
  },
  {
    statuses: [60, 61],
    style: CardColors.error,
    type: 'error',
  },
];

const CardStepper = (props: CardStepperProps) => {
  const statusNumbers = [0, 30, 70];
  const {status, title} = props;

  const CurrentStatus = statusStyles?.find(item => item.statuses.includes(status)) || statusStyles[0];

  const CardStepperContainer = useStyledTag(Block, 'row center border mt-8 p-10 px-12 rounded-4', () => ({
    borderColor: CurrentStatus.style.border,
    backgroundColor: CurrentStatus.style.bg,
  }));

  const CardStepperText = useStyledTag(Text, 'tiny medium', () => ({
    color: CurrentStatus.style.text,
  }));

  const Stepper = useStyledTag(Block, 'row justify-between mt-6');

  const StepperItem = useStyledTag(Block, 'h-4 bg-primary rounded-50', ({index}: {index?: number}) => ({
    width: '30%',
    opacity: index && statusNumbers.indexOf(status) > index - 1 ? 1 : 0.2,
  }));

  return (
    <CardStepperContainer>
      <AppIcon name={CurrentStatus.style.iconName} color={CurrentStatus.style.iconColor} size={24} />
      <Block ml-8>
        <CardStepperText>{title}</CardStepperText>
        {CurrentStatus.type === 'info' && (
          <Stepper>
            {[1, 2, 3].map((index: number) => (
              <StepperItem key={index} index={index} />
            ))}
          </Stepper>
        )}
      </Block>
    </CardStepperContainer>
  );
};

export default CardStepper;

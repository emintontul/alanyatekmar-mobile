import React, {forwardRef, ReactElement, useImperativeHandle} from 'react';

import {AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, widthPixel} from '@/utils';

export interface VerticalStepperMethods {
  getCurrent: () => number;
}
interface VerticalStepperProps {
  children?: Array<ReactElement>;
  initialStep: number;
}

const VerticalStepper = forwardRef((props: VerticalStepperProps, ref) => {
  const {children, initialStep} = props;

  useImperativeHandle(ref, () => ({
    getCurrent: () => initialStep,
  }));

  const StepCircle = useStyledTag(Block, 'rounded-100 center middle', ({index}: {index?: number}) => ({
    // Buradaki genişlik ve yükseklikler responsive olmadığı için statik yazıldı !
    width: widthPixel(32),
    height: widthPixel(32),
    borderWidth: 1.5,
    ...getDynamicStyles(index, initialStep)?.body,
  }));
  const Line = useStyledTag(Block, 'w-1 flex', ({index}: {index?: number | undefined}) => ({
    ...getDynamicStyles(index, initialStep)?.border,
  }));

  return (
    <React.Fragment>
      {children?.map((item: ReactElement, index: number) => (
        <Block row key={index}>
          <Block w-32 center>
            <StepCircle index={index}>
              {index + 1 < initialStep ? (
                <AppIcon name={ICONS.check} size={15} color={getDynamicStyles(index, initialStep).text.color} />
              ) : (
                <Text semibold style={getDynamicStyles(index, initialStep).text}>
                  {index + 1}
                </Text>
              )}
            </StepCircle>
            {children.length !== index + 1 && <Line index={index} />}
          </Block>
          {item}
        </Block>
      ))}
    </React.Fragment>
  );
});

export default VerticalStepper;

export const getDynamicStyles = (index = 0, currentStep: number) => {
  if (!currentStep) {
    return {
      body: {
        backgroundColor: COLORS.infoLight,
        borderColor: COLORS.infoLight,
      },
      border: {
        backgroundColor: COLORS.infoLight,
      },
      text: {
        color: COLORS.info,
      },
    };
  } else {
    if (index + 1 < currentStep) {
      //TAMAMLANMIŞ DURUMU
      return {
        body: {
          backgroundColor: COLORS.successLight,
          borderColor: COLORS.success,
        },
        border: {
          backgroundColor: COLORS.success,
        },
        text: {
          color: COLORS.success,
        },
      };
    } else {
      // ACTIVE DURUMU
      if (index + 1 === currentStep) {
        return {
          body: {
            backgroundColor: COLORS.infoLight,
            borderColor: COLORS.info,
          },
          border: {
            backgroundColor: COLORS.gray,
          },
          text: {
            color: COLORS.primary,
          },
        };
      } else {
        // PASSIVE DURUMU
        return {
          body: {
            backgroundColor: 'transparent',
            borderColor: COLORS.lightGray,
          },
          border: {
            backgroundColor: COLORS.gray,
          },
          text: {
            color: COLORS.lightGray,
          },
        };
      }
    }
  }
};

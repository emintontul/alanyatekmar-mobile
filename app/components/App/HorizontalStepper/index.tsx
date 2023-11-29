import React, {forwardRef, JSXElementConstructor, ReactElement, ReactNode, Ref, RefObject, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';

import {AppFlatList, AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS, window} from '@/theme';
import {ICONS, widthPixel} from '@/utils';

interface HorizontalStepperProps {
  children: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  initialStep?: number;
  onComplete: () => void;
  flat?: RefObject<FlatList>;
}

interface TabPageProps {
  pages: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  index: number;
}

const StepperHeader = forwardRef(({children, flat, initialStep}: HorizontalStepperProps, ref) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const stepsLength = children?.length;

  useEffect(() => {
    if (initialStep) {
      setTimeout(() => {
        setCurrentStep(initialStep);
      }, 200);
    }
  }, [initialStep]);

  const StepCircle = useStyledTag(Block, 'rounded-100 center middle', ({index}: {index?: number}) => ({
    // Buradaki genişlik ve yükseklikler responsive olmadığı için statik yazıldı !
    width: widthPixel(32),
    height: widthPixel(32),
    borderWidth: 1.5,
    ...getDynamicStyles(index, currentStep).body,
  }));

  const Line = useStyledTag(Block, 'h-1 flex', ({index}: {index?: number}) => ({
    backgroundColor: index === currentStep - 1 ? COLORS.success : COLORS.lightGray,
  }));

  useImperativeHandle(ref, () => ({
    next: () => setCurrentStep(currentStep + 1),
    reset: () => setCurrentStep(0),
    set: (value: number) => setCurrentStep(value),
    getCurrent: () => currentStep,
  }));

  return (
    <Block row justify-between center px-20 pt-16>
      {Array.from({length: stepsLength}).map((_, index) => (
        <>
          <StepCircle
            pressable
            onPress={() => {
              !initialStep &&
                flat?.current?.scrollToIndex({
                  animated: true,
                  index: index,
                });
            }}
            index={index}>
            {index?.toString() && index < currentStep ? <AppIcon name={ICONS.check} size={15} color={COLORS.white} /> : <Text style={getDynamicStyles(index, currentStep).text}>{index + 1}</Text>}
          </StepCircle>
          {index !== stepsLength - 1 && <Line index={index} />}
        </>
      ))}
    </Block>
  );
});

const HorizontalStepper = (props: HorizontalStepperProps, ref: Ref<HorizontalStepperMethods>) => {
  const {children, onComplete, initialStep} = props;
  const headerRef = useRef<HorizontalStepperMethods>(null);
  const flat = useRef<FlatList>(null);

  useEffect(() => {
    if (initialStep) {
      console.log(initialStep);
      headerRef?.current?.next();
    }
  }, [initialStep]);

  useImperativeHandle(ref, () => ({
    next: () => {
      try {
        const curr = headerRef?.current?.getCurrent() || 0;
        flat?.current?.scrollToIndex({
          animated: true,
          index: curr + 1,
        });
      } catch (error) {
        onComplete?.();
      }
    },
    reset: () => {
      flat?.current?.scrollToIndex({
        animated: false,
        index: 0,
      });
      headerRef?.current?.reset();
    },
    set: (value: number) => {
      headerRef?.current?.set(value);
      flat?.current?.scrollToIndex({
        animated: true,
        index: value,
      });
    },
    getCurrent: () => headerRef?.current?.getCurrent() || 0,
  }));

  const TabPage = ({index, pages}: TabPageProps) => {
    return (
      <Block flex style={{width: window.width}}>
        {pages?.[index]}
      </Block>
    );
  };

  // Swipe sonrasında current page ' i belirlemek için kullandığımız method.
  const onViewableItemsChanged = ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
    const _currentIndex = viewableItems?.[0]?.index || 0;
    headerRef?.current && headerRef?.current?.set(_currentIndex);
  };

  // onViewableItemsChanged fonksiyonunun tetiklenme eşiği (swipe anında)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    waitForInteraction: initialStep ? true : false,
  };

  // onViewableItemsChanged fonksiyonunun referans dizisi
  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}]);

  return (
    <Block flex>
      <StepperHeader flat={flat} initialStep={initialStep} onComplete={onComplete} ref={headerRef}>
        {children}
      </StepperHeader>
      <AppFlatList
        horizontal
        pagingEnabled
        scrollEnabled={false}
        reference={flat}
        data={children}
        renderItem={item => <TabPage index={initialStep || item.index} pages={children} />}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </Block>
  );
};

export default forwardRef(HorizontalStepper);

const getDynamicStyles = (index = 0, currentStep: number) => {
  if (index < currentStep) {
    //TAMAMLANMIŞ DURUMU
    return {
      body: {
        backgroundColor: COLORS.success,
        borderColor: COLORS.success,
      },
      text: {
        color: COLORS.lightGray,
      },
    };
  } else {
    // ACTIVE DURUMU
    if (index === currentStep) {
      return {
        body: {
          backgroundColor: COLORS.infoLight,
          borderColor: COLORS.primary,
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
        text: {
          color: COLORS.lightGray,
        },
      };
    }
  }
};

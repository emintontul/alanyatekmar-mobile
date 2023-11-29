import React, {useRef, useState} from 'react';
import {FlatListProps, ViewToken} from 'react-native';

import {AppFlatList, Block} from '..';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import { rgba } from '@/utils';

type DotProps = {
  index?: number;
};

interface AppSwipeCarouselProps<T> extends FlatListProps<T> {
  data: ReadonlyArray<T>;
  onSwipe?: (index: number) => void;
}

export function AppSwipeCarousel<T>(props: AppSwipeCarouselProps<T>) {
  const {renderItem, data, onSwipe} = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Swipe sonrasında current page ' i belirlemek için kullandığımız method.
  const onViewableItemsChanged = ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
    const _currentIndex = viewableItems?.[0]?.index || 0;
    setCurrentIndex(_currentIndex);
    onSwipe && onSwipe(viewableItems?.[0]?.index || 0);
  };

  // onViewableItemsChanged fonksiyonunun tetiklenme eşiği (swipe anında)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // onViewableItemsChanged fonksiyonunun referans dizisi
  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}]);

  const Dot = useStyledTag(Block, 'rounded-100 w-8 h-8 mr-8', ({index}: DotProps) => (
    index === currentIndex ? {backgroundColor: rgba(COLORS.white, 0.8)} : {borderWidth:2, borderColor: rgba(COLORS.white, 0.8)}
  ));

  return (
    <>
      <AppFlatList renderItem={renderItem} data={data} horizontal pagingEnabled scrollEnabled={data.length > 1} viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current} />
      <Block center row mb-18 absolute bottom={0}>
        {data.length > 1 && (
          <>
            {data.map((_, index: number) => (
              <Dot key={index} index={index} />
            ))}
          </>
        )}
    </Block>
    </>
  );
}

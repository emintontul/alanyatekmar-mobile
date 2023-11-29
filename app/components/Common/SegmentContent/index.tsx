import React, {JSXElementConstructor, ReactElement, ReactNode, useRef} from 'react';
import {FlatList} from 'react-native';

import {AppFlatList, Block, SegmentedControl} from '..';

import {useStyledTag} from '@/hooks';
import {COLORS, window} from '@/theme';

interface SegmentProps {
  label: string;
  id: number;
}

interface SegmentViewProps {
  children: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  activeTab: number;
  setActiveTab: (index: number) => void;
  segments: Array<SegmentProps>;
  containerMargin?: number;
  type: 'dark' | 'light';
}

interface TabPageProps {
  pages: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  index: number;
}

const SegmentView = (props: SegmentViewProps) => {
  const {segments, children, activeTab, containerMargin, type} = props;
  const flat = useRef<FlatList>(null);

  const TabPage = ({index, pages}: TabPageProps) => {
    return (
      <Block flex style={{width: window.width}}>
        {pages?.[index]}
      </Block>
    );
  };

  const SegmentTypes = {
    dark: {
      tabColor: COLORS.primaryDark,
      activeColor: COLORS.primary,
      titleColor: COLORS.gray,
      activeTitleColor: COLORS.white,
    },
    light: {
      tabColor: COLORS.white,
      activeColor: COLORS.primary,
      titleColor: COLORS.gray,
      activeTitleColor: COLORS.font,
    },
  };

  const Container = useStyledTag(Block, 'px-20', () => ({
    backgroundColor: type === 'light' ? COLORS.white : COLORS.primaryDark,
  }));


  return (
    <React.Fragment>
        <SegmentedControl
          currentIndex={activeTab}
          containerMargin={containerMargin}
          onChange={(index: number) => {
            flat.current &&
              flat.current.scrollToIndex({
                animated: true,
                index: index,
              });
          }}
          segments={segments}
          tabColor={SegmentTypes[type].tabColor}
          activeColor={SegmentTypes[type].activeColor}
          titleColor={SegmentTypes[type].titleColor}
          activeTitleColor={SegmentTypes[type].activeTitleColor}
        />

      <Block p-0 flex>
        <AppFlatList horizontal pagingEnabled handleScroll={handleScroll} scrollEnabled={false} reference={flat} data={segments.map(i => i.id)} renderItem={item => <TabPage index={item.index} pages={children} />} />
      </Block>
    </React.Fragment>
  );
};
export default SegmentView;

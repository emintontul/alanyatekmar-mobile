import React, {useRef} from 'react';

import DetailedSearchModal, {DetailedSearchModalMethods} from './DetailedSearchModal';
import SortModal, {SortModalMethods} from './SortModal';

import {AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

interface IFilterActions {
  rightText?: string;
  onRightPress?: () => void;
}

const FilterActions = (props: IFilterActions) => {
  const {rightText, onRightPress} = props;
  const detailedSearchModalRef = useRef<DetailedSearchModalMethods>();
  const sortModalRef = useRef<SortModalMethods>(null);

  const SortButton = useStyledTag(Block, 'row center');
  const DetailedSearchButton = useStyledTag(Block, 'row center ml-17');
  const FilterActionsContainer = useStyledTag(Block, 'row justify-between', () => ({
    flex: !rightText ? 1 : 0,
  }));

  return (
    <React.Fragment>
      <Block py-16 row center justify-between>
        <FilterActionsContainer row>
          <SortButton pressable onPress={() => sortModalRef?.current?.open()}>
            <AppIcon name={ICONS.Sort} size={16} color={COLORS.gray} />
            <Text ml-6 tinyGray>
              common.sort
            </Text>
          </SortButton>
          <DetailedSearchButton pressable onPress={() => detailedSearchModalRef?.current?.open()}>
            <AppIcon name={ICONS.Filter} size={16} color={COLORS.gray} />
            <Text ml-6 tinyGray>
              common.detailed_search
            </Text>
          </DetailedSearchButton>
        </FilterActionsContainer>
        {rightText && (
          <Text tinyInfo pressable onPress={onRightPress}>
            {rightText}
          </Text>
        )}
      </Block>
      {/* Sıralama Modalı */}
      <SortModal ref={sortModalRef} />
      {/* Detaylı Arama Modalı */}
      <DetailedSearchModal ref={detailedSearchModalRef} />
    </React.Fragment>
  );
};

export default FilterActions;

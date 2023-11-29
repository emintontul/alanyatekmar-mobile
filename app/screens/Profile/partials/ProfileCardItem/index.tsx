import React, {ReactNode} from 'react';

import {Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';

interface IProfileCardItem {
  title: string;
  icon: ReactNode;
  onPress: () => void;
}

export const ProfileCardItem = (props: IProfileCardItem) => {
  const {title, icon, onPress} = props;

  const CardItemContainer = useStyledTag(Block, 'px-20 h-60 center row justify-between border');

  return (
    <CardItemContainer pressable onPress={onPress}>
      <Text medium>{title}</Text>
      {icon}
    </CardItemContainer>
  );
};

import React, {useState} from 'react';

import {AppCheckbox, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {IRegisteredCard} from '@/utils';

interface RegisteredCardProps {
  cardData: Array<IRegisteredCard>;
}

const RegisteredCards = (props: RegisteredCardProps) => {
  const {cardData} = props;
  const [isSelected, setIsSelected] = useState(1);

  const CardContainer = useStyledTag(Block, 'row border rounded-4 h-72 p-14 mb-6', ({item}) => ({
    borderColor: item?.id === isSelected ? COLORS.info : COLORS.gray,
    backgroundColor: item?.id === isSelected ? COLORS.infoLight : 'transparent',
  }));

  return (
    <React.Fragment>
      {cardData.map(item => (
        <CardContainer item={item} key={item.id} pressable onPress={() => setIsSelected(item.id)}>
          <AppCheckbox radio checked={isSelected === item.id} />
          <Block ml-12 justify-between>
            <Text>{item?.cardName}</Text>
            <Text>{item?.cardNo}</Text>
          </Block>
        </CardContainer>
      ))}
    </React.Fragment>
  );
};

export default RegisteredCards;

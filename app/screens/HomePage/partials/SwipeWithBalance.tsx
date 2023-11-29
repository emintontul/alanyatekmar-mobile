import React from 'react';

import {Block, Text} from '@/components';

interface SwipeWithBalanceProps {
  title: string;
  balance: string;
}

const SwipeWithBalance = ({title, balance}: SwipeWithBalanceProps) => {
  const formatBalance = balance.split(',');
  return (
    <Block center flex middle w-full>
      <Text bigHeaderDark mb-14>
        {title}
      </Text>
      {/* <Block pressable row center mb-8>
        <Text defaultLight default mr-5>
          home.remaining_limit
        </Text>
      </Block> */}
      <Text bigTitleDark>
        {formatBalance[0]}
        <Text bigHeaderDark opacityDark>
          ,{formatBalance[1]}
        </Text>
      </Text>
    </Block>
  );
};

export default SwipeWithBalance;

import React, {ReactNode} from 'react';

import {FinancingBalances} from 'data/mock_data';

import KobiInformation from './KobiInformation';
import SwipeWithBalance from './SwipeWithBalance';

import {AppSwipeCarousel, Block} from '@/components';
import {useStyledTag} from '@/hooks';
import {window} from '@/theme';

const Item = (props: {item: ReactNode}) => {
  const {item} = props;

  const ItemContainer = useStyledTag(Block, 'middle center h-140 px-20', () => ({
    width: window.width,
  }));

  return <ItemContainer pressable>{item}</ItemContainer>;
};

interface IDashboardSwipe {
  onSwipe: (index: number) => void;
}

const DashboardSwipe = (props: IDashboardSwipe) => {
  const {onSwipe} = props;
  const type = 1; // Kullanıcı tipine göre dinamik olarak doldurulacak.

  const FinancingAccount = {
    0: {
      // Sadece kobi finansmanı
      pages: [<SwipeWithBalance key={0} title="common.SME_financing" balance={FinancingBalances.smeBalance} />],
    },
    1: {
      // Hem Kobi Finansmanı hemde Tedarikçi finansmanı olduğu zaman
      pages: [
        <SwipeWithBalance key={1} title="common.SME_financing" balance={FinancingBalances.smeBalance} />,
        <SwipeWithBalance key={0} title="common.supplier_financing" balance={FinancingBalances.supplierBalance} />, // prettier-ignore
      ],
    },
    2: {
      // Sadece tedarikçi finansmanı olduğu zaman
      pages: [
        <KobiInformation key={1} />,
        <SwipeWithBalance key={0} title="common.supplier_financing" balance={FinancingBalances.supplierBalance} />, // prettier-ignore
      ],
    },
  };

  const data = FinancingAccount?.[type]?.pages;

  return (
    <Block column center>
      <AppSwipeCarousel onSwipe={onSwipe} data={data} renderItem={Item} />
    </Block>
  );
};

export default DashboardSwipe;

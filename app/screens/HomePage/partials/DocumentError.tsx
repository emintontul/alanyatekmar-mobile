import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {images} from '@/assets';
import {AppImage, Block, InfoCard, Text} from '@/components';
import {HomeStackNavigationPropsType} from '@/navigation/stacks/HomeStack/types';
import {ICONS} from '@/utils';

const DocumentError = () => {
  const navigation = useNavigation<HomeStackNavigationPropsType>();
  return (
    <Block center>
      <AppImage url={images.figoLoader} width={75} height={75} />
      <Text buttonTitleLight textCenter mt-25 mb-12>
        home.document_error_title
      </Text>
      <Text textCenter tiny mb-24>
        home.document_error_text
      </Text>
      <InfoCard onPress={() => navigation.navigate('DOCUMENTS')} isVisible={true} type={'warning'} iconRight={ICONS.RightArrow} iconLeft={ICONS.Graphic} text={'alert_messages.complete_documents'} />
    </Block>
  );
};

export default DocumentError;

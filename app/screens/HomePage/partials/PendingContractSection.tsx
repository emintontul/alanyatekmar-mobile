import React, {useState} from 'react';

import {images} from '@/assets/images';
import {AppButton, AppIcon, AppImage, AppModal, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {heightPixel, ICONS} from '@/utils';

export const PendingContractSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  const Header = useStyledTag(Block, 'middle justify-between bg-white row center pl-20 pr-5 h-64');
  const CloseButton = useStyledTag(Block, ' w-40 h-40 center middle');
  const Content = useStyledTag(Block, 'px-24 py-33');
  const ModalContainer = useStyledTag(Block, 'bg-gray mt-auto', () => ({
    height: heightPixel(502),
  }));

  return (
    <Block center>
      <AppImage url={images.warning} height={76} width={94} />
      <Text mt-31 buttonTitleLight mb-8>
        Sözleşmeniz Bekleniyor
      </Text>
      <Text tinyLight textCenter medium px-24>
        Alacaklarınızı nakde dönüştürebilmek için sözleşmenizi en kısa sürede bize ulaştırın.
      </Text>
      <AppButton onPress={handleOpen} mt-41 title={'Sözleşme Adımlarını Gör'} type="primary" />
      <AppModal isVisible={isVisible} onClose={handleClose}>
        <ModalContainer>
          <Header>
            <Text sm>Sözleşme Adımları</Text>
            <CloseButton pressable onPress={handleClose}>
              <AppIcon name={ICONS.Close} size={16} color={COLORS.black} />
            </CloseButton>
          </Header>
          <Content>
            <Block border rounded-50 w-32 h-32 center middle>
              <Text>1</Text>
            </Block>
          </Content>
        </ModalContainer>
      </AppModal>
    </Block>
  );
};

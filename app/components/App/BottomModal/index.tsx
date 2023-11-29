import React, {ReactNode} from 'react';
import {ScrollView} from 'react-native';

import {AppButton, AppIcon, AppModal, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {heightPixel, ICONS, widthPixel} from '@/utils';

interface IBottomModal {
  isVisible: boolean;
  title: string | ReactNode | Element;
  closeButton?: boolean;
  height: number;
  children: ReactNode;
  setIsVisible: (value: boolean) => void;
  onConfirm?: () => void;
  onReject?: () => void;
  confirmTitle?: string;
  rejectTitle?: string;
  scroll?: boolean;
  contentStyle?: string;
  fixedButtons?: boolean;
}

const BottomModal = (props: IBottomModal) => {
  const {isVisible, setIsVisible, onReject, onConfirm, confirmTitle, rejectTitle, title, closeButton, contentStyle, height, children, fixedButtons, scroll} = props;

  const handleClose = () => {
    setIsVisible(false);
  };

  const ModalContainer = useStyledTag(Block, 'bg-gray mt-auto', () => ({
    height: heightPixel(height),
  }));

  const Header = useStyledTag(Block, 'middle justify-between row center pl-20 pr-5 h-64 bg-white');
  const CloseButton = useStyledTag(Block, ' w-40 h-40 center middle');
  const Content = useStyledTag(Block, 'flex p-24 ' + contentStyle, () => ({
    minHeight: scroll ? '100%' : 'auto',
  }));

  const FixedButtons = useStyledTag(Block, 'absolute bottom-0 right-0 left-0 px-20 pb-20');
  const Buttons = useStyledTag(Block, 'relative');

  const ButtonsContainer = fixedButtons ? FixedButtons : Buttons;

  const AppModalContainer = scroll ? ScrollView : Block;

  return (
    <AppModal onClose={handleClose} isVisible={isVisible}>
      <ModalContainer>
        <Header>
          <Text sm>{(title as string) || ''}</Text>
          {closeButton && (
            <CloseButton pressable onPress={() => setIsVisible(false)}>
              <AppIcon name={ICONS.Close} size={16} color={COLORS.gray} />
            </CloseButton>
          )}
        </Header>

        <AppModalContainer relative style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Content flex>
            {children}
            <ButtonsContainer>
              <Block row justify-between mt-20>
                {onReject && (
                  <AppButton
                    h-48
                    onPress={() => {
                      onReject();
                      handleClose();
                    }}
                    width={onConfirm && widthPixel(160)}
                    title={rejectTitle}
                    type={'secondary'}
                    titleColor={COLORS.gray}
                  />
                )}
                {onConfirm && (
                  <AppButton
                    h-48
                    onPress={() => {
                      onConfirm();
                      handleClose();
                    }}
                    width={onReject && widthPixel(160)}
                    title={confirmTitle}
                    type="primary"
                  />
                )}
              </Block>
            </ButtonsContainer>
          </Content>
        </AppModalContainer>
      </ModalContainer>
    </AppModal>
  );
};

export default BottomModal;

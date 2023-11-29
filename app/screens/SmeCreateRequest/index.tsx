import React, {useRef} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';

import ExpiryAndAmountEdit from './partials/ExpiryAndAmountEdit';
import {FinancmentSelection} from './partials/FinancmentSelection';
import {SummaryAndConfirmation} from './partials/SummaryAndConfirmation';

import {AppScreen, Block, HorizontalStepper, Text} from '@/components';
import {useDialog, useStyledTag} from '@/hooks';
import {SmeStackNavigationPropsType, SmeStackNavigationRouteType} from '@/navigation/stacks/SmeStack/types';
import {HorizontalStepperMethods} from '@/utils';

const SmeCreateRequest = () => {
  const route = useRoute<SmeStackNavigationRouteType<'SME_CREATE_REQUEST'>>();
  const stepper = useRef<HorizontalStepperMethods>(null);
  const navigation = useNavigation<SmeStackNavigationPropsType>();
  const dialog = useDialog();

  const HeaderRightButton = useStyledTag(Text, 'pressable tinyGray px-16 py-5');

  const onComplete = () => {
    navigation.goBack();
    dialog.show({
      type: 'request_success',
      position: 'left',
      title: 'create_sme.create_req_modal_title',
      message: 'create_sme.create_req_modal_text',
      action: [
        {
          text: 'create_sme.req_detail',
          onPress: () => {
            navigation.goBack();
          },
          style: 'cancel',
        },
      ],
    });
  };

  const navigationOptions = {
    headerRight: () => (
      <HeaderRightButton
        onPress={() => {
          stepper.current?.reset();
        }}>
        common.to_cancel
      </HeaderRightButton>
    ),
  };

  return (
    <Block flex relative>
      <AppScreen p-0 pb-0 navigationOptions={navigationOptions}>
        <Block flex>
          <HorizontalStepper onComplete={onComplete} ref={stepper} initialStep={route?.params?.initialPage || 0}>
            <ExpiryAndAmountEdit stepper={stepper} />
            <FinancmentSelection stepper={stepper} />
            <SummaryAndConfirmation stepper={stepper} />
          </HorizontalStepper>
        </Block>
      </AppScreen>
    </Block>
  );
};

export default SmeCreateRequest;

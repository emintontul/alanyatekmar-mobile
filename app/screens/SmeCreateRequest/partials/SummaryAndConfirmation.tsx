import React, {RefObject} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';

import {pickBy} from 'lodash';

import {AllowanceRequestModel, usePostAllowancesMutation} from '@/api/tekmarApi';
import {AppCard, AppFlatList, Block, CardTypes, Text} from '@/components';
import {useAppSelector, useStyledTag} from '@/hooks';
import {PeriodCard} from '@/screens/DashboardRequestDetail/partials';
import {COLORS} from '@/theme';
import {HorizontalStepperMethods, ICONS, showToast, ToastType} from '@/utils';

export const SummaryAndConfirmation = ({stepper}: {stepper: RefObject<HorizontalStepperMethods>}) => {
  const ConfirmButton = useStyledTag(Block, 'absolute bottom-0 left-0 right-0 h-60 center middle bg-primary px-18');
  const {createRequestBody} = useAppSelector(state => state.requestRedux);

  const {user} = useAppSelector(state => state.auth);

  const [createAllowance, {isLoading}] = usePostAllowancesMutation();

  const onSubmit = async () => {
    const filteredKeys = ['InvoiceId', 'PayableAmount', 'PayableAmountCurrency', 'KdvRate', 'PaymentDueDate'];

    const allowanceInvoices = createRequestBody.allowanceInvoices.map(item => {
      return pickBy(item, (value, key) => filteredKeys.includes(key));
    });

    const body = {
      ...createRequestBody,
      allowanceInvoices,
      senderCompanyId: user?.CompanyId,
      notifyBuyer: 0,
      allowanceBills: [],
      CompanyBankAccountId: null,
    };

    const {error} = await createAllowance(body as AllowanceRequestModel);

    if (!error) {
      stepper.current && stepper.current.next();
    } else {
      showToast({
        type: ToastType.error,
        title: error?.data?.Title,
        message: error?.data?.FriendlyMessage,
      });
    }
  };
  return (
    <Block flex px-20>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block pressable style={styles.discountSummaryContent}>
          <Text title mb-8 mt-24>
            create_sme.step_3_title
          </Text>
          <Text tiny opacity60>
            create_sme.step_3_subtitle
          </Text>

          <PeriodCard summary data={createRequestBody} />

          <Block mt-24>
            <Text medium>create_sme.partially_discounted_invoices</Text>
            <Text tiny opacity60 mt-4>
              create_sme.partially_discounted_invoices_subtitle
            </Text>
            <Block mt-12>
              <AppFlatList
                scrollEnabled={false}
                data={createRequestBody?.allowanceFinancers}
                renderItem={({item}) => <AppCard summaryCard icon={ICONS.Trash} cardType={CardTypes.ISKONTO_ISLEMDE_KIS} item={item} />}
              />
            </Block>
            <Text medium mt-24>
              create_sme.invoices_eligible_for_discount
            </Text>
            <Text tiny opacity60 mt-4>
              create_sme.invoices_eligible_for_discount_subtitle
            </Text>
            <Block mt-12>
              <AppFlatList
                scrollEnabled={false}
                data={createRequestBody?.allowanceFinancers}
                renderItem={({item}) => <AppCard summaryCard icon={ICONS.Trash} cardType={CardTypes.ISKONTO_ISLEMDE_KIS} item={item} />}
              />
            </Block>
          </Block>
        </Block>
      </ScrollView>
      <ConfirmButton pressable onPress={onSubmit}>
        {isLoading ? (
          <Block row>
            <Text buttonTitle white>
              common.please_wait
            </Text>
            <ActivityIndicator color={COLORS.white} />
          </Block>
        ) : (
          <Text buttonTitle white>
            create_sme.confirm_and_create_request
          </Text>
        )}
      </ConfirmButton>
    </Block>
  );
};

const styles = StyleSheet.create({
  discountSummaryContent: {
    paddingBottom: 80,
  },
});

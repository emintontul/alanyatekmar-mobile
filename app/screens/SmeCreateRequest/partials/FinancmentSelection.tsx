import React, {RefObject, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {LimitDistributionCards} from 'data/mock_data';
import {useDispatch} from 'react-redux';

import {GetAllowancesCompaniesApiArg, useGetAllowancesCompaniesQuery} from '@/api/tekmarApi';
import {BankLimitCard, Block, InfoCard, Text} from '@/components';
import {useAppSelector, useStyledTag} from '@/hooks';
import {requestRedux} from '@/store';
import {HorizontalStepperMethods, IAllowancesCompanies, ICONS} from '@/utils';

interface FinancmentSelectionProps {
  stepper: RefObject<HorizontalStepperMethods>;
}

export const FinancmentSelection = ({stepper}: FinancmentSelectionProps) => {
  const {user} = useAppSelector(state => state.auth);

  const dispatch = useDispatch();
  const allowanceInvoices = useAppSelector(state => state.requestRedux.createRequestBody.allowanceInvoices);

  const getAllowancesCompaniesParams: GetAllowancesCompaniesApiArg = {
    allowanceKind: 1,
    notifyBuyer: 0,
    currency: 'TRY',
    senderCompanyId: user?.CompanyId,
    invoices: allowanceInvoices?.map(r => r.InvoiceId),
  };

  const {data: allowancesCompaniesData} = useGetAllowancesCompaniesQuery(getAllowancesCompaniesParams);

  const [selectedBank, setSelectedBank] = useState<number | null | undefined>(null);

  const Button = useStyledTag(Block, 'absolute bottom-0 left-0 right-0 h-60 center middle bg-primary px-18');

  useEffect(() => {
    dispatch(requestRedux.setAllowenceFinancer(allowancesCompaniesData?.[0]?.Id));
  }, [allowancesCompaniesData, dispatch]);

  const handleChange = item => {
    setSelectedBank(item?.Id);
    dispatch(requestRedux.setAllowenceFinancer(item?.Id));
  };

  return (
    <Block flex px-20>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block pressable pb-100>
          <Text title mb-8 mt-24>
            create_sme.step_2_title
          </Text>
          <Text tiny opacity60>
            create_sme.step_2_subtitle
          </Text>
          <InfoCard contentStyle="align-start px-12" mt-30 mb-20 isVisible={true} type={'warning'} iconLeft={ICONS.LightInfo} text={'create_sme.step_2_info_text'} />
          <Text fs-16 regular mb-16>
            create_sme.payment_due_today
          </Text>
          {allowancesCompaniesData?.map((item: IAllowancesCompanies, index: number) => (
            <BankLimitCard
              invoices={item?.Invoices}
              collapse
              detail
              w-full
              mr-6
              item={item}
              key={index}
              checkbox
              checked={selectedBank ? selectedBank === item?.Id : index === 0}
              onPressCheckbox={() => handleChange(item)}
            />
          ))}
          <Text subtitle fs-16 regular mt-16>
            create_sme.payment_due_date
          </Text>
          <Text tiny opacity60 mb-16>
            create_sme.payment_due_date_text
          </Text>

          {LimitDistributionCards.slice(0, 1).map((item, index) => (
            <BankLimitCard detail w-full mr-6 item={item} key={index} />
          ))}
        </Block>
      </ScrollView>
      <Button
        pressable
        onPress={() => {
          stepper.current && stepper.current.next();
        }}>
        <Text buttonTitle white>
          common.continue
        </Text>
      </Button>
    </Block>
  );
};

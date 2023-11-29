import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {AppButton, AppCard, AppFlatList, Block, BottomModal, CardTypes, FilterActions, Shadow, Text} from '@/components';
import {useAppDispatch, useAppSelector, useStyledTag} from '@/hooks';
import {SmeStackNavigationPropsType} from '@/navigation/stacks/SmeStack/types';
import {requestRedux} from '@/store';
import {COLORS} from '@/theme';
import {formatCurrency, IFinancementInvoices, RenderWhen} from '@/utils';

interface RequestInvoiceSelectListProps {
  invoicesListData: {Invoices: Array<IFinancementInvoices>};
}

const RequestInvoicesSelectListFooter = ({onPress}: {onPress: () => void}) => {
  const allowanceInvoices = useAppSelector(state => state.requestRedux.createRequestBody.allowanceInvoices);
  const totalAmount = useAppSelector(state => state.requestRedux.totalAmount);

  const SelectedCount = useStyledTag(Text, 'bold pt-12 mr-5', () => ({
    color: true ? COLORS.black : COLORS.gray,
  }));

  return (
    <Shadow md>
      <Block absolute bottom-0 left-0 right-0 h-102 bg-white center px-18>
        <Block row>
          <SelectedCount>{allowanceInvoices?.length || []}</SelectedCount>
          <Text bold defaultGray pt-12>
            sme.invoices_selected
          </Text>
          <RenderWhen.If isTrue={true}>
            <Text bold pt-12 ml-10>
              {formatCurrency(totalAmount)}
            </Text>
          </RenderWhen.If>
        </Block>

        <RenderWhen>
          <RenderWhen.If isTrue={allowanceInvoices?.length > 0}>
            <AppButton onPress={onPress} mt-8 h-47 type="primary" title="sme.create_request" />
          </RenderWhen.If>
          <RenderWhen.If isTrue={allowanceInvoices?.length === 0}>
            <Text defaultGray pt-16>
              sme.select_invoice_to_create_request
            </Text>
          </RenderWhen.If>
        </RenderWhen>
      </Block>
    </Shadow>
  );
};

const RequestInvoiceSelectList = (props: RequestInvoiceSelectListProps) => {
  const {invoicesListData} = props;

  const [checkExpiryDateModal, setCheckExpiryDateModal] = useState<boolean>(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const navigation = useNavigation<SmeStackNavigationPropsType>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestRedux.reset());
  }, [dispatch]);

  const handleChange = (item: IFinancementInvoices, value: boolean) => {
    dispatch(requestRedux.setAllowenceInvoices({item: {...item, PayableAmount: item.RemainingAmount, InvoiceId: item.Id}, isAdd: value}));
  };

  const selectAll = () => {
    if (!isAllSelected) {
      const data = {
        invoices: {
          allowanceInvoices: invoicesListData?.Invoices?.map(item => ({...item, PayableAmount: item.RemainingAmount, InvoiceId: item.Id})),
        },
      };
      dispatch(requestRedux.setAllowenceInvoices(data));
    } else {
      dispatch(requestRedux.setAllowenceInvoices({invoices: {allowanceInvoices: []}}));
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <>
      <Block px-20 flex>
        <AppFlatList
          ListHeaderComponent={<FilterActions rightText={!isAllSelected ? 'common.select_all' : 'common.remove_selected'} onRightPress={selectAll} />}
          contentContainerStyle={{paddingBottom: 122}}
          data={invoicesListData?.Invoices}
          renderItem={({item}) => <AppCard isAllSelected={isAllSelected} onCheckedChange={handleChange} item={item} checkbox cardType={CardTypes.FATURA_TALEBI_KARTI} />}
        />
      </Block>

      <RequestInvoicesSelectListFooter
        onPress={() => {
          setCheckExpiryDateModal(true);
        }}
      />

      {/* İskonto talebi oluştur butonuna tıkladıktan sonra vade tarihi kontrolü için açılan modal */}
      <BottomModal
        fixedButtons
        onConfirm={() => {
          navigation.navigate('SME_CREATE_REQUEST');
        }}
        confirmTitle="common.got_it_continue"
        title="sme.check_due_dates_title"
        height={278}
        isVisible={checkExpiryDateModal}
        setIsVisible={setCheckExpiryDateModal}
        closeButton>
        <Text tiny opacity60>
          sme.check_due_dates_text
        </Text>
      </BottomModal>
    </>
  );
};

export default RequestInvoiceSelectList;

import React from 'react';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import CardStepper from './partials/CardStepper';

import {AppIcon, Block, Shadow, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {RequestStackNavigationPropsType} from '@/navigation/stacks/RequestStack/types';
import {COLORS} from '@/theme';
import {formatCurrency, ICONS, IRequestCard} from '@/utils';

interface RequestCardProps {
  item: IRequestCard | unknown;
}

const RequestCard = (props: RequestCardProps) => {
  const {item} = props;

  const RequestCardContainer = useStyledTag(Block, ' bg-white mb-6 relative p-16 rounded-4 pressable', () => ({}));
  const Header = useStyledTag(Block, 'row center justify-between');
  const Divider = useStyledTag(Block, 'w-full mt-9 mb-8', () => ({borderBottomWidth: 1, opacity: 0.08}));
  const Content = useStyledTag(Block, 'row ');

  const navigation = useNavigation<RequestStackNavigationPropsType>();

  return (
    <Shadow md>
      <RequestCardContainer pressable onPress={() => navigation.navigate('REQUEST_DETAIL', {item})}>
        <Header>
          <Block row>
            <Text bold>{item?.RequestName || '-- '}</Text>
            <Text ml-4 opacity40>
              #{item?.Id}
            </Text>
          </Block>
          <AppIcon name={ICONS.RightArrow} color={COLORS.gray} size={24} />
        </Header>
        <Divider />
        <Content>
          <Block flex>
            <Text tiny opacity60>
              request_detail.discount_amount
            </Text>
            <Text bold mt-2>
              {formatCurrency(item?.TotalPayableAmount)}
            </Text>

            <Block row center>
              <Text tiny>{item?.TotalInvoiceCount} </Text>
              <Text>common.invoice</Text>
            </Block>
          </Block>
          <Block flex>
            <Text tiny opacity60>
              request_detail.payment_receipt_date
            </Text>
            <Text bold mt-2>
              {moment(item?.AllowanceDueDate).format('DD.MM.YYYY')}
            </Text>
          </Block>
        </Content>
        <CardStepper title={item?.StatusDescription} status={item?.Status} />
      </RequestCardContainer>
    </Shadow>
  );
};

export default RequestCard;

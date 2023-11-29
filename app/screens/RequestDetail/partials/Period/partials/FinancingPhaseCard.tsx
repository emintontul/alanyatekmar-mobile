import React from 'react';

import {getDynamicTitleStyle} from '..';

import {AppButton, Block, Text, VerticalStepper} from '@/components';
import {useStyledTag} from '@/hooks';
import {RenderWhen, RequestStatuses} from '@/utils';

export const FinancingPhaseCard = (props: {status: RequestStatuses}) => {
  const {status} = props;
  const Container = useStyledTag(Block, 'ml-8 p-16 flex rounded-4 bg-white mb-20');

  const StepperTitle = useStyledTag(Text, 'tiny black');
  const StepperSubtitle = useStyledTag(Text, 'mt-4 tiny opacity60');
  const StepContent = useStyledTag(Block, 'ml-8 flex pb-20');
  const Title = useStyledTag(Text, 'semibold', () => ({
    ...getDynamicTitleStyle(status, RequestStatuses.finansman_asamasi)?.text,
  }));

  return (
    <Container>
      <Title semibold>request_detail.financing_phase</Title>
      <RenderWhen>
        <RenderWhen.If isTrue={status === RequestStatuses.finansman_asamasi}>
          <Block mt-16>
            <Text tiny semibold>
              request_detail.receivable_form
            </Text>
            <Text mt-6 tiny opacity60>
              request_detail.receivable_form_subtitle
            </Text>
            <Text mt-3 tinyInfo semibold>
              request_detail.receivable_form_que
            </Text>
            <Block mt-20>
              <VerticalStepper initialStep={0}>
                <Block ml-8 pb-20>
                  <StepperTitle>request_detail.download_rnf_device</StepperTitle>
                  <StepperSubtitle>request_detail.send_email_info</StepperSubtitle>
                  <AppButton mt-8 h-40 w-114 type="primary" title="request_detail.download_rnf" />
                </Block>
                <StepContent>
                  <StepperTitle>request_detail.document_output</StepperTitle>
                </StepContent>
                <StepContent>
                  <Text tiny black>
                    request_detail.not_e_invoice
                  </Text>
                </StepContent>
                <StepContent>
                  <StepperTitle>request_detail.signed_abf</StepperTitle>
                </StepContent>
              </VerticalStepper>
            </Block>
          </Block>
        </RenderWhen.If>
      </RenderWhen>
    </Container>
  );
};

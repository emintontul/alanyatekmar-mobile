import React, {useState} from 'react';

import {DocumentsData} from 'data/mock_data';

import {images} from '@/assets';
import {AppImage, Block, BottomModal, DocumentCard, Text} from '@/components';
import {useStyledTag} from '@/hooks';

const KobiInformation = () => {
  const [modal, setModal] = useState(false);

  const ModalContainer = useStyledTag(Block, 'pt-34');
  return (
    <>
      <Block center>
        <Text bigHeaderDark color="#000" mb-14>
          common.SME_financing
        </Text>
        <Text tinyGray mr-5 textCenter>
          e-Faturalarınızı vadesinden önce tahsil etmek için KOBİ Finansmanı nı deneyin.{' '}
          <Text tinyInfo pressable onPress={() => setModal(true)}>
            common.detail
          </Text>
        </Text>
      </Block>
      <BottomModal scroll isVisible={modal} setIsVisible={setModal} closeButton={true} height={669} title="home.discover_our_products">
        <ModalContainer>
          <Block center>
            <AppImage url={images.computer} width={180} height={92} />
            <Text textCenter tiny pt-32>
              home.financing_incentive_comment
            </Text>
            <Text textCenter tiny opacity60 pt-32>
              home.financing_incentive_modal_desc
            </Text>
          </Block>
          <Block mt-24>
            {DocumentsData.map(item => (
              <DocumentCard key={item.id} item={item} ignoreDetail />
            ))}
          </Block>
        </ModalContainer>
      </BottomModal>
    </>
  );
};

export default KobiInformation;

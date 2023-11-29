import React, {useState} from 'react';

import {useTranslation} from 'react-i18next';

import {AppIcon, Block, BottomModal, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

interface IDocumentCard {
  id: number;
  title: string;
  uploadDate: string;
  isWaiting: boolean;
}

interface DocumentCardItemProps {
  item: IDocumentCard;
  ignoreDetail?: boolean;
}

const DocumentCard = (props: DocumentCardItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const {item, ignoreDetail} = props;
  const {t} = useTranslation();

  const DocumentCardContainer = useStyledTag(Block, 'bg-white p-14 mb-6 rounded-4 row justify-between center');
  const ActionsContainer = useStyledTag(Block, 'row center');
  const StatusBadge = useStyledTag(Block, 'px-8 center middle bg-yellow rounded-4 h-24', () => ({
    backgroundColor: item.isWaiting ? COLORS.yellow : COLORS.lightBlue,
  }));

  return (
    <React.Fragment>
      <DocumentCardContainer>
        <Block column flex>
          <Block row>
            <Text semibold flex mr-16>
              {item?.title}
            </Text>
            <StatusBadge>
              <Text sm>{item.isWaiting ? 'common.waiting' : 'common.current'}</Text>
            </StatusBadge>
          </Block>
          {ignoreDetail ||
            (!item?.isWaiting && (
              <Block mt-12 row justify-between center>
                <Text tinyGray>{t('common.upload_date', {date: item.uploadDate}).toString()}</Text>
                <ActionsContainer>
                  <AppIcon name={ICONS.Download2} size={20} color={COLORS.gray} />
                  <Block pressable onPress={() => setIsVisible(true)} ml-20>
                    <AppIcon name={ICONS.Trash} size={20} color={COLORS.gray} />
                  </Block>
                </ActionsContainer>
              </Block>
            ))}
        </Block>
      </DocumentCardContainer>
      {/* Döküman silerken açılan modal */}
      <BottomModal
        onConfirm={() => console.log(true)}
        onReject={() => console.log(false)}
        confirmTitle="Sil"
        rejectTitle="Vazgeç"
        height={246}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title={'documents.delete_document'}>
        <Block flex justify-between>
          <Text tiny opacity60>
            <Text tiny opacity60 semibold>
              {item.title}
            </Text>
            documents.delete_document_question
          </Text>
        </Block>
      </BottomModal>
    </React.Fragment>
  );
};

export default DocumentCard;

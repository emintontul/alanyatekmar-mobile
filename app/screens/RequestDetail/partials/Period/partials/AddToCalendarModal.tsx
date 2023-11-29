import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';

import {images} from '@/assets';
import {AppIcon, AppImage, Block, BottomModal, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

const CalendarsData = [
  {
    id: 1,
    calendarName: 'Google Takvim',
    image: images.googleCalendar,
  },
  {
    id: 2,
    calendarName: 'Apple Takvim',
    image: images.appleCalendar,
  },
  {
    id: 3,
    calendarName: 'Google Takvim',
    image: images.googleCalendarV2,
  },
];
export interface AddToCalendarMethods {
  open: () => void;
}

export const AddToCalendarModal = forwardRef((_, ref: Ref<AddToCalendarMethods>) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
  }));

  const CalendarContainer = useStyledTag(Block, 'row center justify-between bg-white p-24 h-82 rounded-4 mb-8');
  return (
    <BottomModal contentStyle="py-24 px-20" height={490} title="request_detail.add_calendar" isVisible={isVisible} setIsVisible={setIsVisible} closeButton>
      <Text subtitle mb-20>
        request_detail.calendar_modal_text
      </Text>
      {CalendarsData.map(item => (
        <CalendarContainer key={item.id}>
          <Block row center>
            <AppImage url={item.image} width={32} height={32} />
            <Text ml-16 medium>
              {item.calendarName}
            </Text>
          </Block>
          <AppIcon name={ICONS.RightArrow} size={16} color={COLORS.gray} />
        </CalendarContainer>
      ))}
    </BottomModal>
  );
});

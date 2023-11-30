/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, Ref, RefObject, useEffect, useImperativeHandle, useRef, useState} from 'react';

import {debounce} from 'lodash';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {MarkedDates} from 'react-native-calendars/src/types';

import BottomModal from '../BottomModal';
import FastSelectDay, {BadgeItemProps, DayBadgeData} from '../FastSelectDay';

import {useGetOfficialHolidaysQuery} from '@/api/tekmarApi';
import {AppCalendar, AppIcon, AppInput, Block, Text} from '@/components';
import {AppCalendarMethods} from '@/components/Common/AppCalendar';
import {useDialog} from '@/hooks';
import {COLORS, window} from '@/theme';
import {ICONS} from '@/utils';

export interface CalendarDateSelectMethods {
  open: () => void;
}

interface DaySelectProps {
  calendar: RefObject<AppCalendarMethods>;
}

const DaySelect = forwardRef(({calendar}: DaySelectProps, ref) => {
  const [selected, setSelected] = useState<BadgeItemProps>({id: 1, day: 15});
  const [inputValue, setInputValue] = useState(selected.day.toString());

  useImperativeHandle(ref, () => ({
    setDays: (day: number) => {
      const selectedDay = DayBadgeData.find(item => item.day === day);
      if (selectedDay) {
        setSelected(selectedDay);
        setInputValue(selectedDay.day.toString());
      } else {
        setSelected({id: 0, day});
        setInputValue(day.toString());
      }
    },
    diff: () => selected.day,
  }));

  const setCalendar = debounce(day => {
    calendar?.current?.setDate(moment().add('days', day).format('YYYY-MM-DD'));
    setInputValue(day.toString());
  }, 0);

  return (
    <Block mt-12>
      <FastSelectDay
        value={selected}
        onSelect={item => {
          setCalendar(item.day);
          setSelected(item);
        }}
      />
      <AppInput
        onChangeText={text => {
          setCalendar(Number(text));
          setInputValue(text);
          setSelected(DayBadgeData.find(item => item.day === Number(text)) || {id: 0, day: Number(text)});
        }}
        value={inputValue}
        placeholder="Vade Günü Belirleyin (Max. 90 Gün)"
      />
    </Block>
  );
});

interface CalendarDateSelectProps {
  date: string;
  onSelect: (date: string) => void;
}

const CalendarDateSelect = (props: CalendarDateSelectProps, ref: Ref<CalendarDateSelectMethods>) => {
  const {date, onSelect} = props;

  const {t} = useTranslation();
  const dialog = useDialog();

  const {data: officialDaysResponse} = useGetOfficialHolidaysQuery({year: new Date().getFullYear()});
  const {OfficialHolidays = []} = officialDaysResponse || {};

  const [isVisible, setIsVisible] = useState(false);
  const daySelect = useRef<{setDays: (days: number) => void; diff: () => number | string}>();
  const calendar = useRef<AppCalendarMethods>(null);
  const [disabledDates, setDisabledDates] = useState<MarkedDates>({});

  const [inputValue, setInputValue] = useState(date);

  useEffect(() => {
    if (OfficialHolidays?.length > 0) {
      const tempDisabledDates: MarkedDates = {};
      OfficialHolidays.forEach(item => {
        const tempDisabledDateItem = moment(item.Date).format('YYYY-MM-DD');
        tempDisabledDates[tempDisabledDateItem] = {
          disabled: true,
        };
      });
      setDisabledDates(tempDisabledDates);
    }
  }, [OfficialHolidays]);

  useEffect(() => {
    if (date) {
      const given = moment(date, 'YYYY-MM-DD');
      const current = moment().startOf('day');
      const days = moment.duration(given.diff(current)).asDays();

      setInputValue(`${days} ${t('common.day')} - ${moment(date).format('YYYY.MM.DD')}`);
    }
  }, [date]);

  useImperativeHandle(ref, () => ({
    open: () => {},
  }));

  const onSelectDay = (selectedDate: string, isDisabled?: boolean, isWeekend?: boolean) => {
    if (isDisabled || isWeekend) {
      setIsVisible(false);
      dialog.show({
        type: 'calendar_warning',
        position: 'left',
        title: isDisabled ? 'calendar_date.disabled_day_warning' : 'calendar_date.weekend_warning',
        message: 'calendar_date.select_another_day_warning',
        action: [
          {
            text: 'calendar_date.select_nearest_day',
            onPress: () => {
              const given = moment(selectedDate, 'YYYY-MM-DD').subtract(1, 'day');
              const current = moment().startOf('day');
              const days = moment.duration(given.diff(current)).asDays();
              daySelect?.current?.setDays(days);
            },
            style: 'confirm',
          },
          {
            text: 'calendar_date.select_another_day',
            onPress: () => setIsVisible(true),
            style: 'default',
          },
        ],
      });
      return;
    }
    const given = moment(selectedDate, 'YYYY-MM-DD');
    const current = moment().startOf('day');
    const days = moment.duration(given.diff(current)).asDays();
    daySelect?.current?.setDays(days);
  };

  return (
    <React.Fragment>
      <AppInput
        onPress={() => {
          setIsVisible(true);

          const given = moment(date, 'YYYY-MM-DD');
          const current = moment().startOf('day');
          const days = moment.duration(given.diff(current)).asDays();

          setTimeout(() => {
            calendar?.current?.setDate(moment(date).format('YYYY-MM-DD'));
            daySelect?.current?.setDays(days);
          }, 200);
        }}
        value={inputValue}
        label="common.expiry_day_date"
        icon={ICONS.Calendar}
      />
      <BottomModal
        onConfirm={() => {
          setInputValue(`${daySelect.current?.diff()} ${t('common.day')} - ${calendar?.current?.selectedDate()}`);
          onSelect(calendar?.current?.selectedDate().split('.').join('-') || '');
        }}
        onReject={() => {}}
        confirmTitle="common.start"
        rejectTitle="common.cancel"
        height={window.designHeight - 40}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title={
          <Block row center>
            <AppIcon name={ICONS.Calendar} size={16} color={COLORS.black} />
            <Text ml-10 font fs-13 medium>
              calendar_date.select_day_expiry_date
            </Text>
          </Block>
        }>
        <Text medium mb-4>
          calendar_date.select_expiry_date_from_calendar
        </Text>
        <Text tinyGray mb-12>
          calendar_date.expiry_info
        </Text>
        <AppCalendar ref={calendar} onSelectDay={onSelectDay} markedDates={disabledDates} />
        <DaySelect calendar={calendar} ref={daySelect} />
        {/*<Block row center mt-20>
          <AppCheckbox checked={false} onPress={() => {}} />
          <Text ml-11>calendar_date.apply_to_all</Text>
        </Block>*/}
      </BottomModal>
    </React.Fragment>
  );
};

export default forwardRef(CalendarDateSelect);

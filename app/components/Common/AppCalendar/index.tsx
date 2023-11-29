import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {StyleSheet} from 'react-native';

import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';

import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

import {useStyledTag} from '@/hooks';
import {COLORS, FONTS, SIZES} from '@/theme';
import {fontPixel, ICONS} from '@/utils';

export interface AppCalendarMethods {
  setDate: (date: string) => void;
  selectedDate: () => string;
}

export interface AppCalendarProps {
  firstDay?: number;
  markedDates?: MarkedDates | undefined;
  onSelectDay?: (date: string, isDisabled?: boolean, isWeekend?: boolean) => void;
}

const AppCalendar = (props: AppCalendarProps, ref: Ref<AppCalendarMethods>) => {
  const {firstDay = 1, markedDates, onSelectDay, ...rest} = props;
  const [selectedDate, setSelectedDate] = useState('');

  const DayText = useStyledTag(Text, 'right tinyGray fs-12', ({date}: {date?: string}) => ({
    color: date === selectedDate ? COLORS.primary : COLORS.gray,
  }));

  const DisabledDayText = useStyledTag(Text, 'right tinyGray fs-12', () => ({
    color: COLORS.lightGray,
  }));

  const isWeekendDay = (date: string) => [0, 6].includes(new Date(date).getDay());
  const isDisabledDay = (date: string) => (Object.keys(markedDates || {})?.find(markedDate => markedDate === date) ? true : false);

  useImperativeHandle(ref, () => ({
    setDate: (date: string) => {
      setSelectedDate(date);
    },
    selectedDate: () => moment(selectedDate).format('YYYY.MM.DD'),
  }));

  const containerStyle = {
    'stylesheet.calendar.main': {
      week: {
        marginVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      container: {
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 8,
      },
    },
  };

  return (
    <Calendar
      firstDay={firstDay}
      initialDate={selectedDate}
      markedDates={markedDates}
      enableSwipeMonths
      style={styles.calendar}
      theme={{
        backgroundColor: COLORS.white,
        calendarBackground: COLORS.white,
        textSectionTitleColor: COLORS.gray,
        textSectionTitleDisabledColor: COLORS.lightGray,
        selectedDayBackgroundColor: COLORS.secondary,
        selectedDayTextColor: COLORS.white,
        todayTextColor: COLORS.white,
        dayTextColor: COLORS.white,
        textDisabledColor: COLORS.lightGray,
        dotColor: COLORS.secondary,
        selectedDotColor: COLORS.white,
        arrowColor: COLORS.gray,
        disabledArrowColor: COLORS.lightGray,
        monthTextColor: COLORS.gray,
        indicatorColor: COLORS.gray,
        textDayFontFamily: FONTS.regular,
        textMonthFontFamily: FONTS.regular,
        textDayHeaderFontFamily: FONTS.regular,
        textMonthFontWeight: '500',
        textDayFontSize: 8,
        textDayFontWeight: '500',
        textMonthFontSize: 20,
        textDayHeaderFontSize: fontPixel(10),
        ...containerStyle,
      }}
      renderHeader={() => <Text semibold>{moment(selectedDate).format('DD MMMM')}</Text>}
      renderArrow={direction => <AppIcon name={direction === 'left' ? ICONS.LeftArrow : ICONS.RightArrow} size={22} color={COLORS.gray} />}
      dayComponent={({
        date = {
          dateString: '',
          day: '',
          month: '',
          year: '',
          timestamp: 0,
          padEnd: '',
        },
      }) => {
        const isDisabled = isDisabledDay(date?.dateString);
        const isWeekend = isWeekendDay(date?.dateString);
        return (
          <Block
            pressable
            relative
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              opacity: moment().isSameOrAfter(moment(date?.dateString).add('day', 1)) ? 0.6 : 1,
              borderColor: date?.dateString !== selectedDate || isDisabled || isWeekend ? COLORS.white : COLORS.info,
              borderWidth: !isDisabled && !isWeekend ? 1.5 : 0,
              backgroundColor: date?.dateString !== selectedDate || isDisabled || isWeekend ? COLORS.white : COLORS.infoLight,
            }}
            onPress={() => {
              if (!moment().isSameOrAfter(moment(date?.dateString).add('day', 1))) {
                setSelectedDate(date?.dateString);
                onSelectDay?.(date?.dateString, isDisabled, isWeekend);
              }
            }}>
            <Block center middle s={`bg-${date?.dateString === selectedDate ? 'secondary' : 'secondary'}`} borderRadius={SIZES.radius} w-40 h-40>
              {isDisabled || isWeekend ? <DisabledDayText>{date?.day}</DisabledDayText> : <DayText date={date?.dateString}>{date.day}</DayText>}
              {date?.dateString === moment().format('YYYY-MM-DD') && <Block bottom-4 absolute w-5 h-5 borderRadius={SIZES.radius} s="bg-primary" />}
            </Block>
          </Block>
        );
      }}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: '100%',
  },
});

export default forwardRef(AppCalendar);

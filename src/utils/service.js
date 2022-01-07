import { DateTime } from "luxon";

import i18n from '../i18n';
import { WEEK_DAYS } from '../constants';

const reduceWeeksByDate = (weeks) => weeks
  .reduce((memo, { date, count }) => ({ ...memo, [date]: count}), {});

const reduceDaysByName = (days) => days
  .reduce((memo, { start, end, name }) => ({ ...memo, [name.toLowerCase()]: { start, end }}), {});

/**
 * @description This method gets the next 5 weeks, starting from the current date
 * @return {*[]}
 */
const getNextFiveWeeks = () => {
  let nextFiveWeeks = [];
  for (let count = 0; count < 6; count++) {
    const dt = DateTime
      .local()
      .plus({ weeks: count })
      .endOf('week')
      .toFormat('yyyy-LL-dd');
    nextFiveWeeks.push({ date: dt, count: 0 });
  }
  return nextFiveWeeks;
}

/**
 * @description This method format the next five weeks and the all the weeks that
 *  has a previous record created, return the list of weeks
 * @param weeks
 * @return {{date: *, count: *, text: string}[]}
 */
export const formatWeeks = (weeks) => {
  const reducedWeeks = reduceWeeksByDate(weeks);
  const nextFiveWeeks = getNextFiveWeeks();
  const uniqueWeeks = nextFiveWeeks.filter(({ date }) => !reducedWeeks[date])
  return [ ...uniqueWeeks, ...weeks]
    .sort((a, b) => a.date > b.date ? 1 : -1)
    .map(({ date, count }) => {
      const dt = DateTime
        .fromISO(date, { zone: 'utc'})
      return {
        date,
        count,
        number: dt.toFormat('W'),
        text: dt.toFormat(`'${i18n.t('Week')}' W '${i18n.t('of')}' y'`)
      }
    })
}

/**
 * @description This method formats the work shifts that are created on the current week
 *  it maps the data, using the day as a key and the range as a nested key
 *  that returns the work shift
 * @param workShifts
 * @return {*}
 */
const formatWorkShifts = (workShifts) => {
  return workShifts.reduce((memo, { user, start, end, id }) => {
    const date = DateTime
      .fromISO(start, { zone: 'utc'});
    const startHour = date.toFormat('T');
    const endHour = DateTime
      .fromISO(end, { zone: 'utc'})
      .toFormat('T')
    const day = date
      .toFormat('cccc')
      .toLowerCase();
    const range = `${startHour} - ${endHour}`
    const workShift = {
      [range]: {
        user,
        day,
        start,
        end,
        id,
        range
      }
    }
    return {
      ...memo,
      [day]: memo[day]
        ? { ...memo[day], ...workShift }
        : workShift
    }
  }, {});
}

/**
 * @description This method find the lowest and the highest hour on the week
 *  then it creates an array starting from the lowest hour summing 1 to each hour
 *  it continues until the counter reach the highest hour of the week
 * @param days
 * @return {*[]}
 */
const formatHours = (days) => {
  let start = Math.min(...days.map((day) => day.start));
  let end = Math.max(...days.map((day) => day.end));
  let hours = [];
  while (start < end) {
    const startRange = DateTime
      .now()
      .set({
        hour: start,
        minute: 0
      })
      .toFormat('T');
    const endRange = DateTime
      .now()
      .set({
        hour: start + 1,
        minute: 0
      })
      .toFormat('T');
    hours.push({
      range: `${startRange} - ${endRange}`,
      startRange,
      endRange,
      start,
      end: start + 1
    })
    start++;
  }
  return hours;
}

/**
 * @description This method match the formatted hours with the formattedWorkShifts
 *  preparing all the necessary data to print the calendar.
 * @param formattedHours
 * @param formattedWorkShifts
 * @param reducedDays
 * @param week
 * @return {*}
 */
const matchHoursAndWorkShifts = (formattedHours, formattedWorkShifts, reducedDays, week ) => {
  return formattedHours.map(({ range, start, end }) => ({
    range,
    ...WEEK_DAYS.reduce((memo, { day, weekDay}) => {
      const startDate = DateTime.fromObject({
        weekday: weekDay,
        hour: start,
        weekNumber: week.number,
        minutes: 0
      }).toFormat("yyyy'-'LL'-'dd T")
      const endDate = DateTime.fromObject({
        weekday: weekDay,
        hour: end,
        weekNumber: week.number,
        minutes: 0
      }).toFormat("yyyy'-'LL'-'dd T")
      const {
        start: currentDayStart,
        end: currentDayEnd
      } = reducedDays[day];
      const base = {
        user: {},
        startDate,
        endDate,
        isSelectable: currentDayStart <= start && currentDayEnd >= end
      };
      return {
        ...memo,
        [day]: formattedWorkShifts[day]
          ? formattedWorkShifts[day][range]
            ? { ...base, ...formattedWorkShifts[day][range], color: 'bg-black' }
            : base
          : base
      }
    }, {})
  }))
}

/**
 * @description This method formats all then necessary data to render the calendar
 * @param service
 * @param workShifts
 * @param week
 * @return {*}
 */
export const formatCalendar = (service, workShifts, week) => {
  const days = service.setting.days;
  const formattedHours = formatHours(days);
  const formattedWorkShifts = formatWorkShifts(workShifts);
  const reducedDays = reduceDaysByName(days);
  return matchHoursAndWorkShifts(formattedHours, formattedWorkShifts, reducedDays, week);
}

export const formatResume = (workShifts) => {
  const a = workShifts.reduce((memo, workShift) => {
    const { user } = workShift;
    return {
      ...memo,
      [user.id]: memo[user.id]
        ? { ...user, count: memo[user.id].count + 1 }
        : { ...user, count: 1}
    }
  }, {});
  return Object.values(a);
}

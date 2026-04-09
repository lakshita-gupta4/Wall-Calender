import { useState, useCallback } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isWithinInterval,
  isToday,
  format,
} from "date-fns";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState(false);

  const calendarDays = (() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  })();

  const goNextMonth = useCallback(() => setCurrentMonth((m) => addMonths(m, 1)), []);
  const goPrevMonth = useCallback(() => setCurrentMonth((m) => subMonths(m, 1)), []);
  const goToToday = useCallback(() => setCurrentMonth(new Date()), []);

  const handleDayClick = useCallback(
    (day: Date) => {
      if (!selecting || !dateRange.start) {
        setDateRange({ start: day, end: null });
        setSelecting(true);
      } else {
        const start = dateRange.start;
        if (day < start) {
          setDateRange({ start: day, end: start });
        } else {
          setDateRange({ start, end: day });
        }
        setSelecting(false);
        setHoverDate(null);
      }
    },
    [selecting, dateRange.start]
  );

  const clearRange = useCallback(() => {
    setDateRange({ start: null, end: null });
    setSelecting(false);
    setHoverDate(null);
  }, []);

  const isInRange = useCallback(
    (day: Date) => {
      const end = selecting && hoverDate ? hoverDate : dateRange.end;
      const start = dateRange.start;
      if (!start || !end) return false;
      const s = start < end ? start : end;
      const e = start < end ? end : start;
      return isWithinInterval(day, { start: s, end: e });
    },
    [dateRange, hoverDate, selecting]
  );

  const isRangeStart = useCallback(
    (day: Date) => !!dateRange.start && isSameDay(day, dateRange.start),
    [dateRange.start]
  );

  const isRangeEnd = useCallback(
    (day: Date) => {
      const end = selecting && hoverDate ? hoverDate : dateRange.end;
      return !!end && isSameDay(day, end);
    },
    [dateRange.end, hoverDate, selecting]
  );

  return {
    currentMonth,
    calendarDays,
    dateRange,
    hoverDate,
    selecting,
    goNextMonth,
    goPrevMonth,
    goToToday,
    handleDayClick,
    clearRange,
    isInRange,
    isRangeStart,
    isRangeEnd,
    setHoverDate,
    isToday,
    format,
    isSameMonth: (day: Date) =>
      day.getMonth() === currentMonth.getMonth() &&
      day.getFullYear() === currentMonth.getFullYear(),
  };
}

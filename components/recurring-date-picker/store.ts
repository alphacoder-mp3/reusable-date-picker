import { create } from 'zustand';
import { addDays, addMonths, addWeeks, addYears, startOfDay } from 'date-fns';

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurringDateState {
  startDate: Date;
  endDate: Date | null;
  recurrenceType: RecurrenceType;
  interval: number;
  selectedDays: number[];
  previewDates: Date[];
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  setSelectedDays: (days: number[]) => void;
  updatePreviewDates: () => void;
}

export const useRecurringDateStore = create<RecurringDateState>((set, get) => ({
  startDate: startOfDay(new Date()),
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  selectedDays: [],
  previewDates: [],

  setStartDate: (date) => {
    set({ startDate: startOfDay(date) });
    get().updatePreviewDates();
  },

  setEndDate: (date) => {
    set({ endDate: date ? startOfDay(date) : null });
    get().updatePreviewDates();
  },

  setRecurrenceType: (type) => {
    set({ recurrenceType: type });
    get().updatePreviewDates();
  },

  setInterval: (interval) => {
    set({ interval: interval });
    get().updatePreviewDates();
  },

  setSelectedDays: (days) => {
    set({ selectedDays: days });
    get().updatePreviewDates();
  },

  updatePreviewDates: () => {
    const { startDate, endDate, recurrenceType, interval } = get();
    const dates: Date[] = [];
    let currentDate = startDate;
    const maxPreviewDates = 10;

    while (dates.length < maxPreviewDates && (!endDate || currentDate <= endDate)) {
      dates.push(currentDate);

      switch (recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, interval);
          break;
        case 'weekly':
          currentDate = addWeeks(currentDate, interval);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, interval);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, interval);
          break;
      }
    }

    set({ previewDates: dates });
  },
}));
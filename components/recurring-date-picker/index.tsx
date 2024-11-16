'use client';

import { Calendar } from '@/components/ui/calendar';
import { useRecurringDateStore } from '@/components/recurring-date-picker/store';
import RecurrenceOptions from '@/components/recurring-date-picker/recurrence-options';
import DatePreview from '@/components/recurring-date-picker/date-preview';

const RecurringDatePicker: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } =
    useRecurringDateStore();

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Start Date</h3>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={date => date && setStartDate(date)}
              className="rounded-md border flex justify-center"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">End Date (Optional)</h3>
            <Calendar
              mode="single"
              selected={endDate || undefined}
              onSelect={setEndDate}
              className="rounded-md border flex justify-center"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Recurrence Pattern</h3>
            <RecurrenceOptions />
          </div>

          <DatePreview />
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;

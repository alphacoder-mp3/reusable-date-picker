import { format } from 'date-fns';
import { useRecurringDateStore } from '@/components/recurring-date-picker/store';
import { Calendar } from '@/components/ui/calendar';

const DatePreview: React.FC = () => {
  const { previewDates } = useRecurringDateStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Preview</h3>
      <Calendar
        mode="multiple"
        selected={previewDates}
        className="rounded-md border"
      />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Upcoming Dates:</h4>
        <ul className="text-sm space-y-1">
          {previewDates.map((date, index) => (
            <li key={index} className="text-gray-600">
              {format(date, 'PPP')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatePreview;

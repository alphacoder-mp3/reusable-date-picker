import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  useRecurringDateStore,
  RecurrenceType,
} from '@/components/recurring-date-picker/store';

const RecurrenceOptions: React.FC = () => {
  const { recurrenceType, setRecurrenceType, interval, setInterval } =
    useRecurringDateStore();
  const [inputValue, setInputValue] = useState(interval.toString());

  const options: RecurrenceType[] = ['daily', 'weekly', 'monthly', 'yearly'];

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setInterval(parsedValue);
    } else {
      setInterval(1);
    }
  };

  // Update input value when interval changes externally
  useEffect(() => {
    setInputValue(interval.toString());
  }, [interval]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <Button
            key={option}
            variant={recurrenceType === option ? 'default' : 'outline'}
            onClick={() => setRecurrenceType(option)}
            className="capitalize"
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Every</label>
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={handleIntervalChange}
          onBlur={() => {
            const parsedValue = parseInt(inputValue, 10);
            if (isNaN(parsedValue) || parsedValue < 1) {
              setInputValue('1');
              setInterval(1);
            }
          }}
          className="w-16 px-2 py-1 border rounded"
        />
        <span className="text-sm">
          {recurrenceType === 'daily' ? 'day' : recurrenceType.slice(0, -2)}(s)
        </span>
      </div>
    </div>
  );
};

export default RecurrenceOptions;

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecurringDatePicker from '@/components/recurring-date-picker';
import { useRecurringDateStore } from '@/components/recurring-date-picker/store';

describe('RecurringDatePicker', () => {
  beforeEach(() => {
    useRecurringDateStore.setState({
      startDate: new Date(2023, 0, 1),
      endDate: null,
      recurrenceType: 'daily',
      interval: 1,
      selectedDays: [],
      previewDates: [],
    });
  });

  it('renders all main components', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Recurrence Pattern')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('allows changing recurrence type', async () => {
    render(<RecurringDatePicker />);
    const user = userEvent.setup();
    
    const weeklyButton = screen.getByText('weekly');
    await user.click(weeklyButton);
    
    const store = useRecurringDateStore.getState();
    expect(store.recurrenceType).toBe('weekly');
  });

  it('updates interval value', async () => {
    render(<RecurringDatePicker />);
    const user = userEvent.setup();
    
    const intervalInput = screen.getByRole('spinbutton');
    await user.clear(intervalInput);
    await user.type(intervalInput, '3');
    
    await waitFor(() => {
      const store = useRecurringDateStore.getState();
      expect(store.interval).toBe(3);
    });
  });

  it('prevents invalid interval values', async () => {
    render(<RecurringDatePicker />);
    const user = userEvent.setup();
    
    const intervalInput = screen.getByRole('spinbutton');
    await user.clear(intervalInput);
    await user.type(intervalInput, '0');
    
    await waitFor(() => {
      const store = useRecurringDateStore.getState();
      expect(store.interval).toBe(1);
    });
  });
});
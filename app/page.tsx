import RecurringDatePicker from '@/components/recurring-date-picker';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Recurring Date Picker</h1>
        <div className="bg-white rounded-lg shadow-lg">
          <RecurringDatePicker />
        </div>
      </div>
    </main>
  );
}

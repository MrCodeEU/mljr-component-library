export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export interface DateFormat {
  format: string;
  mode: 'date' | 'time' | 'datetime';
  timeFormat: '12h' | '24h';
}

// Main date formatting function
export function formatDate(date: Date | null, options: DateFormat): string {
  if (!date) return '';
  
  const { format, mode, timeFormat } = options;
  let result = format;

  // Handle date formatting
  if (mode !== 'time') {
    result = result
      .replace('dd', date.getDate().toString().padStart(2, '0'))
      .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace('yyyy', date.getFullYear().toString());
  }

  // Add time if needed
  if (mode !== 'date') {
    const timeStr = formatTime(date, timeFormat);
    result = mode === 'time' ? timeStr : `${result} ${timeStr}`;
  }

  return result;
}

// Helper for formatting time values
export function formatTime(date: Date, format: '12h' | '24h'): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (format === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Helper for generating calendar days
export function getMonthDays(date: Date, startOfWeek: number): (number | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days: (number | null)[] = [];
  const adjustedFirstDay = (firstDay - startOfWeek + 7) % 7;
  
  // Fill in the days before the start of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  
  // Fill in the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
}

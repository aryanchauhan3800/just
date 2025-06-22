

// Types are defined here, removeit later

export type DateUnit = 'days' | 'weeks' | 'months' | 'years';
export type DateDirection = 'previous' | 'next';
export type DateFormat = 'short' | 'long' | 'medium';

interface DateRangeOptions {
  baseDate?: Date;
  unit: DateUnit;
  count: number;
  direction?: DateDirection;
  format?: DateFormat;
}



class DateUtility {

  private formatDate = (date: Date, format: DateFormat = 'long'): string => {

    const day = date.getDate();
    const year = date.getFullYear();

    const getOrdinalSuffix = (day: number): string => {

      if (day >= 11 && day <= 13) return 'th';

      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }

    };

    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const longMonths = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    switch (format) {
      case 'short':
        return `${String(day).padStart(2, '0')} ${shortMonths[date.getMonth()]}, ${year}`;

      case 'medium':
        return `${day}${getOrdinalSuffix(day)} ${shortMonths[date.getMonth()]}, ${year}`;

      case 'long':
      default:
        return `${day}${getOrdinalSuffix(day)} ${longMonths[date.getMonth()]}, ${year}`;
    }
  };



  public calculateDateRange = ({ count, unit, baseDate = new Date(), direction, format }: DateRangeOptions): string => {

    const startDate = new Date(baseDate);
    const endDate = new Date(baseDate);

    switch (unit) {
      case 'days':
        if (direction === 'previous') {
          startDate.setDate(baseDate.getDate() - count);
        } else {
          endDate.setDate(baseDate.getDate() + count);
        }
        break;

      case 'weeks':
        if (direction === 'previous') {
          startDate.setDate(baseDate.getDate() - (count * 7));
        } else {
          endDate.setDate(baseDate.getDate() + (count * 7));
        }
        break;

      case 'months':
        if (direction === 'previous') {
          startDate.setMonth(baseDate.getMonth() - count);
        } else {
          endDate.setMonth(baseDate.getMonth() + count);
        }
        break;

      case 'years':
        if (direction === 'previous') {
          startDate.setFullYear(baseDate.getFullYear() - count);
        } else {
          endDate.setFullYear(baseDate.getFullYear() + count);
        }
        break;
    }

    return `${this.formatDate(startDate, format)} - ${this.formatDate(endDate, format)}`;
  };


}

const { calculateDateRange } = new DateUtility();

export default calculateDateRange;

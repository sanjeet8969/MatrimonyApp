import { format, formatDistanceToNow, parseISO, isValid, differenceInYears } from 'date-fns';

// Format dates for display
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

// Format date for input fields
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Relative time error:', error);
    return '';
  }
};

// Calculate age from birth date
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  
  try {
    const dateObj = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
    if (!isValid(dateObj)) return 0;
    return differenceInYears(new Date(), dateObj);
  } catch (error) {
    console.error('Age calculation error:', error);
    return 0;
  }
};

// Check if date is in the past
export const isPastDate = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return false;
    return dateObj < new Date();
  } catch (error) {
    console.error('Date comparison error:', error);
    return false;
  }
};

// Check if date is in the future
export const isFutureDate = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return false;
    return dateObj > new Date();
  } catch (error) {
    console.error('Date comparison error:', error);
    return false;
  }
};

// Get date range for age filtering
export const getDateRangeForAge = (minAge, maxAge) => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - maxAge - 1, today.getMonth(), today.getDate());
  
  return {
    minDate: formatDateForInput(minDate),
    maxDate: formatDateForInput(maxDate)
  };
};

// Format time for display
export const formatTime = (date, format12Hour = true) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const formatString = format12Hour ? 'h:mm a' : 'HH:mm';
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Time formatting error:', error);
    return '';
  }
};

// Format datetime for display
export const formatDateTime = (date, includeTime = true) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const formatString = includeTime ? 'MMM dd, yyyy h:mm a' : 'MMM dd, yyyy';
    return format(dateObj, formatString);
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return '';
  }
};

// Get start and end of day
export const getStartOfDay = (date = new Date()) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
};

export const getEndOfDay = (date = new Date()) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59, 999);
};

// Check if two dates are the same day
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  try {
    const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    
    if (!isValid(dateObj1) || !isValid(dateObj2)) return false;
    
    return (
      dateObj1.getFullYear() === dateObj2.getFullYear() &&
      dateObj1.getMonth() === dateObj2.getMonth() &&
      dateObj1.getDate() === dateObj2.getDate()
    );
  } catch (error) {
    console.error('Date comparison error:', error);
    return false;
  }
};

// Get day name
export const getDayName = (date, short = false) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const formatString = short ? 'EEE' : 'EEEE';
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Day name error:', error);
    return '';
  }
};

// Get month name
export const getMonthName = (date, short = false) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const formatString = short ? 'MMM' : 'MMMM';
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Month name error:', error);
    return '';
  }
};

export const formatters = {
  // Format phone number
  phone: (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },

  // Format currency
  currency: (amount, currency = 'INR') => {
    const symbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£'
    };

    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);

    return formatted;
  },

  // Format date
  date: (date, format = 'short') => {
    if (!date) return '';
    
    const d = new Date(date);
    const options = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      relative: undefined // Will use relative time
    };

    if (format === 'relative') {
      return formatDistanceToNow(d, { addSuffix: true });
    }

    return d.toLocaleDateString('en-US', options[format]);
  },

  // Format file size
  fileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format name
  name: (firstName, lastName) => {
    if (!firstName && !lastName) return '';
    if (!lastName) return firstName;
    if (!firstName) return lastName;
    return `${firstName} ${lastName}`;
  },

  // Format address
  address: (address) => {
    if (!address) return '';
    
    const parts = [
      address.street,
      address.city,
      address.state,
      address.country,
      address.pincode
    ].filter(Boolean);
    
    return parts.join(', ');
  },

  // Truncate text
  truncate: (text, length = 100) => {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  // Format percentage
  percentage: (value, decimals = 1) => {
    return `${parseFloat(value).toFixed(decimals)}%`;
  }
};

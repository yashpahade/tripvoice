export const currencies = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  { code: 'AED', symbol: 'AED', locale: 'en-AE', name: 'UAE Dirham' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  { code: 'SGD', symbol: 'S$', locale: 'en-SG', name: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', locale: 'th-TH', name: 'Thai Baht' },
];

export const formatCurrency = (amount, currencyCode = 'INR') => {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

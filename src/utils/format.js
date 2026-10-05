export const currencyFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
});

export const formatPrice = (price) => {
  if (price === undefined || price === null) return '';
  return currencyFormatter.format(price);
};

export default formatPrice;

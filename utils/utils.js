export const useFormatCurrency = (number) => {
  const abs = Math.abs(number);

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(abs);
};

export const useArApLabel = (number) => {
  if (number < 0) {
    return 'Utang Pelanggan';
  }

  if (number > 0) {
    return 'Utang saya';
  }
};

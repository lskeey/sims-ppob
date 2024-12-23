export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const optionsTanggal = { day: '2-digit', month: 'long', year: 'numeric' };
  const tanggal = date.toLocaleDateString('id-ID', optionsTanggal);

  const jam = date.getHours().toString().padStart(2, '0');
  const menit = date.getMinutes().toString().padStart(2, '0');

  return `${tanggal} ${jam}:${menit} WIB`;
}

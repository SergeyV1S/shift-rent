const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря"
];

export const formatDateRange = (range: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to) return "";

  const fromDay = range.from.getDate().toString().padStart(2, "0");
  const toDay = range.to.getDate().toString().padStart(2, "0");

  const monthName = monthNames[range.to.getMonth()];

  const year = range.to.getFullYear();

  const timeDiff = range.to.getTime() - range.from.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  return `${fromDay} – ${toDay} ${monthName} ${year} (${daysDiff} ${getDayWord(daysDiff)})`;
};

const getDayWord = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "дней";
  if (lastDigit === 1) return "день";
  if (lastDigit >= 2 && lastDigit <= 4) return "дня";
  return "дней";
};

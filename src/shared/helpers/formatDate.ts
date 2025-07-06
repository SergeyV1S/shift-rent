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

const formatDateRange = (range: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to) return "";

  const fromDay = range.from.getDate().toString().padStart(2, "0");
  const toDay = range.to.getDate().toString().padStart(2, "0");

  const fromMonthName = monthNames[range.from.getMonth()];
  const toMonthName = monthNames[range.to.getMonth()];

  const year = range.to.getFullYear();

  const daysDiff = getTimeDiff({
    from: range.from,
    to: range.to
  });

  return `${fromDay} ${fromMonthName !== toMonthName ? fromMonthName : ""} – ${toDay} ${toMonthName} ${year} (${daysDiff} ${getDayWord(daysDiff)})`;
};

const formatDayMonthDateRange = (range: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to) return "";

  const fromDay = range.from.getDate().toString().padStart(2, "0");
  const toDay = range.to.getDate().toString().padStart(2, "0");

  const fromMonthName = monthNames[range.from.getMonth()];
  const toMonthName = monthNames[range.to.getMonth()];

  return `${fromDay} ${fromMonthName} – ${toDay} ${toMonthName}`;
};

const getTimeDiff = (range: { from: Date; to: Date }) => {
  const timeDiff = range.to.getTime() - range.from.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
};

const getDayWord = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "дней";
  if (lastDigit === 1) return "день";
  if (lastDigit >= 2 && lastDigit <= 4) return "дня";
  return "дней";
};

export { formatDateRange, getTimeDiff, formatDayMonthDateRange };

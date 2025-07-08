import {
  addDays,
  differenceInDays,
  format,
  formatISO9075,
  isValid,
  parse,
  parseISO
} from "date-fns";
import { ru } from "date-fns/locale";

const formatDateRange = (range?: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to || !isValid(range.from) || !isValid(range.to)) return "";

  const daysDiff = differenceInDays(range.to, range.from) + 1;

  return `${format(range.from, "dd MMMM", { locale: ru })} – ${format(range.to, "dd MMMM yyyy", { locale: ru })} (${daysDiff} ${getDayWord(daysDiff)})`;
};

const formatDayMonthDateRange = (range?: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to || !isValid(range.from) || !isValid(range.to)) return "";

  return `${format(range.from, "dd MMMM", { locale: ru })} – ${format(range.to, "dd MMMM", { locale: ru })}`;
};

const formatDateRangeWithYear = (range?: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to || !isValid(range.from) || !isValid(range.to)) return "";

  return `${format(range.from, "dd MMMM yyyy", { locale: ru })} – ${format(range.to, "dd MMMM yyyy", { locale: ru })}`;
};

const getTimeDiff = (range?: { from?: Date; to?: Date }) => {
  if (!range?.from || !range?.to || !isValid(range.from) || !isValid(range.to)) return 0;
  return differenceInDays(range.to, range.from) + 1;
};

const getDayWord = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "дней";
  if (lastDigit === 1) return "день";
  if (lastDigit >= 2 && lastDigit <= 4) return "дня";
  return "дней";
};

const formatDateRangeForRequest = (rent?: { startDate?: number; endDate?: number }) => {
  if (!rent?.startDate || !rent?.endDate) return undefined;

  const from = new Date(rent.startDate);
  const to = new Date(rent.endDate);

  return isValid(from) && isValid(to) ? { from, to } : undefined;
};

const getTomorrow = () => addDays(new Date(), 1);

const formatToISO = (date: string) => {
  const dateFromString = parse(date, "dd.MM.yyyy", new Date());

  return formatISO9075(new Date(dateFromString), { representation: "date" });
};

const formatDateFromISO = (date: string) => {
  const dateFromString = parseISO(date);

  return format(dateFromString, "dd.MM.yyyy", { locale: ru });
};

const formatTime = (time: number) => time.toString().padStart(2, "0");

export const formatDateRangeFromNumber = (from: number, to: number) => {
  const startDate = new Date(from);
  const endDate = new Date(to);

  return formatDateRangeWithYear({ from: startDate, to: endDate });
};

export {
  formatDateRange,
  formatDayMonthDateRange,
  formatDateRangeWithYear,
  getTimeDiff,
  getDayWord,
  formatDateRangeForRequest,
  getTomorrow,
  formatTime,
  formatDateFromISO,
  formatToISO
};

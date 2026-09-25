interface AmountStringOptionsProps {
  decimals?: boolean;
  prefix?: string;
}

export const toAmountString = (
  value: number,
  { decimals = true, prefix = "$" }: AmountStringOptionsProps = {},
): string => {
  return `${prefix} ${value.toFixed(decimals ? 2 : 0)}`;
};

export const toLocalISODate = (date: Date): string => {
  const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, -1);
};

export const getTimeFromISODate = (ISODate: string): string => {
  return ISODate.split("T")[1].split(":").splice(0, 2).join(":");
};

export const toFixLength = (value: number, length: number): string => {
  let result: string = String(value);
  while (result.length < length) result = "0" + result;
  return result;
};

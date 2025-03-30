import { format, isValid } from "date-fns";

interface FormatDateProps {
  date: Date | string;
  formatString?: string;
}

export const formatDate = ({ date, formatString = "dd/MM/yyyy" }: FormatDateProps): string => {
  const parsedDate = new Date(date);
  if (!isValid(parsedDate)) {
    return "";
  }
  return format(parsedDate, formatString);
};

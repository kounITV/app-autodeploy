import { format, parseISO } from "date-fns";
import { useBarcode } from "next-barcode";

export function Barcode({ barcode }: { barcode: string }) {
  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      background: undefined,
      height: 25,
      displayValue: false,
      margin: 0,
    },
  });
  return <svg ref={inputRef} className='w-auto h-[25px]' />;
}

export const formatDateString = (dateString: string): string => {
  if (!dateString) {
    return "ບໍ່ມີວັນທີ";
  }
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, "dd-MMM-yyyy");
  } catch {
    return "ບໍ່ມີວັນທີ";
  }
};

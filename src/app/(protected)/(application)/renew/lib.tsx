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

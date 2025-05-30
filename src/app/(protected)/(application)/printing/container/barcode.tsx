import { format, parseISO } from "date-fns";
import { useBarcode } from "next-barcode";
import { useQRCode } from "next-qrcode";

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

export function QRcode({ barcode, bg }: { barcode: string, bg?:string }) {
  const { Canvas } = useQRCode();
  const QRBg = bg ? bg : "#fff"
  return (
    <div className="border-2 border-[#000]">
      <Canvas
        text={barcode}
        options={{
          errorCorrectionLevel: 'H',
          margin: 1,
          scale: 4,
          width: 45,
          color: {
            dark: '#000',
            light: QRBg,
          },
        }}
      />
    </div>
  );
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
export const formatDateString2 = (dateString: string): string => {
  if (!dateString) {
    return "ບໍ່ມີວັນທີ";
  }
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, "dd/MM/yyyy");
  } catch {
    return "ບໍ່ມີວັນທີ";
  }
};

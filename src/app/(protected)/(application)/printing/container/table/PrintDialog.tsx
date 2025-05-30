/* eslint-disable no-nested-ternary */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-nested-callbacks */
import { WarningMessage } from "@/components/containers/warning-message";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from "@/components/ui";
import { useQueryClient } from "@tanstack/react-query";
import { Printer, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useApplicationProgress } from "../../useApplicationEditStatus";
import { StayPermitCard } from "../card";
import { Button } from "@/components/containers";
import { IApplication } from "../../../application/type";
import { BgOption } from "../bg-select";
import { BarCodeOptions } from "../barcode-select";
import { StayPermitCardSez } from "../sez-card";

interface PrintDialogProps {
  title?: string,
  application: IApplication
  refetch: () => void;
}

export const PrintDialog = ({ title, application, refetch }: PrintDialogProps) => {
  const queryClient = useQueryClient();
  const [delay, setDelay] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);
  const [printBackground, setPrintBackground] = useState<string>("print:bg-none mix-blend-multiply");
  const [qrcode, setQrcode] = useState<string>("barcode")
  const [loading, setLoading] = useState(false);
  const reloadComponent = async () => {
    setLoading(true);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      refetch();
      setKey((prevKey) => prevKey + 1);
      setLoading(false);
    }, 500);
  };

  setTimeout(() => {
    setDelay(false);
  }, 2000);

  if (!application) {
    return <Spinner size="large" show={true} />;
  }
  const { onSubmit } = useApplicationProgress({ id: Number(application.id) });
  const handleConfirm = async () => {
    if (!loading) {
      await onSubmit();
    }
  };
  const checkingNullImage = typeof application.profile.image !== "string"
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Printer className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] 2xl:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {"ກະລຸນາກວດສອບຄວາມຖືກຕ້ອງຂອງຂໍ້ມູນກ່ອນກົດ ພິມບັດ"}
          </DialogDescription>
          <div className="flex flex-wrap gap-1">
            <BgOption onChange={setPrintBackground}/>
            <BarCodeOptions onChange={setQrcode} bgOptions={printBackground}/>
          </div>
        </DialogHeader>
        <div className="my-6 overflow-hidden lg:h-[55vh] rounded-lg border bg-background shadow-sm  flex justify-center items-center">
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">loading...</p>
              </div>
            </div>
          ) : (
            printBackground === "print:bg-none mix-blend-multiply" ? (
              <div key={key} ref={contentRef} className="p-1">
                <StayPermitCardSez application={application} bgOptions={printBackground} />
              </div>
            ) : (
              <div key={key} ref={contentRef} className="p-1">
                <StayPermitCard application={application} bgOptions={printBackground} barCodeOptions={qrcode} />
              </div>
            )
          )}
        </div>
        <WarningMessage/>
        {checkingNullImage &&(
          <strong className="text-red-600">ຖ້າບໍ່ຮູບພາບຕິດບັດ ບໍ່ສາມາດພິມບັດໄດ້</strong>
        )}
        <DialogFooter className="flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <Button variant="outline" onClick={reloadComponent} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            disabled={checkingNullImage}
            loading={delay}
            type={"button"}
            onClick={async () => {
              await handleConfirm();
              reactToPrintFn();
            }}
            className="w-full sm:w-auto"
          >
            ພິມບັດ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
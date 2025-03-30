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

interface PrintDialogProps {
  title?: string,
  application: IApplication
  refetch: () => void;
}

export const PrintDialog = ({ title, application, refetch }: PrintDialogProps) => {
  const queryClient = useQueryClient();
  const [delay, setDelay] = useState(true);
  const [key, setKey] = useState(0);
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {"ກະລຸນາກວດສອບຄວາມຖືກຕ້ອງຂອງຂໍ້ມູນກ່ອນກົດ ພິມບັດ"}
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 overflow-hidden rounded-lg border bg-background shadow-sm">
          {loading
            ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              </div>
            )
            : (
              <div key={key} ref={contentRef} className="p-4">
                <StayPermitCard application={application} />
              </div>
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

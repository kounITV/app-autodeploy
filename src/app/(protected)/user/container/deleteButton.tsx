import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";
import { useDeleteUser } from "../hooks/useDelete";

export function AlertDialogDemo({ rwoId, onConfirm }: { rwoId: number; onConfirm: (id: number) => void }) {
  const { loading, updateUser } = useDeleteUser();
  const handleUpdate = () => {
    updateUser(rwoId);
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" onClick={() => { onConfirm(rwoId); }}>ລຶບ</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ທ່ານແນ່ໃຈຫຼືບໍ່?</AlertDialogTitle>
          <AlertDialogDescription>
            ການດຳເນີນການນີ້ຈະບໍ່ສາມາດກັບຄືນໄດ້. ມັນຈະລຶບບັນຊີຂອງທ່ານອອກຢ່າງຖາວອນ ແລະລຶບຂໍ້ມູນຂອງທ່ານອອກຈາກເຊີບເວີຂອງພວກເຮົາ.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate} disabled={loading}>ດຳເນີນຕໍ່</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


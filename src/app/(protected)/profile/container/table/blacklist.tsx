import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import BlacklistProfileCreateForm from "src/app/(protected)/blacklist/container/form/backlist-form";
import { useBlacklistProfileCreateForm } from "src/app/(protected)/blacklist/hook/useForm";
import { type IProfile } from "../../type";

export const BlacklistDialog = ({ profile }: { profile: IProfile }) => {
  const { form, onSubmit } = useBlacklistProfileCreateForm();
  useUpdateDefaultValues({ form, fieldName: "profileId", value: profile.id, shouldUpdate: profile.id });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto text-sm">
          {"ຂື້ນບັນຊີດໍາ"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="space-y-6 mx-6">
          <div className="text-sm">ຂື້ນບັນຊີດໍາ</div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="space-y-2">
              <div className="grid gap-1">
                <p className="text-sm">
                   ຊື່ແທ້ ແລະ ນາມສະກຸນ: <span className="font-medium">{profile?.firstName} {profile?.lastName}</span>
                </p>
                <p className="text-sm">
                   ວັນເດືອນປີເກີດ: <span className="font-medium"> {profile?.dateOfBirth}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <BlacklistProfileCreateForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

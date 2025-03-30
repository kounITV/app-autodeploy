/* eslint-disable no-nested-ternary */

"use client";
import { Card, CardContent } from "@/components/ui";

import { StepIndicator } from "@/components/containers/StepIndicator";
import { type Step, useMultiStepForm } from "src/app/hook/useMultiStepForm";
import BlacklistProfileForm from "../../blacklist/container/form/form";
import { useBlacklistProfileForm } from "../../blacklist/hook/useForm";
import ProfileForm from "../container/form/form";
import { SuccessStep } from "../container/form/successStep";
import { useProfileForm } from "../hook/useForm";

const FORM_STEPS: Step[] = [
  { number: 1, title: "ກວດບັນຊີດໍາ" },
  { number: 2, title: "ປ້ອນຂໍ້ມູນບຸກຄົນ" },
  { number: 3, title: "ສໍາເລັດ" },
];

export default function UserCreate() {
  const { step, handleNext, handlePrevious, handleStepClick, handleReset } = useMultiStepForm(FORM_STEPS);
  const { form, onSubmit } = useBlacklistProfileForm({ handleNext });
  const blackProfile = form.watch();
  const { form: formProfile, onSubmit: onSubmitProfile } = useProfileForm({ handleNext });
  const handleResetForm = () => {
    form.reset();
    formProfile.reset();
    handleReset();
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <BlacklistProfileForm form={form} onSubmit={onSubmit} />;
      case 2:
        return <ProfileForm form={formProfile} handleNext={handleNext} onSubmit={onSubmitProfile} handlePrevious={handlePrevious} blackProfile={blackProfile} />;
      case 3:
        return <SuccessStep handleReset={handleResetForm} />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full bg-gradient-to-b p-4 flex items-center justify-center">
      <Card className="w-full  mx-auto shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-8 px-2">
            <StepIndicator steps={FORM_STEPS} currentStep={step} onStepClick={handleStepClick} />
          </div>
          <div
            key={step}
            className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300"
          >
            <div className="space-y-2 px-5">
              <h2 className="text-sm font-medium text-muted-foreground">ຂັ້ນຕອນ {step} ໃນ 3</h2>
              <h3 className="text-2xl font-bold tracking-tight">
                {step === 1 ? "ຂັ້ນຕອນນີ້ກວດບັນຊີບັນດໍາ ແລະ ບຸກຄົນທີມງານີຂໍ້ມູນແລ້ວ" : step === 2 ? "ຂັ້ນຕອນນີ້ເພີ່ມຂໍ້ມູນບຸກຄົນ" : ""}
              </h3>
            </div>

            {renderStepContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


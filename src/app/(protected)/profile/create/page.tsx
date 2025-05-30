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
import { Form } from "@/components/containers/form";
import { SquareUserRound } from "lucide-react";

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
        <CardContent className="pt-6 -mb-8">
          <div className="flex items-start gap-1">
            <div>
              <div className="mb-1 px-2">
                <StepIndicator steps={FORM_STEPS} currentStep={step} onStepClick={handleStepClick} />
              </div>
              <div
                key={step}
                className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-start"
              >
                <div className="space-y-1 px-5">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {step === 1 ? "ຂັ້ນຕອນນີ້ກວດບັນຊີບັນດໍາ ແລະ ບຸກຄົນທີ່ມີຂໍ້ມູນແລ້ວ" : step === 2 ? "ຂັ້ນຕອນນີ້ເພີ່ມຂໍ້ມູນບຸກຄົນ" : ""}
                  </h3>
                </div>
              </div>
            </div>
            {step === 2 && (
              <div>
                <Form formInstance={formProfile} onSubmit={onSubmitProfile} className="border-none shadow-none -mt-6 -mb-10" showButton={false}>
                  <div className="flex flex-wrap gap-4 items-start">
                    <Form.Field name="image" control={formProfile.control} label="ຮູບພາບ (ຮູບໃຫມ່​)" required={false}>
                      <Form.Input.Image
                        label="3x4 cm"
                        iconImage={<SquareUserRound className="w-10 h-10" />}
                        accept="image/*"
                        className="flex items-center justify-center rounded-lg border border-dashed"
                      />
                    </Form.Field>
                    <Form.Field name="oldImage" control={formProfile.control} label="ຮູບພາບ (ຮູບເກົ່າ)" required={false}>
                      <Form.Input.Image
                        label="3x4 cm"
                        iconImage={<SquareUserRound className="w-10 h-10" />}
                        accept="image/*"
                        className="flex items-center justify-center rounded-lg border border-dashed bg-muted"
                      />
                    </Form.Field>
                  </div>
                </Form>
              </div>
            )}
          </div>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}


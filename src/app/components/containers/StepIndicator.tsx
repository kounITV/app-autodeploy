import { type StepIndicatorProps } from '@/hooks/useMultiStepForm';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="relative flex justify-between w-full px-2">
      <div className="absolute top-4 left-0 right-0 h-[1px] bg-gray-200" />
      <div
        className="absolute top-4 left-0 h-[1px] bg-primary transition-all duration-500 ease-in-out"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((step) => (
        <div key={step.number} className="relative flex flex-col items-center gap-3">
          <div
            onClick={() => { onStepClick(step.number); }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 z-10 border-2 cursor-pointer hover:scale-105",
              currentStep > step.number
                ? "bg-primary text-white"
                : currentStep === step.number
                  ? "border-primary bg-white text-primary"
                  : "border-gray-200 bg-white text-gray-400 hover:border-primary",
            )}
          >
            {currentStep > step.number ? <Check className="h-4 w-4" /> : step.number}
          </div>
          <span className={cn(
            "text-sm font-medium whitespace-nowrap",

          )}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}


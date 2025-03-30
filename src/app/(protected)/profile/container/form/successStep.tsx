import { Button } from "@/components/ui";

export function SuccessStep({ handleReset }: { handleReset: () => void }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">ສໍາເລັດ</h2>
      <p className="mb-6">ການລົງທະບຽນບຸກຄົນສໍາເລັດແລ້ວ</p>
      <Button onClick={handleReset}>ເລີ້ມໃຫມ່</Button>
    </div>
  );
}


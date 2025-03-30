import { ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChangelogVersion() {
    const router = useRouter();
    return (
        <div className=" hidden sm:block">
            <div className="flex items-center gap-x-3">
                <div className="font-bold text-lg">ບັດຢັ້ງຢືນການພັກເຊົາຊົ່ວຄາວ - Temporary Stay Card</div>
                <button className="bg-none justify-center flex "
                    onClick={() => { router.push("/changelog"); }}
                >
                    <div className="underline "> V2.0.3</div>
                </button>
            </div>
        </div>
    )
}

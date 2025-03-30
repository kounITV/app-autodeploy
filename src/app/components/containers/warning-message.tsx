import { useSession } from "next-auth/react";

interface WarningMessageProps {
    customMessage?: string;
    className?: string;
}

export function WarningMessage({
    customMessage,
    className,
}: WarningMessageProps): JSX.Element {
    const { data: session } = useSession();
    const defaultMessage = `ແຈ້ງເຕືອນ: ທ່ານ ${session?.user?.firstName} ${session?.user?.lastName}, ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການດຳເນີນການນີ້?`;
    const message = customMessage || defaultMessage;
    return (
        <div className={`mb-2 justify-between text-sm text-muted-foreground  ${className}`}>
            <h2 className="text-base text-muted-foreground text-yellow-600">
                {message}
            </h2>
        </div>
    );
}
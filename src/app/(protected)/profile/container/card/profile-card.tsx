/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { CalendarDays, FileCode, Globe, Home, BadgeIcon as IdCard, MapPin, MoreVertical, Phone, RefreshCcw, ScanBarcode, User } from "lucide-react";
import { type IProfile } from "../../type";
import { formatDate } from "@/lib/format-date";
import { getIdentityLabel } from "../../lib";

const ProfileDetail = ({ icon: Icon, label, value }: { icon: React.ComponentType, label: string, value?: string | number }) => (
  <div className="flex items-center gap-2">
    <Icon />
    <span>{value || label}</span>
  </div>
);

interface DropdownMenuComponentProps {
  onEdit?: (profile: number) => void;
  onDelete?: (profile: number) => void;
  profileId: number;
  onApplication?: (profile: number) => void;
}

const DropdownMenuComponent = ({ profileId, onApplication }: DropdownMenuComponentProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
        <span className="sr-only">ປິດເມນູ</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {onApplication && (<DropdownMenuItem
        onClick={() => { onApplication?.(profileId); }}
        className="flex items-center gap-2 text-sm "
      >
        <RefreshCcw className="h-4 w-4" />
        ອອກບັດ
      </DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>
);

interface ProfileCardProps {
  profile: IProfile;
  onEdit?: (profile: number) => void;
  onDelete?: (profile: number) => void;
  onApplication?: (profile: number) => void;
  renewable?: boolean
}
export function ProfileCard({ profile, onEdit, onDelete, onApplication, renewable = false }: ProfileCardProps) {
  const firstName = `${profile?.firstName || ""} ${profile?.lastName || ""}`;
  const imageSrc = profile?.image || "/thavisoukmnlv.jpg";
  const nationality = profile?.nationality.code || "";
  return (
    <Card className="w-full sm:w-96">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative h-20 w-16 overflow-hidden rounded-sm">
          <Avatar className="h-20 w-16 rounded-sm shadow-md">
            <AvatarImage src={imageSrc} alt={firstName} />
            <AvatarFallback className="text-2xl font-semibold">
              {profile?.firstName?.[0] || ""}
              {profile?.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{firstName}</h2>
          <p className="text-sm text-muted-foreground">{nationality}</p>
        </div>
        {renewable && (
          <DropdownMenuComponent onEdit={onEdit} onDelete={onDelete} profileId={profile?.id} onApplication={onApplication} />
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <ProfileDetail icon={ScanBarcode} label="ບາໂຄດ" value={profile?.barcode} />
          <ProfileDetail icon={FileCode} label="ເອກທິຟອມ" value={profile?.applicationNumber} />
          <ProfileDetail icon={Phone} label="ເບີໂທ" value={profile?.phoneNumber} />
          <ProfileDetail icon={CalendarDays} label="ວັນເກີດ" value={formatDate({ date: profile?.dateOfBirth || "" })} />
          <ProfileDetail icon={User} label="ເພດ" value={profile?.gender} />
          <ProfileDetail icon={Globe} label="ຊາດແລະສາດ" value={`${profile?.ethnicity?.name} • ${profile?.nationality?.name}`} />
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold">ຂໍ້ມູນເອກະສານຢັ້ງຢືນ</h3>
          <div className="grid gap-1 text-sm">
            <ProfileDetail icon={IdCard} label={`${getIdentityLabel(profile?.identityType)}: ${profile?.identityNumber}`} value="" />
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <span>ອອກ: {profile?.identityIssueDate}</span>
              <span>ໝົດອາຍຸ: {profile.identityExpiryDate}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold">ທີ່ຢູ່ປະຈຸບັນ</h3>
          <div className="flex items-start gap-2">
            <Home />
            <div> <p>{profile?.currentVillage?.villageLao}</p>
              <p className="text-sm text-muted-foreground">{profile?.district?.districtLao}, {profile?.province?.provinceLao}</p>
            </div>
          </div>
        </div>
        {(profile?.overseasProvince || profile?.overseasProvince) && (
          <div className="grid gap-2">
            <h3 className="font-semibold">ທີ່ຢູ່ຕ່າງປະເທດ</h3>
            <div className="flex items-start gap-2">
              <MapPin />
              <div>
                <p>{profile?.overseasProvince}</p>
                <p className="text-sm text-muted-foreground">{profile?.overseasProvince}</p>
              </div>
            </div>
          </div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-xs text-muted-foreground hover:text-foreground">
              ອັບເດດ {profile?.updatedAt}
            </TooltipTrigger>
            <TooltipContent>
              <p>ສ້າງ: {profile?.createdAt}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}

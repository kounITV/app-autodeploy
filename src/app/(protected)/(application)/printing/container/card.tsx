
import Image from "next/image";
import { IApplication } from "../../application/type";
import { Barcode, formatDateString } from "./barcode";
import { cn } from "@/lib/utils";

export function StayPermitCard({ application }: { application?: IApplication }) {
  const { expirationDate = "", issueDate = "" } = application || {};
  const profile = application?.profile?.image
  const applicationType = application?.number?.price.type === "BLUE"
  return (
    <div className='flex justify-center box-border font-Phetsarath'>
      <div className='grid justify-center text-black'>
        <div className={cn("bg-amber-200 text-[10.8px] relative box-border p-[6px] pl-[8.55px] w-[323.5px] h-[204px] rounded-lg print:w-full print:h-full print:absolute print:top-[-2.5px] print:left-0 print:m-0 print:rounded-none print:bg-transparent", applicationType ? "print:px-[6.7px]" : "print:px-[7.6px]")}>
          <div className="p-0 pb-[4px]">
            <div className='leading-[1.2] print:leading-[1.2] '>
              <div className="text-center font-semibold tracking-wider">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</div>
              <div className="text-center font-semibold pb-[2px] print:pb-[2px] leading-tight font-TimesNewRoman">Lao People&apos;s Democratic Republic</div>
              <div className="text-center font-semibold tracking-wide">ບັດຢັ້ງຢືນການພັກເຊົາຊົ່ວຄາວ</div>
              <div className="text-center font-semibold tracking-tight font-TimesNewRoman ">Temporary Stay Card</div>
            </div>
            <div className="absolute top-2 left-5 print:top-2 print:left-5">
              <Image src={"/police_logo.png"} alt="Police Logo" width={38} height={30} />
            </div>
          </div>
          <div className="p-0 font-semibold">
            <div className="w-full flex justify-between gap-0">
              <div className={cn("pr-[2px] print:pr-1", applicationType ? "print:pt-[2px]" : "")}>
                <div className="w-[66.1px] h-[83.5px] print:w-[66.5px] print:h-[85px]">
                  {profile ? (
                    <Image
                      src={profile}
                      alt="ຮູບພາບບຸກຄົນ"
                      width={66.5}
                      height={85}
                      unoptimized
                      className="object-fill h-full w-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-white"></div>
                  )}
                </div>
              </div>
              <ProfileSection application={application} />
              <ContactSection application={application} />
            </div>
            <BarcodeSection barcode={application?.profile?.barcode} />
            <DateSection expirationDate={expirationDate} issueDate={issueDate} />
            <div className="absolute flex flex-col items-center right-5 bottom-[16px] z-0 leading-[0.7]">
              <Image src={"/immigration.png"} alt="Logo" width={50} height={50} />
              <p className="text-red-600 text-[6px] font-TimesNewRoman">Phonethip PHOMPHAKDY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection({ application }: { application?: IApplication }) {
  const { firstName = "", lastName = "", dateOfBirth = "", identityType = "" } = application?.profile || {};
  return (
    <div className="w-[145px] leading-[1.45] print:leading-[1.39] print:tracking-tight">
      <div>
        <div>
          <p className="text-start text-[8px]">ຊື່ / <span className="font-TimesNewRoman">Name</span>:&nbsp;{firstName}</p>
          <p className="text-start text-[8px]">ນາມສະກຸນ / <span className="font-TimesNewRoman">Surname</span>:&nbsp;{lastName}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div>
          <p className="text-start text-[8px]">ວັນເດືອນປີເກີດ:</p>
          <p className="text-start text-[8px] font-TimesNewRoman">Birthday:</p>
        </div>
        <div>
          <p className="text-start text-[8px]">{formatDateString(dateOfBirth)}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div>
          <p className="text-start text-[8px]">ປະເພດເອກະສານເດີນທາງ: </p>
          <p className="text-start text-[8px]"><span className="font-TimesNewRoman">Type of travel document:</span> {documentType.find((item) => item.value === identityType)?.label || ""}</p>
        </div>
      </div>
      <div className="flex items-center justify-start relative">
        <div >
          <p className="text-start text-[8px]">ສະຖານທີ່ເຮັດວຽກຢູ່ຂສພ:</p>
          <p className="text-start text-[8px] font-TimesNewRoman">Working place in SEZ:</p>
        </div>
        <div className="absolute right-0 top-0 transform w-[40%]">
          <p className="text-start text-[7px] flex-wrap">
            {application?.company?.name}
          </p>
        </div>
      </div>
      <p className="text-start text-[8px]">ໜ້າທີ່/ <span className="font-TimesNewRoman">Position</span>:&nbsp; {application?.position?.laoName}</p>
    </div>
  );
}
const documentType = [
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
  { value: "driverLicense", label: "ໃບຂັບຂີ່" },
]
export function BarcodeSection({ barcode }: { barcode?: number }) {
  const barcodeStr = String(barcode);
  return (
    <div className="absolute bottom-[6px] print:bottom-[6px] left-2 print:left-[8px] z-0">
      <div>
        <p className="text-[8px] leading-tight">ເລກທີ/ຄຕທ</p>
        <p className="text-[8px] leading-tight font-TimesNewRoman">{barcode}</p>
      </div>
      <div className="barcode w-[160px] h-[25px]">
        <Barcode barcode={barcodeStr} />
      </div>
    </div>
  );
}

export function DateSection({ expirationDate, issueDate }: { expirationDate: string, issueDate: string }) {
  return (
    <div className="flex items-center gap-[2px] absolute top-11 right-2 print:leading-tight print:tracking-tight">
      <p className="text-start leading-3 text-[8px] font-TimesNewRoman">ກໍານົດອາຍຸ:/<span className="font-TimesNewRoman">Exp</span></p>
      <div className='print:tracking-tighter'>
        <p className="text-[red] text-[8px] font-TimesNewRoman">{formatDateString(issueDate)}</p>
        <p className="text-[red] text-[8px] font-TimesNewRoman">{formatDateString(expirationDate)}</p>
      </div>
    </div>
  );
}

export function ContactSection({ application }: { application?: IApplication }) {
  const { ethnicity, nationality, identityNumber = "" } = application?.profile || {};
  return (
    <div className='w-[100px] leading-[1.45] print:leading-[1.39]'>
      <div className="flex gap-1 items-center">
        <div>
          <p className="text-start text-[8px]">ເຊື້ອຊາດ:</p>
          <p className="text-start text-[8px] font-TimesNewRoman">Race:</p>
        </div>
        <div>
          <p className="text-start text-[8px] font-TimesNewRoman">{ethnicity?.code}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div>
          <p className="text-start text-[8px]">ສັນຊາດ:</p>
          <p className="text-start text-[8px] font-TimesNewRoman">Nationality:</p>
        </div>
        <div>
          <p className="text-start text-[8px]">{nationality?.nationality}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center print:mb-[5px]">
        <div>
          <p className="text-start text-[8px]">ເລກທີ:</p>
          <p className="text-start text-[8px] font-TimesNewRoman">No:</p>
        </div>
        <div>
          <p className="text-start text-[8px]">{identityNumber}</p>
        </div>
      </div>
      <div className="">
        <p className="text-center text-[7px] leading-tight tracking-tighter">
                    ກົມຕໍາຫຼວດຄຸ້ມຄອງຄົນຕ່າງປະເທດ
        </p>
        <p className="text-center text-[7px] leading-tight tracking-tighter font-TimesNewRoman">
                    Department of Foreigner Control
        </p>
      </div>
    </div>
  );
}
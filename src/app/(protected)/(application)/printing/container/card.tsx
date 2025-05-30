
import Image from "next/image";
import { IApplication } from "../../application/type";
import { Barcode, formatDateString2, formatDateString, QRcode } from "./barcode";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function StayPermitCard({ application, bgOptions, barCodeOptions }: { application?: IApplication, bgOptions?: string, barCodeOptions?: string }) {
  const { expirationDate = "", issueDate = "" } = application || {};
  const profile = application?.profile?.image
  const applicationType = application?.number?.price.type === "BLUE";
  const bgColor = bgOptions === "print:bg-[#B69E80]"? "bg-amber-200": "";
  const isQRcode = barCodeOptions === "qrcode"
  return (
    <div className='flex justify-center box-border font-Phetsarath'>
      <div className='grid justify-center text-[#000000]'>
        <div className={cn(`${bgColor} text-[10.8px] scale-[1.9] print:scale-100 relative box-border p-[6px] pl-[8.55px] w-[323.5px] h-[204px] mix-blend-multiply rounded-lg print:w-fit print:h-[101%] print:absolute print:top-[-2.5px] print:left-0 print:m-0 print:rounded-none ${bgOptions}`, applicationType ? "print:px-[6.7px]" : "print:px-[7.6px]")}>
          <div className="p-0 pb-[4px]">
            <div className='leading-[1]'>
              <div className="text-center font-bold tracking-tight leading-[1.2] text-[10pt]">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</div>
              <div className="text-center font-bold pb-[2px] print:pb-[2px] leading-[1] print:leading-[1.25] font-TimesNewRoman text-[7.5pt]">Lao People&apos;s Democratic Republic</div>
              <div className="text-center font-bold tracking-normal flex justify-center text-[8pt] text-[#000000]">
                ບັດຢັ້ງຢືນການພັກເຊົາຊົ່ວຄາວ&nbsp;/&nbsp;
                <div className="text-center font-bold tracking-tight font-TimesNewRoman text-[#000000]">Temporary Stay Card</div>
              </div>
            </div>
            <div className="absolute top-2 left-3 print:top-2 print:left-3">
              <Image src={"/police_logo.png"} alt="Police Logo" width={38} height={30} className="bg-none mix-blend-multiply"/>
            </div>
          </div>
          <div className="p-0 font-normal">
            <div className="w-full flex justify-between gap-1">
              <div className={cn("pr-[2px] print:pr-2 print:pl-[1px] flex items-center print:items-start print:mt-[24px]", applicationType ? "print:pt-[2px]" : "")}>
                {/* <div className="w-[66.1px] h-[83.5px] print:w-[66.5px] print:h-[85px]"> */}
                <div className="w-[66.1px] h-[83.5px] print:w-[80px] print:h-[100px]">
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
                    <div className="w-full h-full bg-white">
                    </div>
                  )}
                </div>
              </div>
              <ProfileSection application={application} />
              <ContactSection application={application} />
            </div>
            <BarcodeSection expirationDate={expirationDate} issueDate={issueDate} barcode={application?.profile?.barcode} isQRcode={isQRcode} />
            <DateSection expirationDate={expirationDate} issueDate={issueDate} isQRcode={isQRcode} barcode={application?.profile?.barcode}/>
            <div className="absolute flex flex-col items-center right-2 print:right-3 bottom-[6px] print:bottom-[8px] z-0 leading-[0.7] font-bold">
              <Image src={"/immigration2.png"} alt="Logo" width={100} height={100}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection({ application }: { application?: IApplication }) {
  const { firstName = "", lastName = "", dateOfBirth = "", identityType = "", gender } = application?.profile || {};
  const title = (gender === "MALE" || gender === "M") ? "MS" : "MR"
  return (
    <div className="w-[165px] leading-[0.98] print:leading-[1.14] print:tracking-tight font-bold">
      <div>
        <div>
          <p className="text-start text-[7pt] mb-[2.5px]">ຊື່/Name
            <br></br>
            <span className="font-TimesNewRoman uppercase text-[7.5pt]">
              {title}&nbsp;{firstName}
            </span>
          </p>
          <p className="text-start text-[7pt] mb-[2.5px] text-[#000000]">ນາມສະກຸນ/Surname
            <br></br>
            <span className="font-TimesNewRoman uppercase text-[7.5pt] text-[#000000]">{lastName}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1 items-center mb-[1px] print:mb-[2px] text-[#000000]">
        <div>
          <p className="text-start text-[7pt]">ວັນເດືອນປີເກີດ/Date of Birth:</p>
          <p className="text-start text-[7pt]">{formatDateString2(dateOfBirth)}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center mb-[1px] print:mb-[2px] text-[#000000]">
        <div>
          <p className="text-start text-[7pt] tracking-tighter">ເອກະສານເດີນທາງ/Travel document:</p>
          <p className="text-start text-[7pt]">{documentType.find((item) => item.value === identityType)?.label || ""}</p>
        </div>
      </div>
      <div className="flex items-center justify-start relative mb-[1px] print:mb-[2px] text-[#000000]">
        <div >
          <p className="text-start text-[7pt]">ສະຖານທີ່ພັກເຊົາ/Living place:</p>
          <p className="text-start text-[7pt] w-[140px] print:w-[146px] overflow-hidden line-clamp-2 pt-[3px]">
            {/* eslint-disable-next-line no-magic-numbers */}
            {application?.company?.name ? (
              /* eslint-disable-next-line no-magic-numbers */
              application.company.name
            ) : (
              /* eslint-disable-next-line no-magic-numbers */
              application?.village?.villageLao
            )}
          </p>
        </div>
      </div>
      <p className="text-start text-[7pt]">ໜ້າທີ່/Position: <span className="font-TimesNewRoman text-[#000000]"></span>
        {application?.position?.laoName}</p>
    </div>
  );
}
const documentType = [
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
  { value: "driverLicense", label: "ໃບຂັບຂີ່" },
]
export function BarcodeSection({ 
  expirationDate, 
  issueDate, 
  barcode, 
  isQRcode, 
  applicationType, 
}: { 
  expirationDate: string, 
  issueDate: string,
  barcode?: number, 
  isQRcode?: boolean, 
  applicationType?: string 
}) {
  const barcodeStr = String(barcode);
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const officeIdStr = officeId === null ? "000" : String(officeId).padStart(3, "0");
  const fullBarcode = officeIdStr + barcodeStr;
  return (
    <div >
      {isQRcode ? (
        // yellow card
        <div className="absolute bottom-[5px] print:bottom-[6px] left-2 print:left-[16px] z-0 text-[#000000] flex items-center gap-[18px] print:gap-[23px]">
          {/* <div className="absolute bottom-[5px] print:bottom-[6px] left-2 z-0 text-[#000000] flex items-center gap-[24px] print:gap-[37px]"> */}
          {applicationType ? (
            <div className="barcode">
              <QRcode barcode={fullBarcode} bg={"#f56565"}/>
            </div>
          ) : (
            // yellow card
            <div className="barcode pl-1.5">
              {/* <div className="barcode"> */}
              <QRcode barcode={fullBarcode}/>
            </div>
          )}
          {/* yellow card */}
          <div className="pt-3 flex flex-col gap-[2px]">
            {/* <div className="pt-4"> */}
            <p className="text-[7pt] leading-[1] font-bold flex">ອອກໃຫ້ວັນທີ&#x3a;&nbsp;
              <p className="text-[red]">{formatDateString(issueDate)}</p>
            </p>
            <p className="text-[7pt] leading-[1] font-bold flex">ໝົດອາຍຸວັນທີ&#x3a;&nbsp;
              <p className="text-[red]">{formatDateString(expirationDate)}</p>
            </p>
          </div>
        </div>
      ):(
        <div className="absolute bottom-[6px] print:bottom-[6px] left-2 print:left-[8px] z-0 font-bold text-[#000000]">
          <div>
            <p className="text-[6pt] leading-[1.1] text-[#000000]">ເລກທີ/ຄຕທ</p>
            <p className="text-[5.39pt] leading-[1.1] font-TimesNewRoman text-[#000000]">{fullBarcode}</p>
          </div>
          <div className="barcode w-[160px] h-[25px]">
            <Barcode barcode={fullBarcode} />
          </div>
        </div>
      )}
    </div>
  );
}

export function DateSection({ 
  expirationDate, 
  issueDate,  
  isQRcode,
  barcode,
}: { 
  expirationDate: string, 
  issueDate: string,
  isQRcode: boolean,
  barcode?: number
}) {
  const barcodeStr = String(barcode);
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const officeIdStr = officeId === null ? "000" : String(officeId).padStart(3, "0");
  const fullBarcode = officeIdStr + barcodeStr;
  return (
    <div >
      {isQRcode ? (
        <div className="flex items-center gap-[2px] absolute top-14 right-2 print:leading-tight print:tracking-tight font-bold">
          <span className="text-[7pt] leading-[1] text-[#000000] font-bold">ເລກທີ&#x3a;&nbsp;{fullBarcode}/ຄຕທ</span>
        </div>
      ):(
        <div className="flex items-center gap-[2px] absolute top-12 right-2 print:leading-tight print:tracking-tight font-bold">
          <p className="text-start leading-3 text-[7pt] text-[#000000]">ກໍານົດອາຍຸ/<span className="font-TimesNewRoman">Exp :</span></p>
          <div className='print:tracking-tighter text-[#000000]'>
            <p className="text-[red] text-[6pt] font-TimesNewRoman">{formatDateString(issueDate)}</p>
            <p className="text-[red] text-[6pt] font-TimesNewRoman">{formatDateString(expirationDate)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactSection({ application }: { application?: IApplication }) {
  const { ethnicity, nationality, identityNumber = "" } = application?.profile || {};
  return (
    <div className='w-[100px] print:leading-[1.39] pt-6 pl-4 font-bold'>
      <div className="pb-[2px] text-[#000000]">
        <div className="flex items-center">
          <p className="flex items-center text-start text-[7pt] leading-[1.2]">ເຊື້ອຊາດ/
            <span className="text-[7pt] font-TimesNewRoman">Race:</span>
          </p>
          {/* <p >Race:</p> */}
        </div>
        <div>
          <p className="text-start text-[7pt] font-TimesNewRoman leading-[1.2] text-[#000000]">{ethnicity?.code}</p>
        </div>
      </div>
      <div className="items-center pb-[2px] text-[#000000]">
        <div>
          <p className="flex text-start text-[7pt] leading-[1.2]">ສັນຊາດ/
            <p className="text-start text-[7pt] font-TimesNewRoman">Nationality:</p>
          </p>
        </div>
        <div>
          <p className="text-start text-[7pt] font-TimesNewRoman leading-[1.2]">{nationality?.nationality}</p>
        </div>
      </div>
      <div className="items-center print:mb-[5px] pb-[2px] text-[#000000]">
        <div>
          <p className="flex text-start text-[7pt] leading-[1.2]">ເລກທີ/<p className="text-[8px] font-TimesNewRoman">No:</p></p>
          {/* <p className="text-start text-[8px] font-TimesNewRoman">No:</p> */}
        </div>
        <div>
          <p className="text-start text-[8px] leading-[1.2]">{identityNumber}</p>
        </div>
      </div>
    </div>
  );
}
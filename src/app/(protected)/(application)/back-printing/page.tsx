"use client"

/* eslint-disable no-irregular-whitespace */
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

export default function StayPermitCard() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className='flex justify-center box-border'>
      <div className='grid justify-center'>
        <div ref={contentRef} className={cn("bg-amber-200 relative print:bg-[#B69E80] box-border w-[323.5px] pt-[4px] h-[204px] rounded-lg print:w-[101%] print:h-[101.5%] print:absolute print:top-[-2.5px] print:left-0 print:m-0 print:rounded-none")}>
          <div className=" text-center flex flex-col leading-3">
            <p className="text-[7pt] font-bold ">ຄໍາແນະນໍາ</p>
            <p className="text-[7pt] font-bold font-TimesNewRoman">INSTRUCTION</p>
          </div>
          <div className="px-1">
            <ul>
              <li className="list-none font-bold leading-tight text-[6pt] pl-2.5">
                - ອີງຕາມ ກົດໝາຍ ວ່າດ້ວຍການເຂົ້າ-ອອກ ແລະ ການຄຸ້ມຄອງຄົນຕ່າງປະເທດຢູ່ ສປປ ລາວ, ເລກທີ 59/ສພຊ, ລົງວັນທີ 26 ທັນວາ 2014
              </li>
            </ul>
            <ol className="font-bold leading-tight pl-2.5 text-[#000]">
              <li className="font-Phetsarath  text-[6pt]">
                ບັດນີ້ໃຊ້ຢັ້ງ​ຢືນ​ກຳ​ນົດ​ພັກ​ເຊົາຊົ່ວ​ຄາວຂອງຄົນ​ຕ່າງ​ປະເທດ&nbsp;ແລະ&nbsp;ຄົນ​ບໍ່​ມີ​ສັນ​ຊາດທີ່​ບໍ່​​ຄົບ​ເງື່ອນ​ໄຂ​ການຂຶ້ນ​ທະ​ບຽນ​&nbsp;ແລະ ອອກ​ບັດ&nbsp;​ອະ​ນຸ​ຍາດ​ພັກ​ເຊົາ&nbsp;​ນຳໃຊ້ສະ​ເພາະ​ຢູ່ໃນ​ເຂດ​ເຈົ້າໜ້າທີກຳນົດ&nbsp;ເທົ່າ​ນັ້ນ.<br></br>
                <div className="font-TimesNewRoman text-[5.4pt]">
                This card is used as a legal approval for temporary stay for Foreigners and Aliens not in condition with registration 
                or staypermit card, Only in Allowed area.
                </div>
              </li>
              <li className="font-Phetsarath text-[6pt]">
                ໄດ້​ຮັບ​ອະ​ນຸ​ຍາດ​ໃຫ້​ພັກ​ເຊົາ​ຊົ່ວ​ຄາວ​ ກຳ​ນົດ 06 ເດືອນ ຫຼື1 ປີ.<br></br>
                <div className="font-TimesNewRoman text-[5.4pt]">
                Allowed to stay temporary within 06 months or 1 year.
                </div>
              </li>
              <li className="font-Phetsarath text-[6pt]">
                ພາຍຫຼັງໝົດ​ກຳ​ນົດ​ພັກ​ເຊົາ, ຫົວ​ໜ່ວຍ​ທຸ​ລະ​ກິດ ຫຼື ບໍ​ລິ​ສັດ ຕ້ອງແນະ​ນຳ​ໃຫ້​ຜູ້​ກ່ຽວ​ກັບ​ຄືນ​ປະ​ເທດ ເພື່ອ​ປະ​ກອບ​ເອ​ກະ​ສານ​ເດີນ​ທາງ, ຂໍ​ວີ​ຊາ​ຖືກ​ຕ້ອງ​ຕາມ​ກົດ​ໝາຍ ແລະ ລະ​ບຽບ​ການ ສ​ປ​ປ ລາວ.<br></br>
                <div className="font-TimesNewRoman text-[5.4pt]">  
                After the expiration of the stay, the company must advise employee to return to his/her country to submit passport 
                and to apply for a visa in accordance with the laws of the Lao P.D.R.
                </div>
              </li>
              <li className="font-Phetsarath text-[6pt]">
                ຫ້າມ​ດັດ​ແປງ​ເນື້ອ​ໃນ​, ຫ້າມ​ໃຊ້​ບັດ​ນີ້​ເຄື່ອນ​ໄຫວບໍ່​ຖືກ​ຈຸດ​ປະ​ສົງ​ທີ່​ເຈົ້າ​ໜ້າ​ທີ່​ອະ​ນຸ​ຍາດ,  ໃນ​ກໍ​ລະ​ນີ​ເສຍ​ຫາຍຕ້ອງ​ແຈ້ງ​ເຈົ້າ​ໜ້າ​ທີ່​ກ່ຽວ​ຂ້ອງ. ຜູ້​ທີ່​ປອມ​ແປງ​ເອ​ກະ​ສານ​ ສະ​ບັບ​ນີ້ຈ​ະ​ໄດ້​ຮັບ​ໂທດ​ຕາມ​ກົດໝາຍອາຍາ.<br></br>
                <div className="font-TimesNewRoman text-[5.4pt]">
                  It is prohibited to edit the content of the card. The holder is prohibited of work in other proposes rather than the one authorized. In case
                  of loss the holder must inform to relevant authority. Any individuals who modify or alter the card will be punished under criminal law.
                </div>
              </li>
            </ol>
          </div>
        </div>
        <Button className="mt-2 bg-[#fff1d6] text-[#000]" onClick={reactToPrintFn as any}> Back Printing </Button>
      </div>
    </div>
  );
}


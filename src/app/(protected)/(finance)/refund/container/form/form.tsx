"use client";

import { Form } from "@/components/containers/form";
import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type refundFormSchema } from "./schema";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Separator } from "@/components/ui";
import { IProfile } from "src/app/(protected)/profile/type";
import { formatDate } from "@/lib/format-date";
import { IRefund } from "../../type";
import { Search, User, DollarSign, Folder, Hash, Calendar, IdCard, PhoneCall } from "lucide-react"
import { useSession } from "next-auth/react";
import useProfileBarcode from "src/app/(protected)/(application)/renew/hook";

interface PriceFormProps {
  form: UseFormReturn<z.infer<typeof refundFormSchema>>;
  onSubmit: (data: z.infer<typeof refundFormSchema>) => Promise<void>;
  refundData?: IRefund
}

const RefundForm: React.FC<PriceFormProps> = ({ form, onSubmit, refundData }) => {
  const { data: session } = useSession();
  const [person, setPerson] = useState<IProfile>()
  const { result, updateSearch, loading } = useProfileBarcode();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  const handleSelectPerson = (person: IProfile) => {
    setPerson(person);
    form.setValue("profileId", person.id)
  };
  
  const { errors } = form.formState;
  const WarningMessage = `ທ່ານ ${session?.user?.firstName} ${session?.user?.lastName}, ເປັນຜູ້ອະນຸມັດ !`;
  return (
    <div className="w-full  md:w-2/3 mx-auto space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ຄົ້ນຫາບຸກຄົນດ້ວຍຊື່</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="ຄົ້ນຫາບຸກຄົນດ້ວຍຊື່" className="pl-10" onChange={handleSearchChange} />
          </div>
          {loading}
          <ul className="mt-4 space-y-2">
            {loading && <p>Loading...</p>}
            {result.map((person) => (
              <li key={person.id} className="bg-secondary p-3 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {person.firstName} {person.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{person.phoneNumber}</p>
                </div>
                <Button onClick={() => handleSelectPerson(person)} variant="outline" size="sm">
                  ເລື້ອກ
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Form formInstance={form} onSubmit={onSubmit} >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">ຂໍ້ມູນຜູ້ຂໍຄຶນເງິນ</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-4 grid grid-cols-2">
              <div className="flex items-center space-x-4">
                <User className="text-primary" />
                <div>
                  <p className="text-sm font-medium">ຊື່ແທ້ ແລະ ນາມສະກຸນ</p>
                  <p className="text-lg">
                    {person?.firstName} {person?.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="text-primary" />
                <div>
                  <p className="text-sm font-medium">ວັນເດືອນປີເກີດ</p>
                  <p className="text-lg">{person?.dateOfBirth ? formatDate({ date: person?.dateOfBirth }) : "-"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <PhoneCall className="text-primary" />
                <div>
                  <p className="text-sm font-medium">ເບິໂທລະສັບ</p>
                  <p className="text-lg">{person?.phoneNumber}</p>
                </div>
              </div>
            </div>
            <p className="text-red-500 pt-3">{errors.profileId?.message}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">ຂໍ້ມູນການເງິນ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 grid grid-cols-2">
            <div className="flex items-center space-x-4">
              <DollarSign className="text-primary" />
              <div>
                <p className="text-sm font-medium">ຍອດເງິນ</p>
                <p className="text-lg">{refundData?.price.price}$</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Folder className="text-primary" />
              <div>
                <p className="text-sm font-medium">ຊຶ້ແຟ້ມ</p>
                <p className="text-lg">{refundData?.folder.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Hash className="text-primary" />
              <div>
                <p className="text-sm font-medium">ລະຫັດຟອມ</p>
                <p className="text-lg">
                  {refundData?.folder.code}
                  {refundData?.number.number}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <IdCard className="text-primary" />
              <div>
                <p className="text-sm font-medium">ປະເພດບັດ</p>
                <p className="text-lg">{refundData?.price.type  === "Blue" ? "ບັດຟ້າ" : "ບັດເຫຼຶອງ"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="space-y-4">
          <CardContent className="space-y-2 pt-5">
            <Form.Field name="refundImage" control={form.control} label="ຮູບພາບ">
              <Form.Input.ImageUploadMany
                name="refundImage"
                control={form.control}
                maxFiles={5} />
            </Form.Field>
            <Separator/>
            <Form.Field name="comment" control={form.control} label="ເຫດຜົນ">
              <Form.Input.Textarea name="comment" />
            </Form.Field>
          </CardContent>
        </Card>
        <Card className="space-y-4">
          <CardHeader className="justify-center">
            <CardTitle className="text-xl font-semibold text-yellow-300">{WarningMessage}</CardTitle>
          </CardHeader>
        </Card>
        {/* <Button type="submit" className="w-full"> ຄືນເງິນ </Button> */}
      </Form>
    </div>
  );
};

export default RefundForm;

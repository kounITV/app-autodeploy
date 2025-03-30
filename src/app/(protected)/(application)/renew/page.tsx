"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useProfileBarcode from "./hook";
import ProfileGrid from "../../profile/container/card/profile-grid";

export default function SearchProfiles() {
  const [barcode, setBarcode] = useState<string | undefined>(undefined);
  const { result, updateSearch, filter } = useProfileBarcode();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value ? String(value) : undefined;

    if (value.length === 7) {
      setBarcode(undefined);
      filter.setBarcodeFilter(numericValue);
    } else {
      setBarcode(numericValue);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>ຄົ້ນຫາຜຸ້ຂໍອອກບັດຄືນ</CardTitle>
          <CardDescription>ປ້ອນຂໍ້ມູນທີ່ຕ້ອງການເພື່ອຄົ້ນຫາຂໍ້ມູນ.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="barcode">ບາໂຄດ</Label>
              <Input
                placeholder="ຄົ້ນຫາບາໂຄດ..."
                type="number"
                value={barcode || ""}
                onChange={handleFilterChange}
                autoFocus
              />
            </div>
            <div className="">
              <Label htmlFor="barcode">ຄົ້ນຫາດ້ວຍຊື່ ຫຼື ນາມສະກຸນ</Label>
              <Input
                placeholder="ຄົ້ນຫາ..."
                type="text"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result?.map((item) => (
          <ProfileGrid key={item?.no} data={[item]} renewable={true} />
        ))}
      </div>
    </div>
  );
}

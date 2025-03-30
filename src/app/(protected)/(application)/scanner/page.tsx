"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import BarcodeScanner from "./container/barcode-scanner"
import ModernPermitCard from "./container/profile"

import fetchApplicationProfile from "./hook"
import { StayPermitCard } from "../printing/container/card"
import { IApplication } from "../application/type"

export default function BarcodeScannerPage() {
  const [barcode, setBarcode] = useState<number | undefined>(0);
  const { result, filter } = fetchApplicationProfile();
  const splitData = (data: IApplication[]) => {
    const dataWithImage = data.map(({ id, profile, ...rest }) => ({
      id,
      ...rest,
      profile: { ...profile, image: profile.image },
    }));

    const dataWithOldImage = data.map(({ id, profile, ...rest }) => ({
      id,
      ...rest,
      profile: { ...profile, image: profile.oldImage },
    }));

    return { dataWithImage, dataWithOldImage };
  };
  const { dataWithImage, dataWithOldImage } = splitData(result);
  const handleScan = (result: { text: string; format: string }) => {
    const value = result.text;
    const numericValue = value ? Number(value) : undefined;
    setBarcode(numericValue);
    if (value.length === 7) {
      filter.setBarcodeFilter(numericValue);
    }
  }
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value ? Number(value) : undefined;
    setBarcode(numericValue);
    if (value.length === 7) {
      filter.setBarcodeFilter(numericValue);
    }
  };

  return (
    <div className="w-full py-8 px-4 justify-center space-3">
      <h1 className="text-3xl font-bold mb-6 text-center">Barcode Scanner</h1>
      <div className="flex-col sm:flex gap-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Scan a Barcode</CardTitle>
            <CardDescription>
              Position the barcode within the scanner frame. Make sure it&rsquo;s well-lit and clearly visible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarcodeScanner onScan={handleScan} width={500} height={300} />
          </CardContent>
          <CardFooter>
            <Input
              placeholder="ຄົ້ນຫາບາໂຄດ..."
              type="number"
              value={barcode || ""}
              onChange={handleFilterChange}
              autoFocus
              className="w-64"
            />
          </CardFooter>
        </Card>
        {result.length > 0 && (
          <div className="w-full flex flex-wrap gap-3 mt-3">
            <div className="">
              <div className="font-bold text-sm">ຮູບພາບຕິດ (ຮູບໃໝ່)</div>
              <StayPermitCard application={dataWithImage?.[0]} />
            </div>
            <div className="">
              <div className="font-bold text-sm">ຮູບພາບຕິດ (ຮູບເກົ່າ)</div>
              <StayPermitCard application={dataWithOldImage?.[0]} />
            </div>
            <div></div>
            <ModernPermitCard data={result?.[0]} />
          </div>
        )}
      </div>
    </div>
  )
}


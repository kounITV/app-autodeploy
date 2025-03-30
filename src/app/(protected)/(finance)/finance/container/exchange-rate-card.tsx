"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/format-date"
import { ArrowRightLeft, Calendar } from "lucide-react"
import { ICurrency } from "../../currency/type"

interface ExchangeRateDisplayProps {
  rate?: number
  createdAt?: string
  baseCurrency?: ICurrency | null;
  targetCurrency?: ICurrency | null;
  amount: string
  conversion?: number
}

export default function ExchangeRateDisplay({
  rate = 0,
  createdAt,
  baseCurrency,
  targetCurrency,
  amount,
  conversion = 0,
}: ExchangeRateDisplayProps) {
  const formattedDate = createdAt ? formatDate({ date: createdAt }) : "ບໍ່ມີຂໍ້ມູນ"
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">ຂໍ້ມູນອັດຕາແລກປ່ຽນ</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">ອັດຕາແລກປ່ຽນ</div>
          <div className="text-2xl font-bold">{rate.toLocaleString()}</div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">ສະກຸນເງິນຕົ້ນທາງ</div>
            <div className="text-lg font-semibold">
              {baseCurrency?.symbol} {baseCurrency?.code}
            </div>
            <div className="text-sm text-muted-foreground">{baseCurrency?.name || "ບໍ່ມີຂໍ້ມູນ"}</div>
          </div>

          <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />

          <div className="space-y-1 text-right">
            <div className="text-sm font-medium text-muted-foreground">ສະກຸນເງິນປາຍທາງ</div>
            <div className="text-lg font-semibold">
              {targetCurrency?.symbol} {targetCurrency?.code}
            </div>
            <div className="text-sm text-muted-foreground">{targetCurrency?.name || "ບໍ່ມີຂໍ້ມູນ"}</div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">ຈຳນວນເງິນ</div>
              <div className="text-lg font-semibold">
                {Number.parseFloat(amount).toLocaleString()} {baseCurrency?.symbol}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-sm font-medium text-muted-foreground">ຈຳນວນເງິນທີ່ແລກປ່ຽນ</div>
              <div className="text-lg font-semibold text-primary">
                {conversion.toLocaleString()} {targetCurrency?.symbol}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


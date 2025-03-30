"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { day: 1, KIP: 202537, CNY: 636, USD: 247, THB: 625 },
  { day: 2, KIP: 189864, CNY: 505, USD: 224, THB: 666 },
  { day: 3, KIP: 284498, CNY: 522, USD: 185, THB: 421 },
  { day: 4, KIP: 244348, CNY: 635, USD: 158, THB: 389 },
  { day: 5, KIP: 237064, CNY: 696, USD: 194, THB: 589 },
  { day: 6, KIP: 293408, CNY: 503, USD: 192, THB: 474 },
  { day: 7, KIP: 281765, CNY: 390, USD: 131, THB: 668 },
  { day: 8, KIP: 152120, CNY: 413, USD: 213, THB: 653 },
  { day: 9, KIP: 252909, CNY: 486, USD: 130, THB: 669 },
  { day: 10, KIP: 190278, CNY: 676, USD: 194, THB: 539 },
  { day: 11, KIP: 154307, CNY: 530, USD: 113, THB: 612 },
  { day: 12, KIP: 229312, CNY: 547, USD: 145, THB: 646 },
  { day: 13, KIP: 261567, CNY: 557, USD: 153, THB: 472 },
  { day: 14, KIP: 277709, CNY: 527, USD: 184, THB: 435 },
  { day: 15, KIP: 228836, CNY: 328, USD: 179, THB: 397 },
  { day: 16, KIP: 199867, CNY: 360, USD: 198, THB: 519 },
  { day: 17, KIP: 173877, CNY: 552, USD: 180, THB: 696 },
  { day: 18, KIP: 230699, CNY: 305, USD: 166, THB: 631 },
  { day: 19, KIP: 279901, CNY: 445, USD: 230, THB: 442 },
  { day: 20, KIP: 184188, CNY: 406, USD: 106, THB: 693 },
  { day: 21, KIP: 196862, CNY: 467, USD: 113, THB: 473 },
  { day: 22, KIP: 209487, CNY: 349, USD: 167, THB: 654 },
  { day: 23, KIP: 242443, CNY: 468, USD: 139, THB: 662 },
  { day: 24, KIP: 293758, CNY: 508, USD: 144, THB: 657 },
  { day: 25, KIP: 278505, CNY: 426, USD: 216, THB: 376 },
  { day: 26, KIP: 174394, CNY: 490, USD: 104, THB: 612 },
  { day: 27, KIP: 277338, CNY: 593, USD: 153, THB: 611 },
  { day: 28, KIP: 174576, CNY: 449, USD: 180, THB: 357 },
  { day: 29, KIP: 240751, CNY: 622, USD: 243, THB: 431 },
  { day: 30, KIP: 256094, CNY: 323, USD: 224, THB: 409 },
  { day: 31, KIP: 202501, CNY: 507, USD: 167, THB: 651 },
]
const currencies = ["KIP", "CNY", "USD", "THB"]
const THOUSAND = 1000

const formatValue = (value: number, currency: string) => {
  if (currency === "KIP") {
    return `${(value / THOUSAND).toFixed(0)}k`
  }
  return value.toString()
}

export default function CurrencyBarChart() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Sum of all daily values for each currency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currencies.map((currency) => (
              <Card key={currency}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{currency}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: `var(--color-${currency})` }}>
                    1,000,000
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full ">
        
        <CardHeader>
          <CardTitle>Daily Currency Values</CardTitle>
          <CardDescription>KIP, CNY, USD, and THB over 31 days</CardDescription>
        </CardHeader>
        <CardContent className="overflow-scroll ">
          <ChartContainer
            config={{
              KIP: {
                label: "KIP (thousands)",
                color: "hsl(var(--chart-1))",
              },
              CNY: {
                label: "CNY",
                color: "hsl(var(--chart-2))",
              },
              USD: {
                label: "USD",
                color: "hsl(var(--chart-3))",
              },
              THB: {
                label: "THB",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[500px] w-[3900px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `${(value / THOUSAND).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<CustomTooltip />} />
                <Legend />
                {currencies.map((currency) => (
                  <Bar
                    key={currency}
                    dataKey={currency}
                    fill={`var(--color-${currency})`}
                    yAxisId={currency === "KIP" ? "left" : "right"}
                    radius={[4, 4, 0, 0]}
                    barSize={100}
                  >
                    <LabelList
                      dataKey={currency}
                      position="top"
                      formatter={(value: number) => formatValue(value, currency)}
                      style={{ fontSize: "10px", fill: `var(--color-${currency})` }}
                    />
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
        <p className="font-bold mb-2">Day {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {formatValue(entry.value, entry.name)}
          </p>
        ))}
      </div>
    )
  }
  return null
}


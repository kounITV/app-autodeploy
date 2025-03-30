import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui";
import { type IAggregationChartProfile } from "../../type";

const chartConfig = {
  male: {
    label: "ຊາຍ",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "ຍິງ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface BarChartAggregationProfileProps {
    data: IAggregationChartProfile[] | null | undefined;
}

export function BarChartAggregationProfile({ data }: BarChartAggregationProfileProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Bar Chart - Aggregation Profile</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  const recentMonth = data[data?.length - 1];
  const previousMonth = data[data?.length - 2];
  const recentTotal = recentMonth?.male + recentMonth?.female;
  const previousTotal = previousMonth?.male + previousMonth?.female;
  let percentageChange = 0;
  if (previousTotal > 0) {
    percentageChange = ((recentTotal - previousTotal) / previousTotal) * 100;
  } else if (recentTotal > 0) {
    percentageChange = 100;
  }
  const firstMonth = data[0].month;
  const lastMonth = recentMonth.month;

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>ຂໍ້ມູນບຸກຄົນຂໍອອກບັດ</CardTitle>
        <CardDescription> {firstMonth} - {lastMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="male" fill="var(--color-male)" radius={4} />
            <Bar dataKey="female" fill="var(--color-female)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
                    ແນວໂນ້ມເພີ່ມຂຶ້ນ {percentageChange.toFixed(1)}% ໃນເດືອນນີ້ <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
                    ສະແດງບຸກຄົນຂໍອອກບັດທັງໝົດໃນ 6 ເດືອນທີ່ຜ່ານມາ
        </div>
      </CardFooter>
    </Card>
  );
}

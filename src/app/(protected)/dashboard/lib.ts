import { monthNamesLao } from "@/lib/constant/month";
import { AggregationResultItem } from "./type";

export function monthOrder(data: AggregationResultItem[]) {
  const months = Object.keys(monthNamesLao);
  return data
    .filter((item) => months.includes(item.name))
    .sort((a, b) => {
      const indexA = a.name === "Jan" ? -1 : months.indexOf(a.name);
      const indexB = b.name === "Jan" ? -1 : months.indexOf(b.name);
      return indexA - indexB;
    })
    .map((item) => ({
      ...item,
      name: monthNamesLao[item.name],
    }));
}
  
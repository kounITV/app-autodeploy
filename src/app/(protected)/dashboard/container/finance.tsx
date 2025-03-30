import { DataTable } from "@/components/containers/table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useList } from "@/hooks/useList";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { columnsFinance } from "../../(finance)/finance/container/columns";
import useFinanceTable from "../../(finance)/finance/hook/useTable";
import { monthOrder } from "../lib";
import { ApplicationAggregation } from "../type";

export function Finance() {
  const { result: revenue } = useList<ApplicationAggregation>({ resource: "/revenue-aggregation" })
  const sortedData = revenue?.[0] ? monthOrder(revenue?.[0].result) : [];
  const { result, meta, updatePagination } = useFinanceTable();
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sortedData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columnsFinance} data={result} meta={meta} updatePagination={updatePagination} className="border-none"/>
        </CardContent>
      </Card>
    </div>
  )
}


import { AggregationCard } from "@/components/containers/aggregation-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useList } from "@/hooks/useList";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { monthOrder } from "../lib";
import { ApplicationAggregation, ApplicationState } from "../type";

export function Overview() {
  const { result: application } = useList<ApplicationAggregation>({ resource: "/application-aggregation" })
  const sortedData = application?.[0] ? monthOrder(application?.[0]?.result) : [];

  const { result: applicationTotal } = useList<ApplicationState>({ resource: "/application-stats" })
  const { result: applicationFinished } = useList<ApplicationState>({ resource: "/application-stats", initialFilters: { status: "FINISHED" } })
  const { result: applicationProcess } = useList<ApplicationState>({ resource: "/application-stats", initialFilters: { status: "PROCESS" } })
  const { result: totalRevenue } = useList<ApplicationState>({ resource: "/total-revenue" })

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AggregationCard value={applicationTotal?.[0]?.result || 0} title={"Total Applications"} />
        <AggregationCard value={applicationFinished?.[0]?.result || 0} title={"Total Applications Finished"} description={applicationFinished?.[0]?.description} />
        <AggregationCard value={applicationProcess?.[0]?.result || 0} title={"Total Applications Process"} />
        <AggregationCard value={totalRevenue?.[0]?.result || 0} title={totalRevenue?.[0]?.name} description={totalRevenue?.[0]?.description} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={sortedData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Bar dataKey="value" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


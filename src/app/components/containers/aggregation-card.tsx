import { Card, CardContent, CardHeader, CardTitle } from "../ui";

export function AggregationCard({ value, title = "", icon, label = "", description = "" }: { value: any, title?: string, icon?: JSX.Element, label?: string, description?: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value} {label}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}


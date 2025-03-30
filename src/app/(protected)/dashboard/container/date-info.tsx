import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const dateData = [
  { date: "2023-06-01", issued: 20, expired: 5 },
  { date: "2023-06-02", issued: 25, expired: 8 },
  { date: "2023-06-03", issued: 18, expired: 6 },
  { date: "2023-06-04", issued: 30, expired: 10 },
  { date: "2023-06-05", issued: 22, expired: 7 },
]

const upcomingExpirations = [
  { id: 1, name: "John Doe", expirationDate: "2023-07-01" },
  { id: 2, name: "Jane Smith", expirationDate: "2023-07-03" },
  { id: 3, name: "Bob Johnson", expirationDate: "2023-07-05" },
  { id: 4, name: "Alice Brown", expirationDate: "2023-07-07" },
  { id: 5, name: "Charlie Davis", expirationDate: "2023-07-09" },
]

export function DateInfo() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Permit Issue and Expiration Trends</CardTitle>
          <CardDescription>Daily trends of issued and expired permits</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dateData}>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="issued" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="expired" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Permit Expirations</CardTitle>
          <CardDescription>Permits expiring in the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Expiration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingExpirations.map((expiration) => (
                <TableRow key={expiration.id}>
                  <TableCell>{expiration.name}</TableCell>
                  <TableCell>{expiration.expirationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


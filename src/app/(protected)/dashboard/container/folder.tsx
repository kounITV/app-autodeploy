import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const folderStatusData = [
  { status: "Active", count: 987 },
  { status: "Completed", count: 247 },
  { status: "Pending", count: 154 },
  { status: "Rejected", count: 62 },
]

const recentFolders = [
  { id: 1, name: "Application A", status: "Active", createdAt: "2023-06-01" },
  { id: 2, name: "Application B", status: "Completed", createdAt: "2023-06-02" },
  { id: 3, name: "Application C", status: "Pending", createdAt: "2023-06-03" },
  { id: 4, name: "Application D", status: "Active", createdAt: "2023-06-04" },
  { id: 5, name: "Application E", status: "Rejected", createdAt: "2023-06-05" },
]

export function Folder() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Folder Status Distribution</CardTitle>
          <CardDescription>Overview of application folder statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={folderStatusData}>
              <XAxis dataKey="status" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Folders</CardTitle>
          <CardDescription>Latest application folder activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Folder Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFolders.map((folder) => (
                <TableRow key={folder.id}>
                  <TableCell>{folder.name}</TableCell>
                  <TableCell>{folder.status}</TableCell>
                  <TableCell>{folder.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


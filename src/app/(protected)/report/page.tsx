/* eslint-disable @typescript-eslint/naming-convention */
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, FileSpreadsheet } from "lucide-react"
import * as XLSX from "xlsx"
import useNumberAggregation from "./hook"
import { FilterNumberAggregation } from "./cardFilter"

export default function FinancialSummary() {
  const { result, filter } = useNumberAggregation()

  const formatCurrency = (amount: number, symbol: string) => {
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new()
    const transactionData = result?.data?.map((item) => ({
      "ລ/ດ": item.no,
      "ລະຫັດບັດ": item.number,
      "ວັນທີເດືອນປີ": item.createdAt,
      "ປະເພດບັດ": item.priceCode,
      "ຜູ້ຮັບເງິນ": item.approvedByFirstName,
      "Rate (LIT)": item.rateBase,
      "Rate (Police)": item.ratePolice,
      "ສະກຸນເງິນ": item.currencyCode,
      "ລາຄາ": item.price,
      "ສາຂາ": item.officeName,
    }))

    const transactionsSheet = XLSX.utils.json_to_sheet(transactionData)
    XLSX.utils.book_append_sheet(workbook, transactionsSheet, "Transactions")

    const summaryData = result?.summary?.sum.map((item) => ({
      Currency: item.currency.name,
      Total: item.total,
      Symbol: item.currency.symbol,
    }))

    const summarySheet = XLSX.utils.json_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${result.summary.name}.xlsx`

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">{result.summary?.name}</h1>
        <Button onClick={exportToExcel} className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <FilterNumberAggregation filter={filter} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.summary?.sum.map((item, index) => (
          <Card key={index} className="bg-card">
            <CardHeader className="pb-2 bg-primary/5">
              <CardTitle className="text-lg font-medium flex items-center">
                {item.currency.symbol} {item.currency.code} Total
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold">{formatCurrency(item.total, item.currency.symbol)}</div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader className="pb-2 bg-primary/5">
            <CardTitle className="text-lg font-medium flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">{result?.data?.length}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ລ/ດ</TableHead>
                  <TableHead>ເລກທີຟອມ</TableHead>
                  <TableHead>ວັນທີເດືອນປີ</TableHead>
                  <TableHead>ປະເພດບັດ</TableHead>
                  <TableHead>ຜູ້ຮັບເງິນ</TableHead>
                  <TableHead>Rate (LIT)</TableHead>
                  <TableHead>Rate (Police)</TableHead>
                  <TableHead>ສະກຸນເງິນ</TableHead>
                  <TableHead>ລາຄາ</TableHead>
                  <TableHead>ສາຂາ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.data?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.no}</TableCell>
                    <TableCell className="font-medium">{transaction.number}</TableCell>
                    <TableCell>{transaction.createdAt}</TableCell>
                    <TableCell>{transaction.priceCode}</TableCell>
                    <TableCell>{transaction.approvedByFirstName}</TableCell>
                    <TableCell>{transaction.rateBase}</TableCell>
                    <TableCell>{transaction.ratePolice}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.currencyCode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.price, transaction.currencySymbol)}
                    </TableCell>
                    <TableCell>{transaction.officeName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


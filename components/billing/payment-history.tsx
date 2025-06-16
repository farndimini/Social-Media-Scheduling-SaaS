"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { format } from "date-fns"

interface Invoice {
  id: string
  amount: number
  status: "paid" | "pending" | "failed"
  date: string
}

export function PaymentHistory() {
  // Mock invoices data
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      amount: 29,
      status: "paid",
      date: "2023-11-01T00:00:00Z",
    },
    {
      id: "INV-002",
      amount: 29,
      status: "paid",
      date: "2023-10-01T00:00:00Z",
    },
    {
      id: "INV-003",
      amount: 29,
      status: "paid",
      date: "2023-09-01T00:00:00Z",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500"
      case "pending":
        return "text-yellow-500"
      case "failed":
        return "text-red-500"
      default:
        return ""
    }
  }

  const handleDownload = (invoiceId: string) => {
    // In a real app, this would download the invoice PDF
    alert(`Downloading invoice ${invoiceId}...`)
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No payment history available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-4 gap-4 p-4 font-medium">
          <div>Invoice</div>
          <div>Date</div>
          <div>Amount</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="grid grid-cols-4 gap-4 p-4 items-center">
              <div>
                <div className="font-medium">{invoice.id}</div>
                <div className={`text-xs ${getStatusColor(invoice.status)}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </div>
              </div>
              <div>{format(new Date(invoice.date), "MMM d, yyyy")}</div>
              <div>${invoice.amount.toFixed(2)}</div>
              <div className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleDownload(invoice.id)}>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

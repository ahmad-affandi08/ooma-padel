import * as XLSX from 'xlsx'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const exportToExcel = (data: any[], fileName: string) => {
  // 1. Transform Data for Excel (Flattening)
  const rows = data.map((order) => {
    // Join item names for summary
    const itemNames = order.items.map((i: any) =>
      `${i.menuItem.name} (${i.quantity})`
    ).join(', ')

    return {
      'No Order': order.orderNumber,
      'Tanggal': format(new Date(order.createdAt), 'dd MMMM yyyy HH:mm', { locale: id }),
      'Pelanggan': order.customerName || '-',
      'Items': itemNames,
      'Metode Bayar': order.paymentMethod,
      'Subtotal': order.subtotal,
      'Pajak (10%)': order.tax,
      'Total': order.total,
      'Catatan': order.notes || '-'
    }
  })

  // 2. Create Worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows)

  // 3. Create Workbook
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan')

  // 4. Trigger Download
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

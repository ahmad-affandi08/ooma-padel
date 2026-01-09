'use client'

import { useState, useEffect } from 'react'
import { startOfMonth, endOfMonth, subDays, startOfDay, endOfDay, format } from 'date-fns'
import { RevenueChart } from '@/features/reports/components/RevenueChart'
import { TopProductsChart } from '@/features/reports/components/TopProductsChart'
import { SummaryCards } from '@/features/reports/components/SummaryCards'
import { TransactionTable } from '@/features/reports/components/TransactionTable'
import { exportToExcel } from '@/features/reports/utils/exportToExcel'
import { Loader2, Calendar as CalendarIcon, Filter, Download, BarChart3, Table } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'DATA'>('DATA')

  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfDay(new Date())
  })

  const [filterType, setFilterType] = useState('THIS_MONTH') // '7_DAYS', '30_DAYS', 'THIS_MONTH'

  // Data States
  const [summary, setSummary] = useState<any>(null)
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleFilterChange = (type: string) => {
    setFilterType(type)
    const now = new Date()
    let start, end = endOfDay(now)

    if (type === '7_DAYS') {
      start = subDays(now, 7)
    } else if (type === '30_DAYS') {
      start = subDays(now, 30)
    } else {
      start = startOfMonth(now)
      end = endOfMonth(now) // 'THIS_MONTH'
    }

    setDateRange({ start, end })
  }

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const query = `?startDate=${dateRange.start.toISOString()}&endDate=${dateRange.end.toISOString()}`

        // Fetch base analytics
        const promises = [
          fetch(`/api/reports/summary${query}`).then(r => r.json()),
          fetch(`/api/reports/revenue${query}`).then(r => r.json()),
          fetch(`/api/reports/top-products${query}`).then(r => r.json())
        ]

        // Fetch tabular data if active tab is DATA
        if (activeTab === 'DATA') {
          promises.push(fetch(`/api/reports/transactions${query}`).then(r => r.json()))
        }

        const results = await Promise.all(promises)

        setSummary(results[0])
        setRevenueData(results[1])
        setTopProducts(results[2])
        if (activeTab === 'DATA') {
          setTransactions(results[3])
        }

      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateRange, activeTab])

  // Handle Export
  const handleExport = () => {
    if (!transactions.length) return
    const filename = `Laporan_OOMA_${filterType}_${format(new Date(), 'yyyyMMdd')}`
    exportToExcel(transactions, filename)
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Laporan & Analitik</h1>
          <p className="text-neutral-500 text-sm">Monitor performa keuangan dan operasional</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Tab Switcher */}
          <div className="bg-neutral-100 p-1 rounded-lg flex self-start">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'OVERVIEW' ? 'bg-white text-orange-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Grafik
            </button>
            <button
              onClick={() => setActiveTab('DATA')}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'DATA' ? 'bg-white text-orange-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                }`}
            >
              <Table className="w-4 h-4 mr-2" />
              Rekap Table
            </button>
          </div>

          {/* Date Filters */}
          <div className="bg-white p-1 rounded-lg border border-neutral-200 flex items-center shadow-sm self-start">
            {[
              { id: '7_DAYS', label: '7 Hari' },
              { id: '30_DAYS', label: '30 Hari' },
              { id: 'THIS_MONTH', label: 'Bulan Ini' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => handleFilterChange(f.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filterType === f.id
                    ? 'bg-orange-50 text-orange-700 border border-orange-100'
                    : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Export Button (Only in Data Tab) */}
          {activeTab === 'DATA' && (
            <Button onClick={handleExport} disabled={isLoading || transactions.length === 0} className="bg-green-600 hover:bg-green-700 text-white border-none">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      ) : (
        <>
          {/* KPI Cards (Always Visible) */}
          {summary && <SummaryCards data={summary} />}

          {/* Overview Content */}
          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <RevenueChart data={revenueData} />
              <TopProductsChart data={topProducts} />
            </div>
          )}

          {/* Tabular Content */}
          {activeTab === 'DATA' && (
            <div className="animate-in fade-in duration-300">
              <TransactionTable data={transactions} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

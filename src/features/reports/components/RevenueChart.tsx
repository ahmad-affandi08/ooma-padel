'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RevenueChartProps {
  data: {
    date: string
    name: string
    revenue: number
  }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  if (!Array.isArray(data)) return null
  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">Tren Pendapatan</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#a3a3a3' }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#a3a3a3' }}
            tickFormatter={(value) => `Rp${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: any) => [`Rp ${value.toLocaleString()}`, 'Pendapatan']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#d96435"
            fill="url(#colorRevenue)"
            strokeWidth={3}
          />
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d96435" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#d96435" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

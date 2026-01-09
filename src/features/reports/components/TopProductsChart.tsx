'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface TopProductsChartProps {
  data: {
    name: string
    category: string
    quantity: number
  }[]
}

const COLORS = ['#d96435', '#e38a60', '#edb496', '#f5d4c2', '#fae9e0']

export function TopProductsChart({ data }: TopProductsChartProps) {
  if (!Array.isArray(data)) return null
  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">Produk Terlaris</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={{ fontSize: 11, fill: '#525252' }}
          />
          <Tooltip
            formatter={(value: any) => [`${value} Porsi`, 'Terjual']}
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="quantity" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

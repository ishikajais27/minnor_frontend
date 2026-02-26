'use client'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p) => (
        <p
          key={p.name}
          style={{
            color: p.color,
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.8rem',
            marginTop: '0.2rem',
          }}
        >
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function Chart({ data, company, ticker }) {
  return (
    <div className="chart-wrap">
      <div className="chart-header">
        <div>
          <span className="chart-ticker">{ticker}</span>
          <h3 className="chart-title">{company}</h3>
        </div>
        <span className="chart-badge">ML Prediction Active</span>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c8ff00" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#c8ff00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: '#666', fontFamily: 'DM Mono', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#666', fontFamily: 'DM Mono', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: 'DM Mono',
              fontSize: '0.75rem',
              color: '#666',
              paddingTop: '1.5rem',
            }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            fill="url(#actualGrad)"
            stroke="#c8ff00"
            strokeWidth={2}
            dot={false}
            name="Actual"
          />
          <Bar
            dataKey="volume"
            fill="rgba(255,255,255,0.04)"
            radius={[2, 2, 0, 0]}
            name="Volume"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#a78bfa"
            strokeWidth={2}
            dot={{ fill: '#a78bfa', r: 3, strokeWidth: 0 }}
            strokeDasharray="5 3"
            name="Predicted"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

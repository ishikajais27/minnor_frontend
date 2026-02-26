'use client'
import { useRef, useState } from 'react'
import Chart from '../components/Chart'

const COMPANIES = [
  { id: 'ABB', name: 'ABB' },
  { id: 'ADANIENSOL', name: 'Adani Energy Solutions' },
  { id: 'ADANIENT', name: 'Adani Enterprises' },
  { id: 'ADANIGREEN', name: 'Adani Green Energy' },
  { id: 'ADANIPORTS', name: 'Adani Ports' },
  { id: 'ADANIPOWER', name: 'Adani Power' },
  { id: 'AMBUJACEM', name: 'Ambuja Cements' },
  { id: 'APOLLOHOSP', name: 'Apollo Hospitals' },
  { id: 'ASIANPAINT', name: 'Asian Paints' },
  { id: 'ATGL', name: 'Adani Total Gas' },
  { id: 'AXISBANK', name: 'Axis Bank' },
  { id: 'BAJAJ-AUTO', name: 'Bajaj Auto' },
  { id: 'BAJAJFINSV', name: 'Bajaj Finserv' },
  { id: 'BAJAJHLDNG', name: 'Bajaj Holdings' },
  { id: 'BAJFINANCE', name: 'Bajaj Finance' },
  { id: 'BANKBARODA', name: 'Bank of Baroda' },
  { id: 'BEL', name: 'BEL' },
  { id: 'BHARTIARTL', name: 'Bharti Airtel' },
  { id: 'BHEL', name: 'BHEL' },
  { id: 'BOSCHLTD', name: 'Bosch' },
  { id: 'BPCL', name: 'BPCL' },
  { id: 'BRITANNIA', name: 'Britannia' },
  { id: 'CANBK', name: 'Canara Bank' },
  { id: 'CHOLAFIN', name: 'Cholamandalam Finance' },
  { id: 'CIPLA', name: 'Cipla' },
  { id: 'COALINDIA', name: 'Coal India' },
  { id: 'DABUR', name: 'Dabur' },
  { id: 'DIVISLAB', name: "Divi's Laboratories" },
  { id: 'DLF', name: 'DLF' },
  { id: 'DMART', name: 'DMart' },
  { id: 'DRREDDY', name: "Dr. Reddy's" },
  { id: 'EICHERMOT', name: 'Eicher Motors' },
  { id: 'ENRIN', name: 'ENRIN' },
  { id: 'GAIL', name: 'GAIL' },
  { id: 'GODREJCP', name: 'Godrej Consumer' },
  { id: 'GRASIM', name: 'Grasim Industries' },
  { id: 'HAL', name: 'HAL' },
  { id: 'HAVELLS', name: 'Havells' },
  { id: 'HCLTECH', name: 'HCL Technologies' },
  { id: 'HDFCBANK', name: 'HDFC Bank' },
  { id: 'HDFCLIFE', name: 'HDFC Life' },
  { id: 'HEROMOTOCO', name: 'Hero MotoCorp' },
  { id: 'HINDALCO', name: 'Hindalco' },
  { id: 'HINDUNILVR', name: 'Hindustan Unilever' },
  { id: 'HINDZINC', name: 'Hindustan Zinc' },
  { id: 'HYUNDAI', name: 'Hyundai' },
  { id: 'ICICIBANK', name: 'ICICI Bank' },
  { id: 'ICICIGI', name: 'ICICI Lombard' },
  { id: 'ICICIPRULI', name: 'ICICI Prudential' },
  { id: 'INDHOTEL', name: 'Indian Hotels' },
  { id: 'INDIGO', name: 'IndiGo' },
  { id: 'INDUSINDBK', name: 'IndusInd Bank' },
  { id: 'INFY', name: 'Infosys' },
  { id: 'IOC', name: 'Indian Oil' },
  { id: 'IRCTC', name: 'IRCTC' },
  { id: 'IRFC', name: 'IRFC' },
  { id: 'ITC', name: 'ITC' },
  { id: 'JINDALSTEL', name: 'Jindal Steel' },
  { id: 'JIOFIN', name: 'Jio Financial' },
  { id: 'JSWENERGY', name: 'JSW Energy' },
  { id: 'JSWSTEEL', name: 'JSW Steel' },
  { id: 'KOTAKBANK', name: 'Kotak Mahindra Bank' },
  { id: 'LICI', name: 'LIC' },
  { id: 'LODHA', name: 'Lodha' },
  { id: 'LT', name: 'L&T' },
  { id: 'LTIM', name: 'LTIMindtree' },
  { id: 'MARUTI', name: 'Maruti Suzuki' },
  { id: 'MM', name: 'M&M' },
  { id: 'MOTHERSON', name: 'Motherson Sumi' },
  { id: 'NAUKRI', name: 'Naukri (Info Edge)' },
  { id: 'NESTLEIND', name: 'Nestle India' },
  { id: 'NHPC', name: 'NHPC' },
  { id: 'NIFTY50', name: 'Nifty 50' },
  { id: 'NIFTYBANK', name: 'Nifty Bank' },
  { id: 'NTPC', name: 'NTPC' },
  { id: 'ONGC', name: 'ONGC' },
  { id: 'PFC', name: 'PFC' },
  { id: 'PIDILITIND', name: 'Pidilite Industries' },
  { id: 'PNB', name: 'PNB' },
  { id: 'POWERGRID', name: 'Power Grid' },
  { id: 'RECLTD', name: 'REC' },
  { id: 'RELIANCE', name: 'Reliance Industries' },
  { id: 'SBILIFE', name: 'SBI Life' },
  { id: 'SBIN', name: 'SBI' },
  { id: 'SHREECEM', name: 'Shree Cement' },
  { id: 'SHRIRAMFIN', name: 'Shriram Finance' },
  { id: 'SIEMENS', name: 'Siemens' },
  { id: 'SOLARINDS', name: 'Solar Industries' },
  { id: 'SUNPHARMA', name: 'Sun Pharma' },
  { id: 'TATACONSUM', name: 'Tata Consumer' },
  { id: 'TATAPOWER', name: 'Tata Power' },
  { id: 'TATASTEEL', name: 'Tata Steel' },
  { id: 'TCS', name: 'TCS' },
  { id: 'TECHM', name: 'Tech Mahindra' },
  { id: 'TITAN', name: 'Titan' },
  { id: 'TMPV', name: 'TMPV' },
  { id: 'TORNTPHARM', name: 'Torrent Pharma' },
  { id: 'TRENT', name: 'Trent' },
  { id: 'TVSMOTOR', name: 'TVS Motor' },
  { id: 'ULTRACEMCO', name: 'UltraTech Cement' },
  { id: 'UNITDSPR', name: 'United Spirits' },
  { id: 'VBL', name: 'Varun Beverages' },
  { id: 'VEDL', name: 'Vedanta' },
  { id: 'WIPRO', name: 'Wipro' },
  { id: 'ZYDUSLIFE', name: 'Zydus Lifesciences' },
]

function getMockData(company) {
  const seed = company.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const rand = (min, max, offset = 0) => {
    const x = Math.sin(seed + offset) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min) + min)
  }
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(
    (m, i) => ({
      name: m,
      actual: rand(120, 480, i),
      predicted: rand(100, 500, i + 100),
      volume: rand(20, 100, i + 200),
    }),
  )
}

export default function Home() {
  const [selected, setSelected] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const analyticsRef = useRef(null)

  async function handleSelect(e) {
    const val = e.target.value
    setSelected(val)
    if (!val) {
      setData(null)
      return
    }
    setLoading(true)
    // Replace with: const res = await fetch(`/api/ml?company=${val}`); setData(await res.json())
    await new Promise((r) => setTimeout(r, 800))
    setData(getMockData(val))
    setLoading(false)
    analyticsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectedName = COMPANIES.find((c) => c.id === selected)?.name

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">NSE · BSE · Real-time ML</div>
          <h1 className="hero-title">ML Insights</h1>
          <p className="hero-sub">
            <span className="typewriter">
              Predict. Analyse. Invest smarter.
            </span>
          </p>
          <a href="#analytics" className="hero-cta">
            Explore Analytics ↓
          </a>
        </div>
      </section>

      <section id="analytics" ref={analyticsRef} className="analytics">
        <div className="analytics-inner">
          <h2 className="section-title">Company Analytics</h2>
          <p className="section-sub">
            Select a stock to generate ML-powered predictions
          </p>

          <div className="select-wrap">
            <select className="select" value={selected} onChange={handleSelect}>
              <option value="">— Select a company —</option>
              {COMPANIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="select-arrow">▾</span>
          </div>

          {loading && (
            <div className="loader">
              <div className="loader-dot" />
              <div className="loader-dot" />
              <div className="loader-dot" />
              <span>Running model…</span>
            </div>
          )}

          {data && !loading && (
            <Chart data={data} company={selectedName} ticker={selected} />
          )}

          {!selected && !loading && (
            <div className="placeholder">
              <div className="placeholder-icon">📈</div>
              <p>Select a company to visualize predictions</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

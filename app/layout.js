import './globals.css'
import FluidBg from '../components/FluidBg'

export const metadata = {
  title: 'ML Insights',
  description: 'Company ML Analytics Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FluidBg />
        {children}
      </body>
    </html>
  )
}

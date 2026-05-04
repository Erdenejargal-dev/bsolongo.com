'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/dashboard/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-display italic font-light text-cream text-4xl mb-2">Solongo B.</p>
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-12">Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-0">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            required
            className="w-full bg-transparent border-b border-cream/15 py-4 font-sans text-[14px] text-cream placeholder-cream/25 focus:outline-none focus:border-gold transition-colors duration-300"
          />
          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold text-ink font-sans text-[11px] tracking-[0.25em] uppercase hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {loading ? 'Entering…' : 'Enter'}
            </button>
          </div>
          {error && (
            <p className="pt-4 font-sans text-[11px] text-rose text-center">{error}</p>
          )}
        </form>
      </div>
    </main>
  )
}

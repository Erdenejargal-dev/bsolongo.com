'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Article } from '@/lib/articles'

type UploadedImage = {
  public_id: string
  secure_url: string
  width: number
  height: number
}

// ── Gallery Tab ───────────────────────────────────────────────────────────────

function GalleryTab() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [progress, setProgress] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFiles = useCallback(async (files: FileList) => {
    setUploading(true)
    const msgs: string[] = []

    for (const file of Array.from(files)) {
      msgs.push(`Uploading ${file.name}…`)
      setProgress([...msgs])

      const signRes = await fetch('/api/dashboard/upload/sign', { method: 'POST' })
      const { signature, timestamp, folder, cloudName, apiKey } = await signRes.json()

      const fd = new FormData()
      fd.append('file', file)
      fd.append('signature', signature)
      fd.append('timestamp', timestamp)
      fd.append('api_key', apiKey)
      fd.append('folder', folder)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (data.secure_url) {
        setImages(prev => [data as UploadedImage, ...prev])
        msgs[msgs.length - 1] = `✓ ${file.name}`
      } else {
        msgs[msgs.length - 1] = `✗ ${file.name} failed`
      }
      setProgress([...msgs])
    }

    setUploading(false)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-8">
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-none py-16 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
          dragging ? 'border-gold bg-gold/5' : 'border-cream/15 hover:border-cream/30'
        }`}
      >
        <svg className="w-8 h-8 text-cream/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
        </svg>
        <p className="font-sans text-[13px] text-cream/40">
          {uploading ? 'Uploading…' : 'Drop images here or click to browse'}
        </p>
        <p className="font-sans text-[11px] text-cream/20 mt-1">JPG, PNG, HEIC, WEBP</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => e.target.files && uploadFiles(e.target.files)}
        />
      </div>

      {/* Progress log */}
      {progress.length > 0 && (
        <div className="space-y-1">
          {progress.map((msg, i) => (
            <p key={i} className={`font-sans text-[12px] ${msg.startsWith('✓') ? 'text-green-400' : msg.startsWith('✗') ? 'text-rose' : 'text-cream/40'}`}>
              {msg}
            </p>
          ))}
        </div>
      )}

      {/* Newly uploaded this session */}
      {images.length > 0 && (
        <div>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/30 mb-4">Uploaded this session</p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {images.map(img => (
              <div key={img.public_id} className="aspect-square overflow-hidden bg-cream/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.secure_url.replace('/upload/', '/upload/w_300,h_300,c_fill,f_auto/')}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── News Tab ──────────────────────────────────────────────────────────────────

function NewsTab() {
  const [articles, setArticles] = useState<Article[]>([])
  const [form, setForm] = useState({ category: '', title: '', excerpt: '', readTime: '', date: '', href: '' })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetch('/api/dashboard/articles').then(r => r.json()).then(setArticles)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/dashboard/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (data.ok) {
      setArticles(prev => [data.article, ...prev])
      setForm({ category: '', title: '', excerpt: '', readTime: '', date: '', href: '' })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/dashboard/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-10">
      {/* Add article form */}
      <div className="border border-cream/10 p-6">
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-6">Add Article</p>
        <form onSubmit={handleSubmit} className="space-y-0">
          {[
            { name: 'category',  placeholder: 'Publication (e.g. Forbes Mongolia)', type: 'text' },
            { name: 'title',     placeholder: 'Article Title',                       type: 'text' },
            { name: 'date',      placeholder: 'Date (e.g. 2024)',                    type: 'text' },
            { name: 'readTime',  placeholder: 'Read time (e.g. 4 min)',              type: 'text' },
            { name: 'href',      placeholder: 'Article URL',                         type: 'url'  },
          ].map(field => (
            <div key={field.name}>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                required={field.name !== 'href' && field.name !== 'readTime'}
                className="w-full bg-transparent border-b border-cream/10 py-3.5 font-sans text-[13px] text-cream placeholder-cream/20 focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>
          ))}
          <div className="pt-1">
            <textarea
              name="excerpt"
              placeholder="Short excerpt (1–2 sentences)"
              value={form.excerpt}
              onChange={handleChange}
              required
              rows={2}
              className="w-full bg-transparent border-b border-cream/10 py-3.5 font-sans text-[13px] text-cream placeholder-cream/20 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
            />
          </div>
          <div className="pt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gold text-ink font-sans text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {saving ? 'Publishing…' : 'Publish'}
            </button>
            {success && (
              <span className="font-sans text-[11px] text-green-400">Article published</span>
            )}
          </div>
        </form>
      </div>

      {/* Article list */}
      {articles.length > 0 && (
        <div>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/30 mb-4">All Articles</p>
          <div className="space-y-px">
            {articles.map(article => (
              <div key={article.id} className="flex items-start justify-between gap-4 bg-cream/3 px-4 py-4 group">
                <div className="min-w-0">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-1">{article.category} · {article.date}</p>
                  <p className="font-sans text-[13px] text-cream/70 truncate">{article.title}</p>
                </div>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex-shrink-0 font-sans text-[11px] text-cream/20 hover:text-rose transition-colors opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<'gallery' | 'news'>('gallery')

  const logout = async () => {
    await fetch('/api/dashboard/logout', { method: 'POST' })
    router.push('/dashboard/login')
  }

  return (
    <main className="min-h-screen bg-ink text-cream">
      {/* Top bar */}
      <div className="border-b border-cream/8 px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-display italic text-xl text-cream">Solongo B.</span>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold">Dashboard</span>
        </div>
        <button
          onClick={logout}
          className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/30 hover:text-cream transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="px-6 md:px-12 py-10 max-w-3xl">
        {/* Tabs */}
        <div className="flex gap-8 mb-10 border-b border-cream/8">
          {(['gallery', 'news'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 font-sans text-[11px] tracking-[0.25em] uppercase transition-colors duration-200 ${
                tab === t ? 'text-gold border-b border-gold -mb-px' : 'text-cream/30 hover:text-cream/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'gallery' ? <GalleryTab /> : <NewsTab />}
      </div>
    </main>
  )
}

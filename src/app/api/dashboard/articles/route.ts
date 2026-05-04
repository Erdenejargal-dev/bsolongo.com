import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getArticles, DEFAULT_ARTICLES, type Article } from '@/lib/articles'
import { revalidatePath } from 'next/cache'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function saveArticles(articles: Article[]) {
  const json = JSON.stringify(articles)
  const b64 = Buffer.from(json).toString('base64')
  const dataUri = `data:application/json;base64,${b64}`
  await cloudinary.uploader.upload(dataUri, {
    public_id: 'bsolongo.com/articles',
    resource_type: 'raw',
    overwrite: true,
  })
}

export async function GET() {
  const articles = await getArticles()
  return NextResponse.json(articles)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { category, title, excerpt, readTime, date, href } = body

  if (!category || !title || !excerpt || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const current = await getArticles()
  const base = current.length > 0 ? current : DEFAULT_ARTICLES

  const newArticle: Article = {
    id: Date.now().toString(),
    category,
    title,
    excerpt,
    readTime: readTime || '3 min',
    date,
    href: href || '#',
  }

  const updated = [newArticle, ...base]
  await saveArticles(updated)
  revalidatePath('/')

  return NextResponse.json({ ok: true, article: newArticle })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const current = await getArticles()
  const updated = current.filter(a => a.id !== id)
  await saveArticles(updated)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}

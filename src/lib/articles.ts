export type Article = {
  id: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
  href: string
}

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: '1',
    category: 'Forbes Mongolia',
    title: 'Building Debt-Free Futures Inside Hugo Endowment Fund',
    excerpt: 'How one Mongolian innovator is rewriting the rulebook on educational investment — and why the world is paying attention.',
    readTime: '4 min',
    date: '2023',
    href: '#',
  },
  {
    id: '2',
    category: 'CNBC Mongolia',
    title: 'The 40·40·20 Theory Changing How Families Think About Education',
    excerpt: "A Nobel-backed framework finds powerful new application in Mongolia's growing middle class — and beyond.",
    readTime: '3 min',
    date: '2023',
    href: '#',
  },
  {
    id: '3',
    category: 'NTV Mongolia',
    title: 'Oyunii Umch: 142 Characters, One Vision for Mongolian Children',
    excerpt: "The children's book series that captured the hearts of educators, parents, and a Ministry — and its author's even bigger ambitions.",
    readTime: '5 min',
    date: '2023',
    href: '#',
  },
]

export async function getArticles(): Promise<Article[]> {
  try {
    const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/bsolongo.com/articles.json`
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return DEFAULT_ARTICLES
    return await res.json()
  } catch {
    return DEFAULT_ARTICLES
  }
}

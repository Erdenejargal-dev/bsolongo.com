import { getArticles } from '@/lib/articles'
import PressDisplay from './PressDisplay'

export default async function Press() {
  const articles = await getArticles()
  return <PressDisplay articles={articles} />
}

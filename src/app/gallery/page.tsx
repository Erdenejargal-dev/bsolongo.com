import { v2 as cloudinary } from 'cloudinary'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GalleryClient from './GalleryClient'

export const revalidate = 3600

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type Resource = {
  public_id: string
  secure_url: string
  width: number
  height: number
}

async function getImages(): Promise<Resource[]> {
  const result = await cloudinary.search
    .expression('folder:bsolongo.com')
    .max_results(100)
    .execute()
  return result.resources as Resource[]
}

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <>
      <Header />
      <main className="bg-ink" style={{ paddingTop: '72px' }}>
        <GalleryClient images={images} />
      </main>
      <Footer />
    </>
  )
}

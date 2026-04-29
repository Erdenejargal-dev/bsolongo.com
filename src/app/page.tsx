import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MarqueeBanner from '@/components/MarqueeBanner'
import About from '@/components/About'
import PhotoBand from '@/components/PhotoBand'
import FundProjects from '@/components/FundProjects'
import CollegeProgram from '@/components/CollegeProgram'
import ChildrensBook from '@/components/ChildrensBook'
import Partnerships from '@/components/Partnerships'
import Awards from '@/components/Awards'
import Press from '@/components/Press'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <MarqueeBanner />
      <About />
      <PhotoBand />
      <FundProjects />
      <CollegeProgram />
      <ChildrensBook />
      <Partnerships />
      <Awards />
      <Press />
      <Footer />
    </main>
  )
}

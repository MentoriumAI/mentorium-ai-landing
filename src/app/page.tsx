import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSolution from '@/components/ProblemSolution'
import Features from '@/components/Features'
import Benefits from '@/components/Benefits'
import Diferenciadores from '@/components/Diferenciadores'
import RoadmapInnovacion from '@/components/RoadmapInnovacion'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <Benefits />
        {/* <Diferenciadores /> */}
        <RoadmapInnovacion />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
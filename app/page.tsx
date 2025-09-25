import SiteHeader from '@/components/layout/site-header'
import HeroSection from '@/components/home/hero-section'
import {getAllPlans} from '@/api/request/plan'
import PricingSection from '@/components/home/pricing-section'
import TrustedBySection from '@/components/home/trusted-by-section'
import FaqSection from '@/components/home/faq-section'
import SiteFooter from '@/components/layout/site-footer'

export const revalidate = 60

export default async function Home() {
  const plans = await getAllPlans()
  
  return (
    <div className="min-h-screen">
      <div className="w-full bg-gradient-to-b from-white to-[#FFEBDD] via-[#FFF4EC]">
        <SiteHeader/>
        <HeroSection/>
        <PricingSection plans={plans}/>
      </div>
      <TrustedBySection/>
      <FaqSection/>
      <SiteFooter/>
    </div>
  );
}

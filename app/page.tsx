import SiteHeader from '@/components/layout/site-header'
import HeroSection from '@/components/home/hero-section'
import {getAllPlans} from '@/api/request/plan'
import PricingSection from '@/components/home/pricing-section'

export const revalidate = 60

export default async function Home() {
  const plans = await getAllPlans()
  
  return (
    <div className="min-h-screen">
      <SiteHeader/>
      <HeroSection/>
      <PricingSection plans={plans}/>
    </div>
  );
}

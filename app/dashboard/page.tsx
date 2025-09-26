import DashboardHeader from '@/components/dashboard/dashboard-header'
import SubscriptionInfo from '@/components/dashboard/subscription-info'
import PaymentHistory from '@/components/dashboard/payment-history'

export default function DashboardPage() {
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <DashboardHeader />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SubscriptionInfo/>
          </div>
          <div className="lg:col-span-2">
            <PaymentHistory/>
          </div>
        </div>
      </div>
    </div>
  );
}

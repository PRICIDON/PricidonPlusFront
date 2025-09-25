'use client'

import {useQuery} from '@tanstack/react-query'
import {getMe} from '@/api/request/users'

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: ['get me']
  })
  
  return (
    <div className="">
      {isLoading ? "Loading..." : JSON.stringify(data)}
    </div>
  );
}

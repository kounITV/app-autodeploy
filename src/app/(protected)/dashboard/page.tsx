'use client'

import ProfileDashboard from "./container/profile"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">ໜ້າຫຼັກ</h2>
      </div>
      <ProfileDashboard />
    </div>
  )
}
"use client";
import { User, UserCheck, UserPlus, Users } from "lucide-react";

import { AggregationCard } from "@/components/containers/aggregation-card";

import { type IProfile } from "../../profile/type";
import { useAggregationChartProfile, useAggregationUser } from "../hook/useAggregation";
import { useProfileList } from "../hook/useProfile";
import { type IAggregationChartProfile } from "../type";
import { BarChartAggregationProfile } from "./chart";
import { NewProfile } from "./newProfile";

export default function ProfileDashboard() {
  const aggregation = useAggregationUser();
  const { result } = useAggregationChartProfile();
  const { result: profile } = useProfileList();
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <AggregationCard value={aggregation?.male || 0} title="ຜູ້ຊາຍ" icon={<UserPlus color="blue" />} />
        <AggregationCard value={aggregation?.female || 0} title="ຜູ້ຍິງ" icon={<User />} />
        <AggregationCard value={aggregation?.total || 0} title="ຍອດລວມ" icon={<Users color="purple" />} />
        <AggregationCard value={aggregation?.newProfilesCount || 0} title="ໃຫມ່ໃນທີດນີ້" icon={<UserCheck color="yellow" />} />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7 mt-4'>
        <BarChartAggregationProfile data={result as unknown as IAggregationChartProfile[]} />
        <NewProfile profile={profile as unknown as IProfile[]} />
      </div>
    </>
  );
}

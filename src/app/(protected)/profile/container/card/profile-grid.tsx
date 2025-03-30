"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type IProfile } from "../../type";
import { ProfileCard } from "./profile-card";

export default function ProfileGrid({ data, renewable }: { renewable?: boolean, data: IProfile[] }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState(data);
  const [profileToDelete, setProfileToDelete] = useState<number | null>(null);
  const handleEdit = (profile: number) => {
    router.push(`/application/create/${profile}/RENEW`);
  };
  const handleDelete = (profile: number) => {
    setProfileToDelete(profile);
  };
  const handleApplication = (profile: number) => {
    router.push(`/application/create/${profile}/RENEW`);
  };
  const confirmDelete = () => {
    if (profileToDelete) {
      setProfiles(profiles.filter((p) => p.identityNumber));
      setProfileToDelete(null);
    }
  };

  return (
    <div className="">
      {data?.map((profile) => (
        <ProfileCard
          key={profile.identityNumber}
          profile={profile}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApplication={handleApplication}
          renewable={renewable}
        />
      ))}
      <AlertDialog open={!!profileToDelete} onOpenChange={() => { setProfileToDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the profile of{" "}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


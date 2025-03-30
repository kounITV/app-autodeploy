"use client";

import ApplicationForm from "../../container/form/form";
import { useApplicationForm } from "../../hook/useForm";

export default function ApplicationCreate({ params }: { params: { profileIdApplicationType: string[] } }) {
  const [profileId, ApplicationType] = params.profileIdApplicationType;
  const NewProfileId = Number(profileId);
  const { form, onSubmit } = useApplicationForm({ profileId: NewProfileId, type: ApplicationType });
  return <ApplicationForm form={form} onSubmit={onSubmit} profileId={NewProfileId} />;
}

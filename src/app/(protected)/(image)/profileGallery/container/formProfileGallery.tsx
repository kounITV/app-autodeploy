"use client"

import { Form } from "@/components/containers/form"
import type React from "react"
import type { IProfile } from "src/app/(protected)/profile/type"
import type { IGallery } from "../../gallery/type"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ScanBarcodeIcon as BarcodeScan, FileText, Image, Search } from "lucide-react"
import { Button, Input } from "@/components/ui"
import { useList } from "@/hooks/useList"
import { useOne } from "@/hooks/useOne"

interface FormProfileGalleryProps {
  form: any
  onSubmit: any
}

const FormProfileGallery: React.FC<FormProfileGalleryProps> = ({ form, onSubmit }) => {
  const galleryId = form.watch("galleryId")
  const profileId = form.watch("profileId")
  const { result: profiles, filter: profileFilter } = useList<IProfile>({
    resource: "profile-barcode",
    enabled: true,
    initialFilters: { barcode: "" },
  })
  const { data: profile } = useOne<IProfile>({ resource: "profile", id: profileId });
  const { result: galleries, filter: galleryFilter, setEnabled } = useList<IGallery>({
    resource: "/gallery",
    enabled: false,
    initialFilters: { id: "" },
  })
  const { data: gallery } = useOne<IGallery>({ resource: "gallery", id: galleryId });
  const handleProfileFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    profileFilter.setFilters({ barcode: e.target.value })
  }
  const handleGalleryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const galleyId = e.target.value;
    if (galleyId !== "" || galleryId > 0) {
      galleryFilter.setFilters({ id: galleyId });
      setEnabled(true);
    }
  };
  const handleSelectGallery = (gallery: IGallery) => {
    form.setValue("galleryId", gallery.id)
  }
  const handleSelectPerson = (profile: IProfile) => {
    form.setValue("profileId", profile.id)
  }
  return (
    <div className="w-full max-w-2xl">
      <Form formInstance={form} onSubmit={onSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search by Barcode" className="pl-10" onChange={handleProfileFilterChange} />
                </div>
                <ul className="mt-4 space-y-2">
                  {profiles.map((profile) => (
                    <li key={profile.id} className="bg-secondary p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {profile.firstName} {profile.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{profile.phoneNumber}</p>
                      </div>
                      <Button onClick={() => handleSelectPerson(profile)} variant="outline" size="sm" type="button">
                        ເລື້ອກ
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">First Name</p>
                  <p className="text-lg font-semibold">{profile?.result?.firstName || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                  <p className="text-lg font-semibold">{profile?.result?.lastName || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <BarcodeScan className="h-4 w-4" /> Barcode
                  </p>
                  <Badge variant="outline" className="text-sm font-mono">
                    {profile?.result?.barcode || "—"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Application Number
                  </p>
                  <Badge variant="outline" className="text-sm font-mono">
                    {profile?.result?.applicationNumber || "—"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Separator className="my-4" />
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Gallery Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search by Barcode" className="pl-10" type={'number'} onChange={handleGalleryFilterChange} />
                </div>
                <ul className="mt-4 space-y-2">
                  {galleries.map((gallery) => (
                    <li key={gallery.id} className="bg-secondary p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {gallery.id} - {gallery.name}
                        </p>
                      </div>
                      <Button onClick={() => handleSelectGallery(gallery)} variant="outline" size="sm" type="button">
                        ເລື້ອກ
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Gallery Name</p>
                  <p className="text-lg font-semibold">{gallery?.result?.name || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Gallery ID
                  </p>
                  <Badge variant="outline" className="text-sm font-mono">
                    {gallery?.result?.id || "—"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  )
}

export default FormProfileGallery


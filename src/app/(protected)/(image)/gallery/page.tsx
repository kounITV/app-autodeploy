"use client"
import { useRouter } from 'next/navigation';
import {
  Barcode,
  Building2,
  Calendar,
  FileText,
  ImageIcon,
  MapPin,
  Phone,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CardPagination } from '@/components/containers/table/data-card-pagination';
import { CreateButton } from '@/components/containers/create-button';
import { DeleteDialog } from '@/lib/deleteDialogButton';
import { DownloadImageButton } from '@/lib/downloadImage';
import { FilterAndSearchGallery } from './container/cardFilter';
import { formatDate } from '@/lib/format-date';
import { ImageViewer } from '@/components/containers/image-viewer';
import { Separator } from '@/components/ui/separator';
import { TitleLabel } from '@/components/containers/headerLabel';
import { useList } from '@/hooks/useList';

import useGalleryList from './hook/useList';
import type { IGallery, IGalleryAggregation } from "./type"

import { AggregationCard } from '../../../components/containers/aggregation-card';

export default function GalleryListView() {
  const { result, updateSearch, filter, updatePagination, meta } = useGalleryList({})
  const { result: galleryAggregation } = useList<IGalleryAggregation>({ resource: "gallery-aggregation" })
  const galleryData: IGallery[] = result ?? []
  const router = useRouter()
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title="ຄຸ້ມຄອງຄັງຮູບພາບ" subtitle="ນີ້ແມ່ນລາຍການຂໍ້ມູນຄັງຮູບພາບ!" />
        <CreateButton resouce="gallery" title="ສ້າງຮູບພາບ" />
      </div>
      <div className="space-y-4">
        <div className=" gap-4 mb-8 w-full sm:w-1/2">
          <AggregationCard
            value={galleryAggregation?.[0]}
            icon={<ImageIcon />}
            description="ຈຳນວນຮູບທັງໝົດໃນຄັງຮູບ"
            title="ຄັງຮູບ"
            label="ຈຳນວນຮູບ"
          />
        </div>
        <FilterAndSearchGallery updateSearch={updateSearch} filter={filter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-2">
          {galleryData.map((item) => {
            const hasProfile = item.profileGallery && item.profileGallery.length > 0
            const pushTo = hasProfile ? `/profileGallery/edit/${item.id}` : `/profileGallery/create/${item.id}/0`
            const profile = hasProfile ? item.profileGallery[0].profile : null
            return (
              <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 ">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <ImageViewer
                    src={item.image || "/placeholder.svg"}
                    name={item.name}
                    className="object-right-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                    {item.no}
                  </div>
                  {hasProfile && <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">Linked</Badge>}
                </div>
                <CardContent className="pt-4  gap-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 truncate">{item.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{item?.office?.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{item?.office?.village}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate({ date: item?.createdAt })}</span>
                    </div>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      <span>
                        {profile?.firstName ?? "-"} {profile?.lastName ?? "-"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{profile?.phoneNumber ?? "-"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>ເລກທີ: {profile?.applicationNumber ?? "-"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Barcode className="h-4 w-4 mr-2" />
                      <span>{profile?.barcode ?? "-"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="w-full flex gap-x-2">
                    <DeleteDialog id={item.id} resources="gallery" className="w-10" />
                    <DownloadImageButton name={item.name} src={item.image} className="w-10" />
                    <Button variant="outline" size="sm" className="h-9 w-10" onClick={() => router.push(`/gallery/edit/${item.id}`)} > ແກ້ໄຂ</Button>
                    <Button variant="outline" size="sm" className="h-9 w-10" onClick={() => router.push(pushTo)} >Link</Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <CardPagination meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  )
}


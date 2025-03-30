import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { type IProfile } from "../../profile/type";
import { ImageViewer } from "@/components/containers/image-viewer";

export function NewProfile({ profile }: { profile: IProfile[] }) {
  return (
    <Card className='col-span-1 lg:col-span-3'>
      <CardHeader>
        <CardTitle>ຄົນຂໍອອກບັດໃໝ່</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {profile?.slice(0, 6)?.map((profile) => {
            return (
              <div key={profile.id} className='flex items-center gap-4'>
                <ImageViewer src={profile?.image} className=" h-9 w-9 rounded-full" />
                <div className='flex flex-1 flex-wrap items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none'>{profile?.firstName} {profile?.lastName}</p>
                    <p className='text-sm text-muted-foreground'> {profile?.ethnicity.name} - {profile?.nationality.code} </p>
                  </div>
                  <Badge variant={profile?.gender === "ຊາຍ" ? "outline" : "secondary"}>{`${profile.gender}`}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

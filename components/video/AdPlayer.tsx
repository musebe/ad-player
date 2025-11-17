import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VideoSurface } from './VideoSurface';
import { ControlsBar } from './ControlsBar';

export function AdPlayer() {
  return (
    <Card className='w-full max-w-3xl mx-auto bg-card text-card-foreground border-border shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg'>Ad supported video player</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          We will plug in Cloudinary playback and ad logic here.
        </p>
        <VideoSurface />
        <ControlsBar />
      </CardContent>
    </Card>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <Card className='w-full max-w-3xl mx-auto bg-slate-900/60 border-slate-800'>
      <CardHeader>
        <CardTitle className='text-lg'>Ad supported video player</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-slate-400'>
          We will plug in Cloudinary playback and ad logic here.
        </p>
        <div className='aspect-video w-full rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 text-sm'>
          Video placeholder
        </div>
        <div className='flex gap-2'>
          <Button size='sm'>Play</Button>
          <Button size='sm' variant='outline'>
            Skip ad
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

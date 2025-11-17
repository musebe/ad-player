import { Button } from '@/components/ui/button';

export function ControlsBar() {
  return (
    <div className='flex gap-2'>
      <Button size='sm'>Play</Button>
      <Button size='sm' variant='outline'>
        Skip ad
      </Button>
    </div>
  );
}

import { Button } from '@/components/ui/button';

type ControlsBarProps = {
  onPlay: () => void;
  onSkipAd: () => void;
  isPlayingAd: boolean;
};

export function ControlsBar({
  onPlay,
  onSkipAd,
  isPlayingAd,
}: ControlsBarProps) {
  return (
    <div className='flex gap-2'>
      <Button size='sm' onClick={onPlay}>
        Play
      </Button>
      <Button
        size='sm'
        variant='outline'
        onClick={onSkipAd}
        disabled={!isPlayingAd}
      >
        Skip ad
      </Button>
    </div>
  );
}

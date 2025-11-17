'use client';

import type { RefObject } from 'react';

type VideoSurfaceProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlayingAd: boolean;
};

export function VideoSurface({ videoRef, isPlayingAd }: VideoSurfaceProps) {
  return (
    <div className='aspect-video w-full rounded-xl bg-muted relative overflow-hidden'>
      <video ref={videoRef} className='h-full w-full object-cover' controls />
      <div className='pointer-events-none absolute left-3 top-3 rounded-full bg-background/70 px-2 py-0.5 text-xs text-muted-foreground'>
        {isPlayingAd ? 'Ad' : 'Main video'}
      </div>
    </div>
  );
}

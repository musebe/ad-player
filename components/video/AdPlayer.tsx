'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VideoSurface } from './VideoSurface';
import { ControlsBar } from './ControlsBar';
import { AdConfigPanel } from './AdConfigPanel';
import { AdPlayerHeader } from './AdPlayerHeader';
import { VideoPlaylist, PlaylistItem } from './VideoPlaylist';
import { getCloudinaryVideoUrl } from '@/lib/cloudinary';

const mainId = process.env.NEXT_PUBLIC_MAIN_VIDEO_ID ?? '';
const adId = process.env.NEXT_PUBLIC_AD_VIDEO_ID ?? '';

const mainUrlEnv = process.env.NEXT_PUBLIC_MAIN_VIDEO_URL ?? '';
const adUrlEnv = process.env.NEXT_PUBLIC_AD_VIDEO_URL ?? '';

const baseMainSrc = mainUrlEnv || getCloudinaryVideoUrl(mainId);
const adSrc = adUrlEnv || getCloudinaryVideoUrl(adId);

// Simple demo playlist, you can replace src values with other Cloudinary URLs
const contentPlaylist: PlaylistItem[] = baseMainSrc
  ? [
      {
        id: 'video-1',
        title: 'Main video 1',
        src: baseMainSrc,
      },
      {
        id: 'video-2',
        title: 'Main video 2',
        src: baseMainSrc,
      },
    ]
  : [];

export function AdPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [hasPlayedAd, setHasPlayedAd] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [adStartTime, setAdStartTime] = useState(10);
  const [adUrl, setAdUrl] = useState('https://cloudinary.com/');

  const currentItem = contentPlaylist[currentIndex];
  const currentMainSrc = currentItem?.src ?? '';

  useEffect(() => {
    console.log('currentMainSrc:', currentMainSrc);
    console.log('adSrc:', adSrc);
  }, [currentMainSrc]);

  // Swap source when we enter or leave ad mode or change video
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    const src = isPlayingAd ? adSrc : currentMainSrc;
    if (!src) {
      console.warn('Missing src for mode', { isPlayingAd, currentIndex });
      return;
    }

    console.log('Switching src to', src, 'isPlayingAd:', isPlayingAd);

    currentVideo.src = src;
    currentVideo.currentTime = isPlayingAd ? 0 : resumeTime;
    currentVideo.load();
    currentVideo.play().catch(() => {
      // Autoplay might be blocked
    });
  }, [isPlayingAd, resumeTime, currentIndex, currentMainSrc]);

  // Time and ended events
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    const video = currentVideo;

    function handleTimeUpdate() {
      if (!currentMainSrc) return;
      if (isPlayingAd || hasPlayedAd) return;

      if (video.currentTime >= adStartTime) {
        console.log('Trigger ad at time', video.currentTime);
        setResumeTime(video.currentTime);
        setIsPlayingAd(true);
        setHasPlayedAd(true);
      }
    }

    function handleEnded() {
      // If ad finished, go back to content at same index
      if (isPlayingAd) {
        console.log('Ad ended, return to main');
        setIsPlayingAd(false);
        return;
      }

      // Content finished, go to next playlist item
      setHasPlayedAd(false);
      setResumeTime(0);
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= contentPlaylist.length) {
          console.log('Playlist ended');
          return prev;
        }
        console.log('Move to next video index', next);
        return next;
      });
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isPlayingAd, hasPlayedAd, adStartTime, currentMainSrc]);

  function handlePlay() {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    if (!currentVideo.src) {
      if (!currentMainSrc) return;
      currentVideo.src = currentMainSrc;
      currentVideo.load();
    }
    currentVideo.play();
  }

  function handleSkipAd() {
    if (!isPlayingAd) return;
    setIsPlayingAd(false);
  }

  function handleOpenAd() {
    if (!adUrl) return;
    window.open(adUrl, '_blank');
  }

  // Apply settings: reset ad state and restart current main video
  function handleApplySettings() {
    setHasPlayedAd(false);
    setIsPlayingAd(false);
    setResumeTime(0);

    const currentVideo = videoRef.current;
    if (!currentVideo || !currentMainSrc) return;

    currentVideo.src = currentMainSrc;
    currentVideo.currentTime = 0;
    currentVideo.load();
    currentVideo.play().catch(() => {});

    console.log('Applied ad settings', { adStartTime, adUrl });
  }

  function handlePlayAdNow() {
    setIsPlayingAd(true);
  }

  function handleSelectPlaylistIndex(index: number) {
    if (index === currentIndex) return;
    setHasPlayedAd(false);
    setIsPlayingAd(false);
    setResumeTime(0);
    setCurrentIndex(index);
  }

  return (
    <Card className='w-full max-w-3xl mx-auto bg-card text-card-foreground border-border shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg flex items-center justify-between'>
          <AdPlayerHeader isPlayingAd={isPlayingAd} onVisitAd={handleOpenAd} />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          A playlist of Cloudinary videos with a mid-roll ad. Set when the ad
          plays and test the ad link.
        </p>

        <VideoSurface videoRef={videoRef} isPlayingAd={isPlayingAd} />

        <ControlsBar
          onPlay={handlePlay}
          onSkipAd={handleSkipAd}
          isPlayingAd={isPlayingAd}
        />

        {/* Clickable src links */}
        <div className='space-y-1 text-[10px] text-muted-foreground break-all'>
          <p>
            Main src:{' '}
            {currentMainSrc ? (
              <a
                href={currentMainSrc}
                target='_blank'
                rel='noreferrer'
                className='text-sky-500 underline'
              >
                {currentMainSrc}
              </a>
            ) : (
              'missing'
            )}
          </p>
          <p>
            Ad src:{' '}
            {adSrc ? (
              <a
                href={adSrc}
                target='_blank'
                rel='noreferrer'
                className='text-sky-500 underline'
              >
                {adSrc}
              </a>
            ) : (
              'missing'
            )}
          </p>
        </div>

        <AdConfigPanel
          adStartTime={adStartTime}
          adUrl={adUrl}
          onAdStartTimeChange={setAdStartTime}
          onAdUrlChange={setAdUrl}
          onApply={handleApplySettings}
          onPlayAdNow={handlePlayAdNow}
        />

        <VideoPlaylist
          items={contentPlaylist}
          currentIndex={currentIndex}
          onSelect={handleSelectPlaylistIndex}
        />
      </CardContent>
    </Card>
  );
}

'use client';

type AdPlayerHeaderProps = {
  isPlayingAd: boolean;
  onVisitAd: () => void;
};

export function AdPlayerHeader({
  isPlayingAd,
  onVisitAd,
}: AdPlayerHeaderProps) {
  return (
    <>
      <span>Ad supported video player</span>
      {isPlayingAd && (
        <button
          type='button'
          onClick={onVisitAd}
          className='text-xs text-sky-500 hover:underline'
        >
          Visit ad site
        </button>
      )}
    </>
  );
}

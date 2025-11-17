'use client';

type AdConfigPanelProps = {
  adStartTime: number;
  adUrl: string;
  onAdStartTimeChange: (value: number) => void;
  onAdUrlChange: (value: string) => void;
  onApply: () => void;
  onPlayAdNow: () => void;
};

export function AdConfigPanel({
  adStartTime,
  adUrl,
  onAdStartTimeChange,
  onAdUrlChange,
  onApply,
  onPlayAdNow,
}: AdConfigPanelProps) {
  return (
    <div className='space-y-2 pt-2 text-xs text-muted-foreground'>
      <div className='flex items-center gap-2'>
        <span>Ad start time (seconds):</span>
        <input
          type='number'
          className='w-20 rounded border bg-background px-2 py-1 text-xs'
          value={adStartTime}
          min={1}
          onChange={(e) => onAdStartTimeChange(Number(e.target.value) || 1)}
        />
      </div>

      <div className='flex items-center gap-2'>
        <span>Ad click URL:</span>
        <input
          type='text'
          className='flex-1 rounded border bg-background px-2 py-1 text-xs'
          value={adUrl}
          onChange={(e) => onAdUrlChange(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-2 pt-1'>
        <button
          type='button'
          className='rounded border border-slate-600 px-2 py-1 text-xs hover:bg-slate-800'
          onClick={onApply}
        >
          Apply settings
        </button>
        <button
          type='button'
          className='text-[11px] text-sky-500 underline'
          onClick={onPlayAdNow}
        >
          Play ad now
        </button>
      </div>
    </div>
  );
}

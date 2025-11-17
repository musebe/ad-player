'use client';

export type PlaylistItem = {
  id: string;
  title: string;
  src: string;
};

type VideoPlaylistProps = {
  items: PlaylistItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function VideoPlaylist({
  items,
  currentIndex,
  onSelect,
}: VideoPlaylistProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className='mt-4 rounded-lg border bg-muted/40 p-2 text-xs'>
      <p className='mb-2 font-medium text-foreground'>Playlist</p>
      <ul className='space-y-1'>
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <li key={item.id}>
              <button
                type='button'
                onClick={() => onSelect(index)}
                className={`flex w-full items-center justify-between rounded px-2 py-1 text-left ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <span className='truncate'>{item.title}</span>
                {isActive && (
                  <span className='ml-2 text-[10px] uppercase'>Now</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

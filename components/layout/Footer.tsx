export function Footer() {
  return (
    <footer className='border-t border-slate-200 dark:border-slate-800 bg-background/80'>
      <div className='container mx-auto flex h-12 items-center justify-between px-4 text-xs text-muted-foreground'>
        <p>&copy; {new Date().getFullYear()} AdPlayer</p>
        <p>Built with Next.js and Cloudinary</p>
      </div>
    </footer>
  );
}

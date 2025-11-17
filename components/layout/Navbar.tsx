'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className='border-b border-slate-200 dark:border-slate-800 bg-background/80 backdrop-blur'>
      <nav className='container mx-auto flex h-14 items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded bg-linear-to-br from-sky-500 to-violet-500' />
          <Link href='/' className='font-semibold tracking-tight'>
            AdPlayer
          </Link>
        </div>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <Link href='/' className='hover:text-foreground'>
            Home
          </Link>
          <Link href='/about' className='hover:text-foreground'>
            About
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

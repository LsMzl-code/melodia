'use client'
import React from 'react'
import { Separator } from '../ui/separator';
import AdminMobileNav from '../navigation/admin-mobile-nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';


const HeadingAdmin = ({ href, title }: { href?: string, title?: string }) => {
  //*** HOOKS ***//
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const lastSegment = pathSegments[pathSegments.length - 1];
  
  // Enlevement du premier segment
  pathSegments.shift()


  return (
    <>
      <div className='p-5 lg:p-7 flex items-center justify-between w-full'>
        {/* Breadcrumb */}
        <div className='flex items-end gap-2'>
          {pathSegments.map(segment => (
            <p className={cn(segment === lastSegment && segment !== pathSegments[0] ? 'text-foreground/50 text-base' : 'text-xl', 'uppercase font-light')} key={segment}>
              {segment === lastSegment && segment !== pathSegments[0] && (<span className='text-xl mr-1'>/</span>)}
              {segment}
            </p>
          ))}
          {pathSegments.length == 1 && href && title && (
            <Link href={href} title={title} className={cn(buttonVariants(), "w-fit h-6 bg-blue-primary hover:bg-blue-primary/80 hover:text-gray-50")}>Ajouter</Link>
          )}

        </div>

        <p className='hidden lg:block'>a voir</p>

        {/* Mobile Nav */}
        <div className='lg:hidden'>
          <AdminMobileNav />
        </div>

      </div>
      <Separator className='bg-foreground/10' />
    </>
  )
}

export default HeadingAdmin
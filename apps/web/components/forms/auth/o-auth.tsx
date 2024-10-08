import { Button } from '@/components/ui/button'
import Google from '@/public/assets/svg/google';
import React from 'react'



const OAuth = () => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <Button className='h-9 w-9 p-0 bg-[#313131] border border-foreground/5' title='Connexion avec Google'><Google /></Button>
      <Button className='h-9 w-9 p-0 bg-[#313131] border border-foreground/5' title='Connexion avec Google'><Google /></Button>
      <Button className='h-9 w-9 p-0 bg-[#313131] border border-foreground/5' title='Connexion avec Google'><Google /></Button>
    </div>
  )
}

export default OAuth
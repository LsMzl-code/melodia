import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'
import SignUpForm from './components/sign-up.form';
import Image from 'next/image';
import OAuth from '@/components/forms/auth/o-auth';
import { Music2Icon } from 'lucide-react';
import { getCurrentUser } from '@/src/server/data/users.query';


//***  METADATA ***//
export const metadata: Metadata = {
  title: "Inscription",
  description: ``,
};

const SignUpPage = async () => {
  //*** CURRENT USER ***//
  const currentUser = await getCurrentUser()
  if (currentUser) {
    return redirect('/')
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-5 h-screen'>

      {/* Left */}
      <div className='max-sm:max-w-xs mx-auto md:col-span-2 flex flex-col justify-center'>
        {/* Logo */}
        <Music2Icon className='mx-auto' />
        {/* Title */}
        <div className='flex flex-col items-center justify-center my-10'>
          <h1 className='text-3xl font-semibold'>Inscription</h1>
          <p className='text-sm text-foreground/50'>Inscrivez-vous à Mélodia</p>
        </div>

        {/* OAuth */}
        <OAuth />

        <p className='text-center my-5'>------------- OR --------------</p>

        <SignUpForm />

      </div>

      {/* Right */}
      <div className='hidden md:block h-full w-full col-span-3 relative'>
        <Image src={'/assets/img/crabe.jpg'} alt='Crabe' fill priority sizes='100%' className='object-cover' />

      </div>
    </div>
  )
}

export default SignUpPage
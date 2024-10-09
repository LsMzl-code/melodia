import React from 'react'
import SignInForm from './components/sign-in.form'
import { Music2Icon } from 'lucide-react'
import OAuth from '@/components/forms/auth/o-auth'
import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/src/server/data/users.query';


//***  METADATA ***//
export const metadata: Metadata = {
  title: "Connexion",
  description: `Page de connexion utilisateur.`,
};

const SignInPage = async () => {
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
          <h1 className='text-3xl font-semibold'>Connexion</h1>
          <p className='text-sm text-foreground/50'>Connectez-vous à votre compte</p>
        </div>

        {/* OAuth */}
        <OAuth />

        <p className='text-center my-5'>------------- OU --------------</p>

        <SignInForm />

      </div>

      {/* Right */}
      <div className='hidden md:block h-full w-full col-span-3 relative'>
        <Image src={'/assets/img/crabe.jpg'} alt='Crabe' fill priority sizes='100%' className='object-cover' />

      </div>
    </div>
  )
}

export default SignInPage
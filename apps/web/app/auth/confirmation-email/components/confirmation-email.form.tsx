'use client'
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon, Music2Icon } from 'lucide-react'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

const ConfirmationEmailForm = () => {
  //*** STATES ***//
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  //*** RECUPERATION DU TOKEN DE CONFIRMATION ***//
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  //** VERIFICATION DU TOKEN AU CHARGEMENT DE LA PAGE ***//
  const verifyToken = async () => {
    try {
      axios.get(`http://localhost:8000/auth/confirmation-email?token=${token}`)
        .then((res) => {
          setSuccess(`Votre email a été confirmé`)
        })
        .catch(err => {
          //! Token non reconnu ou confirmation déjà effectuée
          setError(`${err.response.data.message}`)
        })
    } catch (err) {
      setError(`Une erreur est survenue lors de la vérification du token`)
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token])

  return (
    <div className='border border-foreground/10 rounded-xl p-5 min-w-[320px]'>
      {/* Logo */}
      <Music2Icon className='mx-auto mb-3' />
      <p className='text-2xl font-semibold text-center'>Confirmation d'email</p>

      <div className='my-5 flex flex-col justify-center w-full'>

        {success ? (
          <div className='flex flex-col gap-3 w-full'>
            <p className='text-center text-green-500 border border-green-500 rounded-xl p-2'>{success}</p>
            <Link href={'/auth/connexion'} title='Connexion' className={cn(buttonVariants(), 'bg-blue-primary hover:bg-blue-primary/80 transition-colors flex items-center gap-1 group w-fit mx-auto')}>
              Connexion
              <ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>
        ) : error ? (
          <div className='flex flex-col gap-3 w-full'>
            <p className='text-center text-red-primary border border-red-primary rounded-xl p-2'>{error}</p>
            <Link href={'/'} title='Retour' className={cn(buttonVariants(), 'bg-blue-primary hover:bg-blue-primary/80 transition-colors flex items-center gap-1 group w-fit mx-auto')}>
              <ArrowLeftIcon className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
              Retour
            </Link>
          </div>
        ) : (
          <Loader2Icon className='animate-spin mx-auto' />
        )}


      </div>
    </div>
  )
}

export default ConfirmationEmailForm
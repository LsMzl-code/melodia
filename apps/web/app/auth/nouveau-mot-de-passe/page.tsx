
import { redirect } from "next/navigation"
import NewPasswordForm from "./components/new-password.form"
import Image from "next/image"
import { Music2Icon } from "lucide-react"
import { Metadata } from "next"
import { getCurrentUser } from "@/src/server/data/users.query"


//***  METADATA ***//
export const metadata: Metadata = {
  title: "Nouveau mot de passe",
  description: ``,
};

interface SearchParamsProps {
  searchParams: { token: string }
}

const NewPasswordPage = async ({ searchParams }: SearchParamsProps) => {
  //*** CURRENT USER ***//
  const currentUser = await getCurrentUser()
  if (currentUser) {
    return redirect('/')
  }

  //*** RECUPERATION DU TOKEN DE REINITIALISATION ***//
  const token = searchParams.token
  if (!token) {
    return redirect('/auth/connexion')
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-5 h-screen'>

      {/* Left */}
      <div className='max-sm:max-w-xs mx-auto md:col-span-2 flex flex-col justify-center'>
        {/* Logo */}
        <Music2Icon className='mx-auto' />
        {/* Title */}
        <div className='flex flex-col items-center justify-center my-10'>
          <h1 className='text-3xl font-semibold'>Nouveau mot de passe</h1>
          <p className='text-sm text-foreground/50'>Choisissez un nouveau mot de passe</p>
        </div>

        <NewPasswordForm />

      </div>

      {/* Right */}
      <div className='hidden md:block h-full w-full col-span-3 relative'>
        {/* //TODO: Ajouter une illustration spécifique pour la page de mot de passe oublié */}
        <Image src={'/assets/img/crabe.jpg'} alt='Crabe' fill priority sizes='100%' className='object-cover' />
      </div>
    </div>
  )
}

export default NewPasswordPage
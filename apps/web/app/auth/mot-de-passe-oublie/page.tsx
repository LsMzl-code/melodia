import { getCurrentUser } from "@/lib/auth";
import { Music2Icon } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "./components/forgot-password.form";
import Image from "next/image";

//***  METADATA ***//
export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description: ``,
};



const ForgotPasswordPage = async () => {
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
          <h1 className='text-3xl font-semibold'>Mot de passe oublié</h1>
          <p className='text-sm text-foreground/50'>Demande de réinitialisation de mot de passe</p>
        </div>


        <ForgotPasswordForm />

      </div>

      {/* Right */}
      <div className='hidden md:block h-full w-full col-span-3 relative'>
        {/* //TODO: Ajouter une illustration spécifique pour la page de mot de passe oublié */}
        <Image src={'/assets/img/crabe.jpg'} alt='Crabe' fill priority sizes='100%' className='object-cover' />
      </div>
    </div>
  )
}

export default ForgotPasswordPage
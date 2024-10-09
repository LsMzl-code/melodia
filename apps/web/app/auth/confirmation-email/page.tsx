
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ConfirmationEmailForm from "./components/confirmation-email.form";
import { getCurrentUser } from "@/src/server/data/users.query";

//***  METADATA ***//
export const metadata: Metadata = {
  title: "Confirmation d'email",
  description: ``,
};

interface SearchParamsProps {
  searchParams: { token: string }
}


const EmailConfirmationPage = async ({ searchParams }: SearchParamsProps) => {
  //*** CURRENT USER ***//
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return redirect('/')
  }

  //*** RECUPERATION DU TOKEN DE CONFIRMATION ***//
  const token = searchParams.token
  if (!token) {
    return redirect('/')
  }


  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <ConfirmationEmailForm />
    </div>
  )
}

export default EmailConfirmationPage
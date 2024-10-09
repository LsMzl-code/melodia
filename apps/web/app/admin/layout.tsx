import AdminNav from "@/components/navigation/admin-nav";
import useUserRole from "@/hooks/use-user-role";
import { getCurrentUser } from "@/src/server/data/users.query";

import { redirect } from "next/navigation";

export default async function AdminLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   //*** VERIFICATION DU ROLE DE L'UTILISATEUR ***//
   const role = await useUserRole()
   if (!role || role !== 'ADMIN') {
      redirect("/");
   }

   //*** CURRENT USER ***//
   const currentUser = await getCurrentUser()
   const formattedUserData = {
      username: currentUser?.username,
      role: role,
      // avatar: currentUser?.avatar
   }


   return (
      <div className="flex max-xl:max-h-screen">
         {/* Nav */}
         <AdminNav user={formattedUserData} />
         <main className="w-full">{children}</main>
      </div>
   );
}

import MainNav from "@/components/navigation/main-nav";
import MainUserUserPopover from "@/components/navigation/main-user-menu-popover";
import MobileNav from "@/components/navigation/mobile-nav";
import MzlSvg from "@/public/assets/svg/mzl";
import { getCurrentUser } from "@/src/server/data/users.query";
import Link from "next/link";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //*** UTILISATEUR CONNECTE */
  const currentUser = await getCurrentUser();

  return (
    <div className="container mt-5">
      <div className="flex items-center justify-between relative">
        <Link href={'/'} className="text-xl font-medium flex items-center" title="Accueil">
          <span className="h-8 w-8 rounded-lg relative bg-slate-700 lg:hidden">
            <MzlSvg className="h-8 w-8" />
          </span>
        </Link>

        {/* Main navigation screen */}
        <MainNav />

        {/* Menu utilisateur screen */}
        <MainUserUserPopover user={currentUser} />

        <Link href={'/'} title="Accueil" className="h-10 w-10 rounded-lg bg-slate-700 hidden lg:block absolute top-0 left-[50%] translate-x-[-50%]">
          <MzlSvg className="h-10 w-10" />
        </Link>


        {/* Menu mobile */}
        <MobileNav user={currentUser} />
      </div>
      <div>
        {children}
      </div>

      {/* {currentUser && <p>Bonjour {currentUser.username}</p>} */}

    </div>
  );
}
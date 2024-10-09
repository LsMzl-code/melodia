import MobileNav from "@/components/navigation/mobile-nav";
import { getCurrentUser } from "@/src/server/data/users.query";



const HomePage = async () => {
  //*** UTILISATEUR CONNECTE */
  const currentUser = await getCurrentUser();

  console.log('currentUser', currentUser)
  
  return (
    <div className="container mt-5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">melodia</p>
        <MobileNav user={currentUser} />
      </div>

      {currentUser && <p>Bonjour {currentUser.username}</p>}

    </div>
  )
}

export default HomePage

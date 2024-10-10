import IconButton from "@/components/common/icon-button"
import TopNavMobile from "@/components/navigation/top-nav-mobile"
import { Button } from "@/components/ui/button"
import EditProfileDialog from "@/app/(root)/profil/[username]/components/forms/edit-profile/edit-profile-dialog"
import { getCurrentUser } from "@/src/server/data/users.query"
import { ChevronDown, KeyboardMusicIcon, MusicIcon, Star } from "lucide-react"
import AvatarMenuPopover from "./components/avatar-menu-popover"

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  //*** UTILISATEUR CONNECTE **/
  const currentUser = await getCurrentUser();

  //*** UTILISATEUR NON CONNECTE OU NON PROPRIETAIRE DU PROFIL **/
  if (currentUser?.username != params.username) {
    return <p>404</p>
  }

  //*** FORMATTED DATAS ***//
  const formattedInstruments = currentUser?.instrument?.split(',')

  return (
    <main className="mt-5 container">

      <TopNavMobile />

      <div className="w-full items-center flex justify-between my-10">
        {/* Heading */}
        <div className="flex items-center gap-2">
          {/* Menu de photo de profil utilisateur */}
          <AvatarMenuPopover currentAvatar={currentUser?.currentAvatar} avatars={currentUser?.avatar.map(avatar => ({ imgUrl: avatar.imgUrl }))} />

          {/* Informations de l'utilisateur */}
          <div>
            <p className="text-2xl font-semibold">{currentUser?.username}</p>
            {/* Instruments */}
            <span className="flex items-center gap-1">
              {currentUser?.instrument == '' && (
                <p className="text-sm capitalize">
                  Non renseigné
                </p>
              )}
              {formattedInstruments?.map((instrument) => (
                <p key={instrument} className="text-sm capitalize">
                  {instrument == 'guitare' && 'Guitariste'}
                  {instrument == 'piano' && 'Pianiste'}
                  {instrument == 'basse' && 'Bassiste'}
                  {instrument == 'chant' && 'Chanteur'}
                  {formattedInstruments.length > 1 && formattedInstruments.indexOf(instrument) < formattedInstruments.length - 1 && ', '}
                </p>
              ))}
            </span>
          </div>

        </div>

        {/* Menu de modification du profil */}
        <EditProfileDialog user={currentUser} />

      </div>

      {/* Content */}
      <section className="w-full h-full mt-10">
        {/* Favoris etc... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Favoris */}
          <div className="w-full rounded-lg bg-[#313131] p-2 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-2">
              <Button className='bg-[#191919] h-9 w-9 p-0'><KeyboardMusicIcon /></Button>
              <div className="flex flex-col items-start justify-start">
                <p className="font-medium leading-none">Accords favoris</p>
                <p className="text-xs">Consulter mes accords favoris</p>
              </div>
            </div>

            {/* Right */}
            <IconButton icon={<ChevronDown className="h-5 w-5" />} title='Afficher les notes' />

          </div>

          <div className="w-full rounded-lg bg-[#313131] p-2 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-2">
              <Button className='bg-[#191919] h-9 w-9 p-0'><MusicIcon /></Button>
              <div className="flex flex-col items-start justify-start">
                <p className="font-medium leading-none">Gammes favorites</p>
                <p className="text-xs">Consulter mes gammes favorites</p>
              </div>
            </div>

            {/* Right */}
            <IconButton icon={<ChevronDown className="h-5 w-5" />} title='Afficher les notes' />

          </div>

          <div className="w-full rounded-lg bg-[#313131] p-2 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-2">
              <Button className='bg-[#191919] h-9 w-9 p-0'><Star /></Button>
              <div className="flex flex-col items-start justify-start">
                <p className="font-medium leading-none">Mes favoris</p>
                <p className="text-xs">Consulter mes favoris</p>
              </div>
            </div>

            {/* Right */}
            <IconButton icon={<ChevronDown className="h-5 w-5" />} title='Afficher les notes' />

          </div>

        </div>

      </section>


    </main>
  )
}

export default ProfilePage
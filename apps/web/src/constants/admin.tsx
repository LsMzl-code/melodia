import { ArchiveIcon, ChevronsLeftRightEllipsisIcon, LayoutDashboardIcon, LibraryIcon, LinkIcon, Music3Icon, MusicIcon, PianoIcon, PowerIcon, SettingsIcon, TagsIcon, ThermometerIcon, Users2Icon, UsersIcon } from "lucide-react";

export const AdminRoutes: { label: string, href: string, icon: React.ReactNode, title: string }[] = [
  {
    label: 'dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboardIcon size={14}/>,
    title: 'Dashboard'
  },
  {
    label: 'accords',
    href: '/admin/accords',
    icon: <PianoIcon size={14}/>,
    title: 'Accords'
  },
  {
    label: 'degrés',
    href: '/admin/degres',
    icon: <ThermometerIcon size={14}/>,
    title: 'Degrés'
  },
  {
    label: 'familles',
    href: '/admin/familles',
    icon: <LibraryIcon size={14}/>,
    title: 'Familles'
  },
  {
    label: 'gammes',
    href: '/admin/gammes',
    icon: <MusicIcon size={14}/>,
    title: 'Gammes'
  },
  {
    label: 'intervalles',
    href: '/admin/intervalles',
    icon: <ChevronsLeftRightEllipsisIcon size={14}/>,
    title: 'Intervalles'
  },
  {
    label: 'noms',
    href: '/admin/noms',
    icon: <TagsIcon size={14}/>,
    title: 'Noms'
  },
  {
    label: 'notes',
    href: '/admin/notes',
    icon: <Music3Icon size={14}/>,
    title: 'Notes'
  },
  {
    label: 'progressions',
    href: '/admin/progressions',
    icon: <LinkIcon size={14}/>,
    title: 'Progressions'
  },
  {
    label: 'tonalites',
    href: '/admin/tonalites',
    icon: <ArchiveIcon size={14}/>,
    title: 'Tonalités'
  },
  
  {
    label: 'utilisateurs',
    href: '/admin/utilisateurs',
    icon: <Users2Icon size={14}/>,
    title: 'Utilisateurs'
  },
]

export const SettingLinks: { label: string, href: string, icon: React.ReactNode, title: string }[] = [
  {
    label: 'options',
    href: '/admin/options',
    icon: <SettingsIcon size={14}/>,
    title: 'Options'
  },
  {
    label: 'déconnexion',
    href: '/admin/options',
    icon: <PowerIcon size={14}/>,
    title: 'Déconnexion'
  },
]
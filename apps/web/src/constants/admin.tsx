import { ArchiveIcon, ChevronsLeftRightEllipsisIcon, LayoutDashboardIcon, LinkIcon, Music3Icon, MusicIcon, PianoIcon, PowerIcon, SettingsIcon, ThermometerIcon, Users2Icon, UsersIcon } from "lucide-react";

export const AdminRoutes: { label: string, href: string, icon: React.ReactNode, title: string }[] = [
  {
    label: 'dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboardIcon size={14}/>,
    title: 'Dashboard'
  },
  {
    label: 'notes',
    href: '/admin/notes',
    icon: <Music3Icon size={14}/>,
    title: 'Notes'
  },
  {
    label: 'intervalles',
    href: '/admin/intervalles',
    icon: <ChevronsLeftRightEllipsisIcon size={14}/>,
    title: 'Intervalles'
  },
  {
    label: 'gammes',
    href: '/admin/gammes',
    icon: <MusicIcon size={14}/>,
    title: 'Gammes'
  },
  {
    label: 'accords',
    href: '/admin/accords',
    icon: <PianoIcon size={14}/>,
    title: 'Accords'
  },
  {
    label: 'progressions',
    href: '/admin/progressions',
    icon: <LinkIcon size={14}/>,
    title: 'Progressions'
  },
  {
    label: 'degrés',
    href: '/admin/degres',
    icon: <ThermometerIcon size={14}/>,
    title: 'Degrés'
  },
  {
    label: 'divers',
    href: '/admin/divers',
    icon: <ArchiveIcon size={14}/>,
    title: 'Divers'
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
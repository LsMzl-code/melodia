import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { chords, scales, tonalities } from "@/src/constants/navigation";
import Link from "next/link";



const MainNav = () => {
  return (
    <NavigationMenu className="hidden lg:block mr-auto">
      <NavigationMenuList>
        {/* Gammes */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Gammes</NavigationMenuTrigger>
          <NavigationMenuContent className="border border-foreground/10">
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {scales.map((item) => (
                <MainNavItem title={item.title} description={item.description} href={item.href} key={item.title}/>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Accords */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Accords</NavigationMenuTrigger>
          <NavigationMenuContent className="border border-foreground/10">
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {chords.map((item) => (
                <MainNavItem title={item.title} description={item.description} href={item.href} key={item.title}/>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Tonalités */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tonalités</NavigationMenuTrigger>
          <NavigationMenuContent className="border border-foreground/10">
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tonalities.map((item) => (
                <MainNavItem title={item.title} description={item.description} href={item.href} key={item.title}/>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const MainNavItem = ({ title, href, description }: { title: string; href: string; description: string; }) => {
  return (
    <Link title={title} href={href} className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-[#2A2B34] hover:text-accent-foreground focus:bg-foreground focus:text-accent-foreground" key={title}>
      <p className="text-sm font-medium leading-none text-gray-50">{title}</p>
      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
        {description}
      </p>
    </Link>
  )
}

export default MainNav
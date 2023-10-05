import Profile from "./Profile"
import SideNavigation from "./SideNavigation"

const Sidebar = () => {
  return (
    <div className="w-[280px] p-3 -translate-x-full transform bg-white transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
      <Profile />
      <SideNavigation />
    </div>
  )
}

export default Sidebar
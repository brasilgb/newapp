import Profile from "./Profile"
import SideNavigation from "./SideNavigation"

const Sidebar = () => {
  return (
    <div className="w-[280px] p-3 -translate-x-full transform bg-blue-dark transition-transform duration-150 ease-in md:translate-x-0">
      <Profile />
      <SideNavigation />
    </div>
  )
}

export default Sidebar
import LogoutBtn from "@/components/buttons/LogoutBtn"

const Header = () => {
  return (
    <header className="flex items-center justify-between h-[65px] bg-white shadow-sm">
      <div>nav</div>
      <LogoutBtn />
    </header>
  )
}

export default Header
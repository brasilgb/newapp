import UserDropDown from '../UserDropDown';

const Header = () => {
    return (
        <header className="flex items-center justify-between h-[65px] bg-white shadow-sm pr-4">
            <div></div>
            <UserDropDown />
        </header>
    );
};

export default Header;

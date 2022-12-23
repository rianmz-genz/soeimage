const Header = ({ children }) => {
    return (
        <header className="w-full fixed left-0 top-0  flex justify-center items-center  z-20">
            <nav className="w-full flex gap-3 items-center shadow-2xl max-w-[1024px] shadow-gray-900/[.05] rounded-md p-4  bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">{children}</nav>
        </header>
    )
}

export default Header
import logo from '../resources/logo.png'

export function TopBar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full h-12 bg-white border-b border-gray-200 flex items-center justify-center gap-2 px-4 shadow-md">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center gap-2 no-underline text-inherit hover:opacity-80 transition-opacity"
            >
                <img src={logo} alt="Logo Pokédex" className="h-8 w-auto object-contain" />
            </a>
        </header>
    )
}
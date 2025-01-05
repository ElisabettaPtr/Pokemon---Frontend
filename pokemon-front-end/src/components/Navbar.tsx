import { AlignLeft, CircleUserRound, LogOut } from "lucide-react"; 
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const profileMenuRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

const getAuthToken = () => {
        return localStorage.getItem("token");
    };

    const getUserIdFromToken = () => {
        const token = getAuthToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                return decoded.sub;
            } catch (error) {
                console.error("Errore nel decodificare il token", error);
                return null;
            }
        }
        return null;
    };

    const idUser = getUserIdFromToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Determina le voci del menu in base alla pagina corrente
    const getMenuItems = () => {
        switch (true) {
            case location.pathname.startsWith("/pokemon-detail/") || location.pathname.startsWith("/profile/"):
                return (
                    <>
                        <li>
                            <Link to="/" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Pokemon
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-pokedex" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Pokedex
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-wishlist" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Wishlist
                            </Link>
                        </li>
                    </>
                );
            case location.pathname === "/":
                return (
                    <>
                        <li>
                            <Link to="/my-pokedex" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Pokedex
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-wishlist" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Wishlist
                            </Link>
                        </li>
                    </>
                );
            case location.pathname === "/my-pokedex":
                return (
                    <>
                        <li>
                            <Link to="/" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Pokemon
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-wishlist" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Wishlist
                            </Link>
                        </li>
                    </>
                );
            case location.pathname === "/my-wishlist":
                return (
                    <>
                        <li>
                            <Link to="/" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Pokemon
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-pokedex" className="hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                Pokedex
                            </Link>
                        </li>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="navbar bg-red-600 text-white px-4 shadow-lg relative flex items-center justify-between">
            {/* Menu a tendina */}
            <div className="flex-none relative" ref={menuRef}>
                <button
                    onClick={toggleMenu}
                    className="btn btn-square btn-ghost text-white flex items-center"
                >
                    <AlignLeft />
                </button>
                {menuOpen && (
                    <div className="absolute top-16 left-0 w-56 bg-white text-black rounded shadow-lg z-10">
                        <ul className="menu menu-compact p-4">{getMenuItems()}</ul>
                    </div>
                )}
            </div>

            {/* Logo Pokémon */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src="images/pokemon-logo.png" alt="pokémon logo" className="h-12" />
            </div>

            {/* Barra di ricerca e icona account */}
            <div className="lg:flex items-center space-x-4">
                <div className="relative" ref={profileMenuRef}>
                    <button
                        onClick={toggleProfileMenu}
                        className="btn btn-square btn-ghost text-white"
                    >
                        <CircleUserRound className="size-8" />
                    </button>

                    {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                            <ul className="menu menu-compact p-2">
                                <li>
                                    <Link to={`/profile/${idUser}`} className="hover:bg-gray-200 flex items-center space-x-2" onClick={() => setProfileMenuOpen(false)}>
                                        <CircleUserRound />
                                        <span >Profilo</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="hover:bg-gray-200 flex items-center space-x-2 w-full"
                                    >
                                        <LogOut />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import { AlignLeft, CircleUserRound, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    // Aggiungi i tipi per i riferimenti
    const menuRef = useRef<HTMLDivElement | null>(null); 
    const profileMenuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleLogout = () => {
        // Aggiungi la logica di logout
        localStorage.removeItem("token"); // Rimuove il token
        window.location.href = "/login"; // Rende il login obbligatorio
    };

    // Funzione per chiudere i menu quando si clicca fuori
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verifica se il click è fuori dal menu laterale
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false); // Chiude il menu laterale
            }
            // Verifica se il click è fuori dal menu del profilo
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false); // Chiude il menu profilo
            }
        };

        // Aggiungi l'event listener al click
        document.addEventListener("click", handleClickOutside);

        // Pulisci l'event listener quando il componente viene smontato
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
                        <ul className="menu menu-compact p-4">
                            <li>
                                <Link to="/my-pokedex" className="hover:bg-gray-200">
                                    Pokedex
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-wishlist" className="hover:bg-gray-200">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Scritta Pokémon centrata */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src="images/pokemon-logo.png" alt="pokémon logo" className="h-12"/>
            </div>

            {/* Barra di ricerca e icona account */}
            <div className="hidden lg:flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Cerca..."
                    className="input input-bordered w-48 h-8 rounded-full text-black placeholder-gray-500 text-sm"
                />
                <div className="relative" ref={profileMenuRef}>
                    <button
                        onClick={toggleProfileMenu}
                        className="btn btn-square btn-ghost text-white"
                    >
                        <CircleUserRound />
                    </button>

                    {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                            <ul className="menu menu-compact p-2">
                                <li>
                                    <Link to="/profile" className="hover:bg-gray-200 flex items-center space-x-2">
                                        <CircleUserRound />
                                        <span>Profilo</span>
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

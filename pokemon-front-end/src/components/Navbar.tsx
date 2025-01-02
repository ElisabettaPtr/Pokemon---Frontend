import { AlignLeft, CircleUserRound } from "lucide-react";

const Navbar = () => {
    return (
        <div className="navbar bg-red-600 text-white">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <AlignLeft />
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Pokémon</a>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <CircleUserRound />
                </button>
            </div>
        </div>
    );
};

export default Navbar;

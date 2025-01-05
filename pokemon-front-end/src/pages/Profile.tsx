import { IUser } from "@/interfaces/IUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { idUser } = useParams<{ idUser: string }>();
    const [userData, setUserData] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!idUser) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Accesso non autorizzato.");

                const response = await fetch(
                    `http://localhost:8000/api/v1/users/${idUser}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data: IUser = await response.json();
                    setUserData(data);
                } else {
                    console.error("Errore nel recupero dei dati dell'utente.");
                }
            } catch (error) {
                console.error("Errore nella fetch:", error);
            }
        };

        fetchUserData();
    }, [idUser]);

    if (!userData) {
        return <p className="text-center text-xl text-gray-600">Caricamento in corso...</p>;
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    const formattedDate = formatDate(userData.dateOfBirth);

    const getInitials = (firstName: string, lastName: string) => {
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    };
    
    const initials = getInitials(userData.firstName, userData.lastName);

    return (
        <>
            <h1 className="text-4xl text-center p-10" style={{
                        fontFamily: "Pokemon Solid, sans-serif",
                        fontWeight: "bolder",
                        color: "#ffde00",
                        textShadow:
                            "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                        marginBottom: "0.5rem",
                    }}>
                    PROFILO UTENTE
            </h1>
            
            <div className="max-w-4xl mx-auto">
                <div className="flex bg-gray-200 p-10 rounded-xl shadow-lg text-black gap-20">
                    <div className="hidden md:block">
                        <div className="avatar placeholder">
                            <div className="bg-gradient-to-b from-yellow-400 via-red-600 to-blue-700 border-2 border-white text-neutral-content size-36 rounded-full">
                                <span className="text-3xl">{initials}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-6">
                            <strong className="font-semibold text-blue-700 text-lg">Nome:</strong>
                            <p className="text-xl">{userData.firstName} {userData.lastName}</p>
                        </div>
                        <div className="mb-6">
                            <strong className="font-semibold text-blue-700 text-lg">Email:</strong>
                            <p className="text-xl">{userData.email}</p>
                        </div>
                        <div className="mb-6">
                            <strong className="font-semibold text-blue-700 text-lg">Data di Nascita:</strong>
                            <p className="text-xl">{formattedDate}</p>
                        </div>
                        <div className="mb-6">
                            <strong className="font-semibold text-blue-700 text-lg">Username:</strong>
                            <p className="text-xl">{userData.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

        
    );
};

export default Profile;

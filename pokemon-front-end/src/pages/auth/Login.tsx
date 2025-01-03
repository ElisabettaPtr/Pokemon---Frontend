import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const schema = z.object({
    username: z.string().nonempty("Il nome utente è obbligatorio."),
    password: z.string().nonempty("La password è obbligatoria."),
    });

type FormData = z.infer<typeof schema>;

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate(); // Inizializza useNavigate

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
        const response = await fetch("http://localhost:8000/api/v1/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            setErrorMessage(responseData || "Credenziali non valide.");
        } else {
            localStorage.setItem("token", responseData.token); // Salva il token nel localStorage
            navigate("/"); // Reindirizza alla home
        }
        } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Si è verificato un errore durante il login.");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 via-black to-white">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-2xl rounded-lg">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Login</h2>
            {errorMessage && (
            <div className="text-red-500 text-center mb-4">
                {errorMessage}
            </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
                <label className="label">
                <span className="label-text">Nome Utente</span>
                </label>
                <input
                type="text"
                {...register("username")}
                placeholder="Inserisci il tuo nome utente"
                className="input input-bordered w-full"
                />
                {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
                )}
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Password</span>
                </label>
                <input
                type="password"
                {...register("password")}
                placeholder="Inserisci la tua password"
                className="input input-bordered w-full"
                />
                {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
            </div>
            <div className="form-control">
                <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
                >
                {isLoading ? "Accesso in corso..." : "Accedi"}
                </button>
            </div>
            </form>
            <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
                Non hai un account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                Registrati
                </a>
            </p>
            </div>
        </div>
        </div>
    );
}

export default Login;

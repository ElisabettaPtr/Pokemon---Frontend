import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from 'react';

const schema = z.object({
  firstName: z.string().min(2, "Il nome deve contenere almeno 2 caratteri."),
  lastName: z.string().min(2, "Il cognome deve contenere almeno 2 caratteri."),
  dateOfBirth: z.string().refine((date) => {
    return !isNaN(Date.parse(date)) && /^\d{4}-\d{2}-\d{2}$/.test(date);
  }, {
    message: "La data di nascita deve essere valida nel formato 'yyyy-MM-dd'.",
  }),
  username: z.string().min(3, "Il nome utente deve contenere almeno 3 caratteri."),
  email: z.string().email("Inserisci un'email valida."),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri."),
  confirmPassword: z.string().min(6, "La password deve avere almeno 6 caratteri."),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Le password non corrispondono.",
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per la modale
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Stato per il messaggio di successo
  const [isLoading, setIsLoading] = useState(false); // Stato di caricamento

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true); // Avvia il loading
    const { confirmPassword, ...registrationData } = data;

    const createdAt = new Date().toISOString();
    const formattedCreatedAt = createdAt
      .replace('T', ' ')
      .slice(0, 23)
      .padEnd(25, '0');

    const finalData = {
      ...registrationData,
      isActive: true,
      createdAt: formattedCreatedAt,
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.message === "Email already in use") {
          setError("email", { message: "L'email è già in uso." });
        } else if (responseData.message === "Username already in use") {
          setError("username", { message: "Il nome utente è già in uso." });
        } else {
          alert(responseData.message);
        }
      } else {
        setSuccessMessage("Registrazione avvenuta con successo!"); // Impostiamo il messaggio di successo
        setIsModalOpen(true); // Apri la modale al successo
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Si è verificato un errore durante la registrazione.");
    } finally {
      setIsLoading(false); // Ferma il loading
    }
  };

  const handleRedirect = () => {
    window.location.href = "/login";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 relative">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white shadow-2xl rounded-lg">
        {isModalOpen && (
          // Modale di successo
          <div className="modal modal-open">
            <div className="modal-box relative bg-green-100 border-l-4 border-green-500 text-green-700">
              <h2 className="text-2xl font-semibold mb-4">Registrazione completata</h2>
              <p className="text-lg mb-4">{successMessage}</p>

              <div className="flex justify-end space-x-4">
                {/* Pulsante Vai al login */}
                <button 
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out"
                  onClick={handleRedirect}
                >
                  Vai al login
                </button>

                {/* Pulsante Chiudi */}
                <button 
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
                  onClick={handleCloseModal} // chiusura della modale
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form di registrazione */}
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6">Registrazione Utente</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
            <div className="flex-1 space-y-4">
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="Inserisci il tuo nome"
                  className="input input-bordered input-primary w-full"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Cognome</span>
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Inserisci il tuo cognome"
                  className="input input-bordered input-primary w-full"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Data di Nascita</span>
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="input input-bordered input-primary w-full"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Nome Utente</span>
                </label>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Inserisci il tuo nome utente"
                  className="input input-bordered input-primary w-full"
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">{errors.username.message}</span>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Inserisci la tua email"
                  className="input input-bordered input-primary w-full"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Inserisci la tua password"
                  className="input input-bordered input-primary w-full"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label text-yellow-600">
                  <span className="label-text">Conferma Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Conferma la tua password"
                  className="input input-bordered input-primary w-full"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="form-control">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {isLoading ? 'Registrazione in corso...' : 'Registrati'}
            </button>
          </div>
        </form>

        {/* Link per il login */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Hai già un account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Vai al Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

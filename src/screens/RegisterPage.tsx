import { useNavigate } from 'react-router-dom';
import React from 'react';

function RegisterPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const username = usernameInput?.value;
        localStorage.setItem("username", username);
        navigate('/');
    };

    const goToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/login');
    };

    const samePassword = (password: string, repeat_password: string): boolean => {
        if (password !== repeat_password) {
            alert("As passwords não coincidem!");
            return false;
        }
        return true;
    };

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateDate = (date: string): boolean => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    };

    const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = (document.getElementById("email") as HTMLInputElement).value;
        const date = (document.getElementById("date") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const repeat_password = (document.getElementById("repeat_password") as HTMLInputElement).value;

        if (!validateEmail(email)) {
            alert("Email inválido!");
            return;
        }

        if (!validateDate(date)) {
            alert("Deves ter pelo menos 18 anos!");
            return;
        }

        if (!samePassword(password, repeat_password)) {
            return;
        }

        handleLogin();
    };

    return (

        <div className="h-screen flex flex-col items-center justify-center relative">

            <button
              onClick={() => window.history.back()}
              className="absolute top-1 left-1 text-black hover:underline ml-6 mt-4"
            >
                &lt;
            </button>

            <div className="absolute top-1/5 transform text-center">
                <h1 className="text-2xl font-light text-black">Welcome to</h1>
                <h1 className="text-4xl font-extrabold text-black mb-3">Car(e)!</h1>
            </div>

            <div className="w-full p-4">
                <div className="flex justify-center mb-1 text-stone-700">
                    <h1>Já tens conta?</h1>
                    <button onClick={goToLogin} className="text-orange-500 link ml-2">
                        Clica aqui!
                    </button>
                </div>
                <form onSubmit={validateForm}>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        className="bg-stone-700 border-2 border-orange-500 rounded-2xl p-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        id="date"
                        placeholder="Data de Nascimento"
                        onFocus={(e) => (e.currentTarget.type = "date")}
                        onBlur={(e) => (e.currentTarget.type = "text")}
                        className="bg-stone-700 border-2 border-orange-500 rounded-2xl p-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="bg-stone-700 border-2 border-orange-500 rounded-2xl p-2 mb-2 w-full"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-stone-700 border-2 border-orange-500 rounded-2xl p-2 mb-3 w-full"
                    />
                    <input
                        type="password"
                        id="repeat_password"
                        placeholder="Repete a Password"
                        className="bg-stone-700 border-2 border-orange-500 rounded-2xl p-2 mb-3 w-full"
                    />
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white rounded-2xl p-2 w-1/5"
                        >
                            Registar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;

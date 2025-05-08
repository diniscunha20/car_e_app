import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const verifyUsername = localStorage.getItem("username");
    const username = document.getElementById("username").value;

    if (verifyUsername != username) {
      alert("This username doesn't exist.");
      return;
    }
    navigate('/');
  };

  const goToRegister = (event) => {
    event.preventDefault(); 
    navigate('/register');
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center relative">

      <button
        onClick={() => window.history.back()}
        className="absolute top-1 left-1 text-black hover:underline ml-6 mt-4"
      >
        &lt;
      </button>

      {/* Títulos */}
      <div className="absolute top-1/5 transform text-center">
        <h1 className="text-2xl font-light text-black">Welcome to</h1>
        <h1 className="text-4xl font-extrabold text-black mb-3">Car(e)!</h1>
      </div>

      <div className="w-full p-4">
        <div className="flex justify-center mb-1 text-stone-700">
          <h1>Não tens conta?</h1>
          <button onClick={goToRegister} className="text-orange-500 link ml-2">
            Regista-te!
          </button>
        </div>
        <form onSubmit={handleLogin}>
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-2xl p-2 w-1/5"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

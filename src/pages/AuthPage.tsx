import React, { useState } from "react";
import {
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  User,
  Phone,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Backend from "../services/backend";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Redirection si déjà connecté
  React.useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      const from =
        location.state?.from?.pathname ||
        (userData.role === "Administrateur" ? "/admin" : "/dashboard");
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLogin && !termsAccepted) {
      setError(
        "Vous devez accepter les conditions générales pour créer un compte"
      );
      return;
    }

    if (isLogin) {
      if (!email || !password) {
        setError("Veuillez saisir votre email et mot de passe");
        return;
      }

      const data = await Backend.post("/auth/login", {
        email,
        password,
      });

      console.log(data);

      if (!data.token) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      document.location.reload();
    } else {
      if (!name) {
        setError("Le nom est requis");
        return;
      }

      if (!phone) {
        setError("Le téléphone est requis");
        return;
      }

      if (!email || !password) {
        setError("Veuillez saisir votre email et mot de passe");
        return;
      }

      const data = await Backend.post("/auth/register", {
        name,
        phone,
        email,
        password,
      });

      if (data.errors) {
        setError(data.errors[0].message);
        return;
      }

      setSuccess("Inscription réussie ! Connectez-vous dès maintenant !");
      // Réinitialiser le formulaire
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setIsLogin(true);
    }
  };
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log("email:", email);

    const data = await Backend.post("/auth/forgot-password", {
      email,
    });

    if (data.errors) {
      setError(data.errors[0].message);
      return;
    }

    setSuccess("Inscription réussie ! Connectez-vous dès maintenant !");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          {showForgotPassword ? (
            <>
              <div className="text-center">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Retour
                </button>
                <h2 className="text-3xl font-bold text-dark-900 mb-2">
                  Mot de passe oublié
                </h2>
                <p className="text-neutral-600">
                  Saisissez votre email pour réinitialiser votre mot de passe
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  {success}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                      placeholder="exemple@email.com"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-dark-900 mb-2">
                  {isLogin ? "Connexion" : "Créer un compte"}
                </h2>
                <p className="text-neutral-600">
                  {isLogin
                    ? "Accédez à votre espace personnel"
                    : "Rejoignez ImmoFrance pour publier vos annonces"}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                          placeholder="Jean Dupont"
                        />
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                          placeholder="+41"
                        />
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                      placeholder="exemple@email.com"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                      placeholder="••••••••"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? "Masquer" : "Afficher"}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-600"
                    >
                      J'accepte les{" "}
                      <Link
                        to="/terms"
                        className="text-red-600 hover:text-red-700"
                      >
                        conditions générales
                      </Link>{" "}
                      et la{" "}
                      <Link
                        to="/privacy"
                        className="text-red-600 hover:text-red-700"
                      >
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                )}

                {/*isLogin && (
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowForgotPassword(true)
                                            }
                                            className="text-sm text-red-600 hover:text-red-700"
                                        >
                                            Mot de passe oublié ?
                                        </button>
                                    </div>
                                )*/}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  {isLogin ? "Se connecter" : "Créer un compte"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-neutral-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {isLogin ? "Créer un compte" : "Se connecter"}
                </button>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-neutral-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                   
Mot de passe oublié
                  </button>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;

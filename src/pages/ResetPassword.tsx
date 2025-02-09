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
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Backend from "../services/backend";

const ReactPassword: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmpassword, setconfirmPassword] = useState("");
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log("p:", id,password,confirmpassword);
    if(password != confirmpassword){
        setError("password and confirmpassword should be the same");
        return;
    }
    const data = await Backend.post("/auth/reset-password", {
      id: id,
      password: password
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
         
            <>
              <div className="text-center">
               
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
                    New Password
                  </label>
                  <div className="relative">
                    <input
                       type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                      placeholder="Password"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmpassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-red-500"
                      placeholder="Confirm Password"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? "Masquer" : "Afficher"}
                    </button>
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
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReactPassword;

import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

export const PrivateRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <section
        className="relative flex items-center justify-center min-h-screen 
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
      >
        <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  if (!isAuth) {
    return <Navigate to="/me" replace />;
  }

  return (
    <section
      className="relative min-h-screen 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    >
      {children}
    </section>
  );
};
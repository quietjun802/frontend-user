import { useContext } from "react";
import { Navigate } from "react-router-dom";
<<<<<<< HEAD
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // 로그인 안 됨 → /login 으로 이동
  if (!user) {
=======
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthed } = useContext(AuthContext);

  if (!isAuthed) {
>>>>>>> main
    return <Navigate to="/login" replace />;
  }

  // 로그인 됨 → children 보여줌
  return children;
};

export default ProtectedRoute;

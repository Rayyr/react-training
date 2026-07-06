import { useAuth } from "../../context/AuthContext.js";

export default function LogoutButton() {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
}
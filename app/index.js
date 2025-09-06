import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function Index() {
  const { token } = useSelector((state) => state.auth);

  if (token) return <Redirect href="/home" />;

  return <Redirect href="/login" />;
}

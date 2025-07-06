import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function ThemeListener() {
  const theme = useSelector((state: RootState) => state.setting.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return null;
}

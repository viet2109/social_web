import type { NavigateFunction } from "react-router-dom";

let navigateFunction: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction) => {
  navigateFunction = navigate;
};

export const getNavigate = (): NavigateFunction => {
  if (!navigateFunction) {
    throw new Error("Navigate function chưa được thiết lập!");
  }
  return navigateFunction;
};

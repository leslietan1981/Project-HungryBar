import { useLocation, useNavigate } from "react-router";
import { guestNavData } from "../constants/guestNavData.tsx";

const routableValues = guestNavData.map(({ value }) => value).filter((value) => value !== "");

export const useGuestNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (value: string) => {
    const fromIdx = routableValues.indexOf(location.pathname);
    const toIdx = routableValues.indexOf(value);
    const isRight = toIdx > fromIdx;

    navigate(value, { state: { direction: isRight ? "left" : "right" } });
  };

  return { navigateTo };
};

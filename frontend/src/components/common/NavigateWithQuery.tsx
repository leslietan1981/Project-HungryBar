import { Navigate, useLocation } from "react-router";

interface NavigateWithQueryProps {
  to: string;
  replace: boolean;
}

export const NavigateWithQuery = ({ to, replace = true }: NavigateWithQueryProps) => {
  const { search } = useLocation();

  return <Navigate to={`${to}${search}`} replace={replace} />;
};

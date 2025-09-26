import { useNavigate, useLocation } from "react-router";

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/");
  const goToAuth = (type: "login" | "register") => navigate(`/auth/${type}`);
  const goToProducts = () => navigate("/products");
  const goToProduct = (id: string | number) => navigate(`/products/product/${id}`);

  return {
    navigate,
    location,
    goBack,
    goHome,
    goToAuth,
    goToProducts,
    goToProduct,
  };
}

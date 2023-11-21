interface RoutesInterface {
  LOGIN: string;
  REGISTER: string;
  FORGOT_PASSWORD: string;
  CATALOG: string;
}

export const ROUTES: RoutesInterface = {
  LOGIN: "/",
  REGISTER: "/cadastro",
  FORGOT_PASSWORD: "/esqueci-minha-senha",
  CATALOG: "/catalogo",
};

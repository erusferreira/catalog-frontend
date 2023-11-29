import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import { schemaLogin } from "./validator";
import { LoginInputs } from "@apptypes/loginType";
import { APIConfig } from "@config/api.config.constant";
import { http } from "@config/axios.config";
import { ROUTE_PATHS } from "routes/routes.constant";
import { localStorageService } from "services/localstorage-service";

export default function Form() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schemaLogin),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInputs> = async (payload) => {
    try {
      const url = APIConfig.LOGIN?.POST();
      const { data } = await http.post(url, payload);
      if (data) {
        login({ data });
      }
    } catch (error) {
      throw new Error(`Erro ao realizar login: ${error}`);
    }
  };

  const login = (user: any) => {
    const lsService = localStorageService();
    lsService.setToken("user", user.data);
    return navigate(ROUTE_PATHS.CATALOG);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2 h-10">
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="email"
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email?.message && (
            <span className="mt-3 text-xs">{errors.email?.message}</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Senha
          </label>
          <div className="text-sm">
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              to={ROUTE_PATHS.FORGOT_PASSWORD}
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <input
            {...register("password", { required: true })}
            id="password"
            name="password"
            type="password"
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password?.message && (
            <span className="mt-3 text-xs">{errors.password?.message}</span>
          )}
        </div>
      </div>

      <div>
        <button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}

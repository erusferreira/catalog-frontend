import { ApiConfigInterface, AppAPIConfig } from "./api.config.interface";

export const APIConfig = {
  REGISTER: {
    POST: () => `/auth/signup`,
  } as AppAPIConfig,
  LOGIN: {
    POST: () => `/auth/login`,
  } as AppAPIConfig,
} as ApiConfigInterface;

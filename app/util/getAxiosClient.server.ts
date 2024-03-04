import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";
import {refreshToken} from "~/util/refreshtoken.server";
export default function getAxiosClientServer() {
  // @ts-ignore
  createAuthRefreshInterceptor.default(axios, refreshToken)
  return axios;
}
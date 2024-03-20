import superagent from "superagent";
import {getToken, setToken} from "~/util/tokenUtil.server";
import process from "process";

export async function refreshToken() {
  let res
  try {
    res = await superagent.post(process.env.EMR_AUTH_URL ?? "").set("Content-Type", "application/x-www-form-urlencoded").send({
      grant_type: 'password',
      client_id: process.env.EMR_CLIENT_ID ?? "",
      scope: process.env.EMR_SCOPES ?? "",
      user_role: 'users',
      username: process.env.EMR_USERNAME ?? "",
      password: process.env.EMR_PASSWORD ?? ""
    })
  } catch (e) {
    console.error("Error refreshing token", e)
    return undefined;
  }
  return await setToken(res.body.access_token)
}
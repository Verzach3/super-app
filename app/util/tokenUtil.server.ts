import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? ""),
  password: process.env.REDIS_PASSWORD,
})

export async function getToken() {
  console.log("Getting token")
  return (await redis.get("access_token")) ?? ""
}

export async function setToken(token: string) {
  return redis.set("access_token", token);
}
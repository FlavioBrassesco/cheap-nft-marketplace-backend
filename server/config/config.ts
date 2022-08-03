import dotenv from "dotenv";
dotenv.config();

const config = {
  env: (process.env.NODE_ENV as string) || "development",
  port: process.env.PORT || 8000,
  jwtSecret:
    process.env.NODE_ENV === "production"
      ? (process.env.JWT_SECRET as string)
      : "test",
};
export default config;

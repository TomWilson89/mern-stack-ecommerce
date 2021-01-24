import dotenv from "dotenv";

dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db: {
    mongo_uri: process.env.MONGO_URI,
  },
  jwt: {
    expires: process.env.JWT_EXPIRES,
    secret: process.env.JWT_SECRET,
  },
};

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

type UserData = { isAdmin?: boolean };
declare global {
  var getAuthToken: (userId?: string, data?: UserData) => string;
  var getAuthHeader: (userId?: string, data?: UserData) => string;
}

global.getAuthToken = (userId?: string, data?: UserData) => {
  const defaultId = uuidv4();
  return jwt.sign(
    { id: userId || defaultId, ...data },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};
global.getAuthHeader = (userId?: string, data?: UserData) => {
  const token = global.getAuthToken(userId, data);
  return `Bearer ${token}`;
};

export {};

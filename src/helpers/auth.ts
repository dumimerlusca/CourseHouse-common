import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

declare global {
  var getAuthToken: (userId?: string) => string;
  var getAuthHeader: (userId?: string) => string;
}

global.getAuthToken = (userId?: string) => {
  const defaultId = uuidv4();
  return jwt.sign({ id: userId || defaultId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
global.getAuthHeader = (userId?: string) => {
  const token = global.getAuthToken(userId);
  return `Bearer ${token}`;
};

export {};

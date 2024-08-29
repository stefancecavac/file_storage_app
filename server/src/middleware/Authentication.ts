import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(400).json({ message: "No auth token provided" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!verifyToken) {
      return res.status(400).json({ message: "Not a valid token" });
    }

    req.user = verifyToken;

    next();
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

export default authenticate;

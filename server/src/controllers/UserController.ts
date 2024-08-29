import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Not a strong password" });
  }
  try {
    const emailExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });

    res.status(200).json({ message: "User registered successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });

    res.status(200).json({ message: "User login successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User loged out" });
};

const getCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ email: user?.email });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };

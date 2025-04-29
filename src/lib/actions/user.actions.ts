"use server";

import { prisma } from "@/prisma/prisma-client";
import { InvalidData, PasswordNotMatch, UserAlreadyExist } from "@/src/exeptions/errors";
import { hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signUp = async ({ ...userData }: SignUpParams) => {
  const { fullName, email, password, comfirmPassword } = userData;

  if (password !== comfirmPassword) {
    throw new PasswordNotMatch("Passwords doesn't match. Please try again.");
  }

  const payload = { fullName, email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });

  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExist) {
    throw new UserAlreadyExist("User already exist!");
  }

  const newUser = await prisma.user.create({
    data: {
      fullName,
      token,
      email,
      password: hashSync(password, 10),
    },
  });

  if (!newUser) {
    throw new Error("Error creating user");
  }

  const { password: _, ...userInfo } = newUser;

  const cookie = await cookies();
  cookie.set("fintech-aggregator-session", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return userInfo;
};

export const signIn = async ({ email, password }: SignInParams) => {
  const userData = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userData) {
    throw new InvalidData("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, userData.password);

  if (!isPasswordValid) {
    throw new InvalidData("Invalid email or password");
  }

  const isTokenValid = jwt.verify(userData.token, JWT_SECRET);
  const cookie = await cookies();

  if (isTokenValid) {
    cookie.set("fintech-aggregator-session", userData.token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } else {
    const payload = { fullName: userData.fullName, email: userData.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });
    const updatedUser = await prisma.user.update({
      where: {
        email: userData.email,
      },
      data: {
        token,
      },
    });

    const { password: _, ...user } = updatedUser;

    return user;
  }

  const { password: _, ...user } = userData;

  return user;
};

export const logOut = async () => {
  try {
    const cookie = await cookies();

    cookie.delete("fintech-aggregator-session");
  } catch (error) {
    console.error("Error while log out user:", error);
    throw new Error("Error logOut user");
  }
};

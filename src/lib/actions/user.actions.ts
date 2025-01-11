"use server";

import { prisma } from "@/prisma/prisma-client";
import { hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signUp = async ({ ...userData }: SignUpParams) => {
  const { fullName, email, password } = userData;

  const payload = { fullName, email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });

  try {
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
  } catch (error) {
    console.log("Error while sign up user:", error);
    throw new Error("Error creating user");
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
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
  } catch (error) {
    console.log("Error while sign in user:", error);
  }
};

export const logOut = async () => {
  try {
    const cookie = await cookies();

    cookie.delete("fintech-aggregator-session")
  } catch (error) {
    console.log("Error while log out user:", error);
    throw new Error("Error logOut user");
  }
};

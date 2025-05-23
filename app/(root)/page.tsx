import MainPage from "@/src/components/shared/MainPage/main-page";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function Home() {
  console.log("ENV_TYPE:", process.env.ENV_TYPE);
  const cookie = await cookies();
  const token = cookie.get("fintech-aggregator-session")?.value;
  if (token) {
    try {
      const isTokenValid = jwt.verify(token, JWT_SECRET);
      console.log("token: ", isTokenValid);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        redirect("/sign-in");
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error("Invalid token:", error.message);
        redirect("/sign-in");
      } else {
        console.error("Error while execution root/Home:", error);
      }
    }
  } 
  return <MainPage />;
}

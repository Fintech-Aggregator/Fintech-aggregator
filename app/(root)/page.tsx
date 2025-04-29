import SearchBlock from "@/src/components/shared/SearchBlock/search-block";
import MainPage from "@/src/components/shared/MainPage/main-page";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function Home() {
  const cookie = await cookies();
  const token = cookie.get("fintech-aggregator-session")?.value;
  if (token) {
    const isTokenValid = jwt.verify(token, JWT_SECRET) 
    console.log("token: ", isTokenValid);
  }
  return (
    <>
      <MainPage />
      {/* <SearchBlock /> */}
    </>
  );
}

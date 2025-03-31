import { AuthForm } from "@/src/components/shared/Auth/auth-form";

export default async function ForgotPass() {
  return (
    <section className="w-full flex justify-center mt-32">
      <AuthForm type="forgot-pass" />
    </section>
  );
}

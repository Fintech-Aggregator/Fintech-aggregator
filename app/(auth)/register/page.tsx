import React from "react";
import { cn } from "@/src/lib/utils";
import { AuthForm } from "@/src/components/shared/Auth/auth-form";

interface RegisterProps {
  type: string;
  className?: string;
}
const Register: React.FC<RegisterProps> = ({ type, className }) => {
  return <AuthForm type="register" />;
};

export default Register;

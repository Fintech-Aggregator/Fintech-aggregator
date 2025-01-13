"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/src/components/ui/form";
import { authFormSchema, cn } from "@/src/lib/utils";
import { signIn, signUp } from "@/src/lib/actions/user.actions";
import { CustomInput } from "../custom-input";
import { Button } from "../../ui/button";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  type: string;
  className?: string;
}

export const AuthForm: React.FC<Props> = ({ type, className }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = authFormSchema(type);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  console.log("errorMessage: ", errorMessage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          fullName: data.firstName!.concat(" ", data.lastName!),
          email: data.email,
          password: data.password,
        };
        const user = await signUp(userData);
        if (user) {
          router.push("/");
        }
      }

      if (type === "sign-in") {
        const user = await signIn({
          email: data.email,
          password: data.password,
        });
        if (user) {
          router.push("/");
        }
      }
    } catch (error: any) {
      if (error.message === "Invalid email or password") {
        console.log("value: ", error.message);
        setErrorMessage("Invalid email or password. Please try again.");
      }
      console.log("Error while auth submit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn("w-[clamp(15rem,_20vw,_25rem)] text-center", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "sign-up" && (
            <>
              <h1 className="text-2xl font-bold mb-10">Create an account</h1>
              <CustomInput control={form.control} name="firstName" type="firstName" placeholder="Enter your first name" />
              <CustomInput control={form.control} name="lastName" type="lastName" placeholder="Enter your first name" />
              <CustomInput control={form.control} name="email" type="email" placeholder="Email">
                <Mail className="ml-4" color="#05D66D" />
              </CustomInput>
              <CustomInput control={form.control} name="password" type="password" placeholder="Enter Password">
                <LockKeyhole className="ml-4" color="#05D66D" />
              </CustomInput>
              <CustomInput control={form.control} name="comfirmPassword" type="password" placeholder="Comfirm Password">
                <LockKeyhole className="ml-4" color="#05D66D" />
              </CustomInput>
              <div className="flex justify-between mt-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="peer hidden" />
                  <div className="w-5 h-5 bg-gray-200 border-2 border-gray-400 rounded-md bg-primary"></div>
                  <p className="text-sm">Accept the policy and terms</p>
                </label>
              </div>
            </>
          )}

          {type === "sign-in" && (
            <>
              <h1 className="text-2xl font-bold mb-10">Log in to your Account</h1>
              {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
              <CustomInput control={form.control} name="email" type="email" placeholder="Email">
                <Mail className="ml-4" color="#05D66D" />
              </CustomInput>
              <CustomInput control={form.control} name="password" type="password" placeholder="Enter Password">
                <LockKeyhole className="ml-4" color="#05D66D" />
              </CustomInput>
              <div className="flex justify-between mt-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="peer hidden" />
                  <div className="w-5 h-5 bg-gray-200 border-2 border-gray-400 rounded-md bg-primary"></div>
                  <p className="font-medium">Remember me</p>
                </label>
                <p className="text-primary">Fongot password?</p>
              </div>
            </>
          )}

          <Button className="w-full my-8 rounded-lg text-lg" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={100} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : type === "sign-up" ? (
              "Create"
            ) : (
              "Log in"
            )}
          </Button>
          {type === "sign-up" ? (
            <Link className="mt-6" href={"/sign-in"}>
              Already have an account? <span className="text-primary">Login</span>
            </Link>
          ) : (
            <Link className="mt-6" href={"/sign-up"}>
              Don&apos;t have account? <span className="text-primary">Sign up</span>
            </Link>
          )}
        </form>
      </Form>
    </section>
  );
};

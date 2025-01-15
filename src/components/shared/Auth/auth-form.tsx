"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/src/components/ui/form";
import { authFormSchema, cn } from "@/src/lib/utils";
import { signIn, signUp } from "@/src/lib/actions/user.actions";
import { CustomInput } from "../../ui/custom-input";
import { Button } from "../../ui/button";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CustomCheckbox } from "../../ui/custom-checkbox";
import { InvalidData, PasswordNotMatch, UserAlreadyExist } from "@/src/exeptions/errors";

interface Props {
  type: string;
  className?: string;
}

export const AuthForm: React.FC<Props> = ({ type, className }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = authFormSchema(type);
  const [isRememberMe, setIsRememberMe] = React.useState<boolean>(true);
  const [isAccept, setIsAccept] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
          comfirmPassword: data.comfirmPassword!,
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
      if (error.message === "User already exist!") {
        setErrorMessage(error.message);
      }
      else if (error.message === "Invalid email or password") {
        setErrorMessage(error.message);
      }
      else if (error.message === "Passwords doesn't match. Please try again.") {
        setErrorMessage(error.message);
      } else {
        console.log("error message: ", error.message);
        setErrorMessage("Server Error, please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn("w-[clamp(20rem,_30vw,_30rem)] text-center", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "sign-up" && (
            <>
              <h1 className="text-2xl font-bold mb-10">Create an account</h1>
              {errorMessage && <p className="text-destructive text-sm mt-4">{errorMessage}</p>}
              <CustomInput control={form.control} name="firstName" type="firstName" placeholder="Enter your first name" />
              <CustomInput control={form.control} name="lastName" type="lastName" placeholder="Enter your first name" />
              <CustomInput control={form.control} name="email" type="email" placeholder="Email">
                <Mail className="ml-4" color="#05D66D" />
              </CustomInput>
              <CustomInput control={form.control} name="password" type="password" placeholder="Password">
                <LockKeyhole className="ml-4" color="#05D66D" />
              </CustomInput>
              <CustomInput control={form.control} name="comfirmPassword" type="password" placeholder="Confirm Password">
                <LockKeyhole className="ml-4" color="#05D66D" />
              </CustomInput>
              <div className="flex justify-between mt-4">
                <CustomCheckbox isChecked={isAccept} setChecked={setIsAccept} text="Accept the policy and terms" />
              </div>
            </>
          )}

          {type === "sign-in" && (
            <>
              <h1 className="text-2xl font-bold mb-10">Log in to your Account</h1>
              {errorMessage && <p className="text-destructive text-sm mt-4">{errorMessage}</p>}
              <CustomInput control={form.control} name="email" type="email" placeholder="Email">
                <Mail className="flex-shrink-0 ml-4" color="#05D66D" />
              </CustomInput>
              <CustomInput control={form.control} name="password" type="password" placeholder="Password">
                <LockKeyhole className="flex-shrink-0 ml-4" color="#05D66D" />
              </CustomInput>
              <div className="flex justify-between mt-4">
                <CustomCheckbox isChecked={isRememberMe} setChecked={setIsRememberMe} text="Remember me" />
                <p className="text-primary">Forgot password?</p>
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

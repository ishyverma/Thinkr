"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInType } from "@/types/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    
    const form = useForm<z.infer<typeof SignInType>>({
        resolver: zodResolver(SignInType),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof SignInType>) => {
        try {
            const result = await signIn("credentials", {
                ...values,
                redirect: false
            })
      
            if (result?.error) {
              toast({
                title: "Invalid username or password",
                description: "Please check your credentials and try again.",
                variant: "destructive",
              })
              return
            }
      
            router.push("/thread")
            router.refresh()
          } catch (error) {
            toast({
              title: "Something went wrong",
              description: "Please try again later.",
              variant: "destructive",
            })
          }
    }

    return (
        <>
            <Card className="w-96 font-grotsek font-bold selection:text-[#1a5a8b] selection:bg-[#e6e6f4]">
                <CardHeader>
                    <CardTitle className="font-grotsek text-3xl">Sign In</CardTitle>
                    <CardDescription className="font-bold">Welcome back to <span className="font-extrabold dark:text-white text-black hover:underline transition-all duration-300">Thinkr!</span></CardDescription>
                </CardHeader>
                <CardContent className="-mt-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Username / Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex gap-2 w-full items-center justify-between">
                                            <div className="w-full">
                                                <FormControl>
                                                    <Input type={`${showPassword ? "text" : "password"}`} placeholder="Password" {...field} />
                                                </FormControl>
                                            </div>
                                            <div className="self-center flex">
                                                <Button type="button" onClick={() => {
                                                    setShowPassword(prev => !prev)
                                                }} variant='secondary'>
                                                    {showPassword ? <EyeOff /> : <Eye />}
                                                </Button>
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-1">
                                <Button type="submit" className="w-full font-bold">
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <div>Don't have an account? <Link href={'/signup'} className="hover:underline">Sign up here</Link></div>
                </CardFooter>
            </Card>
        </>
    );
}

export default SignIn;
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
import { SignUpType } from "@/types/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    
    const form = useForm<z.infer<typeof SignUpType>>({
        resolver: zodResolver(SignUpType),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof SignUpType>) => {
        try {   
            const response = await axios.post('/api/signup', {
                email: values.email,
                username: values.username,
                password: values.password
            })
            toast({
                title: "Your are now a part of Thinkr 🌱",
                description: response.data.message
            })
        } catch (error) {
            let axiosError = error as AxiosError
            toast({
                title: "Oops! There was an error registering user",
                description: (axiosError.response?.data as { message: string }).message
            })
        }
    }

    return (
        <>
            <Card className="w-96 font-grotsek font-bold selection:text-[#1a5a8b] selection:bg-[#e6e6f4]">
                <CardHeader>
                    <CardTitle className="font-grotsek text-3xl">Sign Up</CardTitle>
                    <CardDescription className="font-bold">Welcome to <span className="font-extrabold dark:text-white text-black hover:underline transition-all duration-300">Thinkr!</span> Sign up to get started.</CardDescription>
                </CardHeader>
                <CardContent className="-mt-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
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
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <div>Already have an account? <Link href={"/signin"} className="hover:underline">Login here</Link></div>
                </CardFooter>
            </Card>
        </>
    );
}

export default SignUp;
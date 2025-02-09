import prisma from "@/db";
import { SignUpType } from "@/types/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const parsedResult = SignUpType.safeParse(await req.json())

    if(!parsedResult.success) {
        return NextResponse.json(
            { success: false, message: parsedResult.error.errors[0].message },
            { status: 400 }
        )
    }

    const { email, username, password } = parsedResult.data
    try {
        const isUserExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { password }
                ]
            }
        })

        if (isUserExists) {
            return NextResponse.json(
                { success: false, message: "User already exists" },
                { status: 404 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 5)
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json(
            { success: true, message: "Successfully registered user" }
        )
    } catch (error) {
        console.log('Signup Error', error)
        return NextResponse.json(
            { success: false, message: "Error registering user" },
            { status: 500 }
        )
    }
}
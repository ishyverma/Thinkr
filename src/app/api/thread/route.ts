import prisma from "@/db";
import { CreateThread, RenameThread } from "@/types/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const parsedResult = CreateThread.safeParse(await req.json())

  if(!parsedResult.success) {
    return NextResponse.json(
        { success: false, message: parsedResult.error.errors[0].message },
        { status: 400 }
    )
  }

  const { name, userId } = parsedResult.data

  try {
    await prisma.thread.create({
      data: {
        userId,
        name
      }
    })

    return NextResponse.json(
      { message: "Thread Created" }
    )
  } catch(error) {
    console.log('Creating Thread Error', error)
      return NextResponse.json(
        { success: false, message: "Error creating thread" },
        { status: 500 }
      )
    }
}

export async function GET(req: NextRequest) {
  const userId = req?.nextUrl?.searchParams.get('userId') as string
  try {
    const threads = await prisma.thread.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc"
      }
    })
    return NextResponse.json({ threads });
  } catch (error) {
    console.log('Erro fetching all threads', error)
    return NextResponse.json(
      { success: false, message: "Error fetching threads" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const id = req?.nextUrl?.searchParams.get('id') as string
  try {
    await prisma.thread.delete({
      where: {
        id
      }
    })
    return NextResponse.json(
      { message: "Thread deleted successfully"}
    )
  } catch (error) {
    console.log('Erro deleting the thread', error)
    return NextResponse.json(
      { success: false, message: "Error deleting thread" },
      { status: 500 }
    )   
  }
}

export async function PUT(req: NextRequest) {
  const parsedResult = RenameThread.safeParse(await req.json())

  if(!parsedResult.success) {
    return NextResponse.json(
        { success: false, message: parsedResult.error.errors[0].message },
        { status: 400 }
    )
  }
  
  const { name, id } = parsedResult.data

  try {
    await prisma.thread.update({
      where: {
        id
      },
      data: {
        name
      }
    })
    return NextResponse.json(
      { message: "Thread has been renamed 😊" }
    )
  } catch (error) {
    console.log('Erro renaming the thread', error)
    return NextResponse.json(
      { success: false, message: "Error renaming thread" },
      { status: 500 }
    )      
  }
}
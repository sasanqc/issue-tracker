import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateIssue = issueSchema.safeParse(body);
  if (!validateIssue.success) {
    return NextResponse.json(
      { error: validateIssue.error.format() },
      { status: 400 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  return NextResponse.json([{ name: "sasan", number: 121 }], { status: 201 });
}

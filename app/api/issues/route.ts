import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const IssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateIssue = IssueSchema.safeParse(body);
  if (!validateIssue.success) {
    return NextResponse.json(
      { error: validateIssue.error.errors },
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

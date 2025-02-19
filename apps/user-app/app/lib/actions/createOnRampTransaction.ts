"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export const createOnRampTransaction = async (
  amount: number,
  provider: string
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "User not found",
    };
  }

  try {
    const newTransaction = await prisma.onRampTransaction.create({
      data: {
        userId: Number(userId),
        amount: amount * 100,
        provider,
        status: "Processing",
        startTime: new Date(),
        token: `token_${Math.random()}`,
      },
    });
    console.error(newTransaction);

    return {
      message: "Transaction created",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create transaction",
    };
  }
};

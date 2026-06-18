import prisma from "../../config/prisma";

export async function findUser(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export async function findUserRole() {}

export async function createUser() {
  // return prisma.users.create()
}

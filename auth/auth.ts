"use server";

import bcrypt from "bcrypt";
import { typeFormState, typeUsers } from "@/lib/types";
import { createSession, deleteSession } from "./session";
import { sql } from "@vercel/postgres";

export const loginServer = async (
  email: string,
  password: string
): Promise<typeFormState> => {
  const result = await sql<typeUsers>`
    SELECT * FROM users
    WHERE email = ${email}
    `;

  const user = result.rows[0];
  if (!user) {
    return { message: "could not find the user" };
  }

  if (!user.password) {
    throw new Error("Password is not set for the user");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { message: "invalid credits" };
  }

  const result2 = await sql<typeUsers>`
    SELECT id,firstName,lastName,email
    FROM users
    WHERE email = ${email}
    `;

  const userWithoutPassword = result2.rows[0];
  await createSession(user);
  return { user: userWithoutPassword };
};

export const signup = async (data: typeUsers): Promise<typeFormState> => {
  const { firstName, lastName, email, password } = data;
  const existingUser =
    await sql<typeUsers>`SELECT * FROM users WHERE email = ${email}`;

  if (existingUser.rows.length > 0) {
    return { message: "User already exists via this email.." };
  }

  if (!password) {
    throw new Error("Password is not set for the user");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result =
    await sql<typeUsers>`INSERT INTO users (firstName,lastName, email, password) 
    VALUES (${firstName},${lastName}, ${email}, ${hashedPassword}) RETURNING *;`;

  if (!result) {
    return { message: "Error while inserting data to database!" };
  }
};

export async function logoutServer() {
  deleteSession();
}
"use server";

import bcrypt from "bcrypt";
import { typeFormState, typeUsers } from "@/lib/types";
import { createSession, deleteSession } from "./session";
import { sql } from "@vercel/postgres";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

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
    SELECT id,firstname,lastname,email
    FROM users
    WHERE email = ${email}
    `;

  const userWithoutPassword = result2.rows[0];
  console.log("user before create session:", user);
  await createSession(user);
  return { user: userWithoutPassword };
};

export const signup = async (data: typeUsers): Promise<typeFormState> => {
  const { firstname, lastname, email, password } = data;
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
    await sql<typeUsers>`INSERT INTO users (firstname,lastname, email, password) 
    VALUES (${firstname},${lastname}, ${email}, ${hashedPassword}) RETURNING *;`;

  if (!result) {
    return { message: "Error while inserting data to database!" };
  }
};

export async function logoutServer() {
  deleteSession();
}

export const mailAction = async (email: string): Promise<void> => {
  const result = await sql<typeUsers>`
        SELECT * FROM users
        WHERE email = ${email}
        `;

  const user = result.rows[0];
  if (!user) {
    throw new Error("User not found");
  }

  const token = nanoid(32);
  const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.SMTP_MAIL_USER,
      pass: process.env.SMTP_MAIL_PASSWORD,
    },
  });

  const htmlBody = `Click here to <a href="${process.env.NEXT_PUBLIC_CLIENT_URL}/login/resetpassword/${token}">Reset Password</a>`;
  await transport.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: email,
    subject: "Reset Your Password",
    text: `Hello ${user.firstname}, please use the link below to reset your password.`,
    html: htmlBody,
  });

  const query = `
    UPDATE users
    SET verifytoken = $1, resetpasswordexpires = $2
    WHERE email = $3
  `;
  await sql.query(query, [token, expires, user.email]);
};

export const updatePassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise<void> => {
  try {
    const queryGetUser = `
      SELECT password FROM users
      WHERE verifytoken = $1
    `;
    const result = await sql.query(queryGetUser, [token]);

    if (result.rowCount === 0) {
      throw new Error("Invalid or expired token");
    }

    const existingPassword = result.rows[0].password;
    const isSamePassword = await bcrypt.compare(password, existingPassword);
    if (isSamePassword) {
      throw new Error("New password cannot be the same as the old password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const queryUpdatePassword = `
      UPDATE users
      SET password = $1, verifytoken = NULL
      WHERE verifytoken = $2
    `;
    const updateResult = await sql.query(queryUpdatePassword, [
      hashedPassword,
      token,
    ]);

    if (updateResult.rowCount === 0) {
      throw new Error("Invalid or expired token");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

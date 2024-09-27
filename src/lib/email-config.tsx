import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { createTransport } from "nodemailer";

import { renderAsync } from "@react-email/render";
import { Verification } from "@/components/email/verification";
import { Confirmation } from "@/components/email/confirmation";
import { env } from "@/env";

interface SendConfirmationParams {
  courseName: string;
  courseValue: string;
  sendTo: string;
}

export const generateVerificationToken = async () => {
  const random = crypto.getRandomValues(new Uint8Array(8));
  return Buffer.from(random).toString("hex").slice(0, 6);
};

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, provider, token } = params;

  const transport = createTransport(provider.server);

  const emailHtml = await renderAsync(<Verification token={token} />, {
    pretty: true,
  });
  const emailText = await renderAsync(<Verification token={token} />, {
    plainText: true,
  });

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: "Inicia sesión en tu cuenta de Global Talk!",
    html: emailHtml,
    text: emailText,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};

export const sendConfirmation = async (params: SendConfirmationParams) => {
  const { courseName, courseValue, sendTo } = params;
  const emailHtml = await renderAsync(
    <Confirmation courseName={courseName} courseValue={courseValue} />,
    {
      pretty: true,
    },
  );

  const emailText = await renderAsync(
    <Confirmation courseName={courseName} courseValue={courseValue} />,
    {
      plainText: true,
    },
  );

  const transport = createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD,
    },
  });

  const result = await transport.sendMail({
    to: sendTo,
    from: env.EMAIL_FROM,
    subject: "Confirmación de tu compra",
    html: emailHtml,
    text: emailText,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};

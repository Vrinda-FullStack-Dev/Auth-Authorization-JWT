const nodemailer = require("nodemailer");

// Replace with your real Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aroravrinda03@gmail.com",
    pass: "zxwrfgtqvqmjzofm", // NOT your normal Gmail password!
  },
});

const send = async (info) => {
  try {
    const result = await transporter.sendMail(info);
    console.log("Message sent: %s", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const emailProcessor = async ({ email, pin, type }) => {
  if (!email || (type === "request-new-password" && !pin)) {
    throw new Error("Missing required parameters: 'email' or 'pin'.");
  }

  let info;

  switch (type) {
    case "request-new-password":
      info = {
        from: '"Kogenie Company" <yourgmail@gmail.com>',
        to: email,
        subject: "Password Reset Pin",
        text: `Here is your password reset pin: ${pin}. This pin will expire in 1 day.`,
        html: `<b>Hello,</b><p>Here is your pin: <b>${pin}</b>. This pin will expire in 1 day.</p>`,
      };
      break;

    case "password-update-success":
      info = {
        from: '"Kogenie Company" <yourgmail@gmail.com>',
        to: email,
        subject: "Password Updated Successfully",
        text: "Your password has been successfully updated.",
        html: `<b>Hello,</b><p>Your password has been successfully updated.</p>`,
      };
      break;

    default:
      throw new Error("Invalid email type.");
  }

  return await send(info);
};
module.exports = { emailProcessor };
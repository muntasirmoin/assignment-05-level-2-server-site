import { join } from "path";
// import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  // console.log("verifyResponse :", verifyResponse);
  let result;
  let message = "";
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    // result = await orderModel.findOneAndUpdate(
    //   { transactionId },
    //   {
    //     paymentStatus: "Paid",
    //   }
    // );

    message = "Successfully Paid";
  } else {
    message = "Payment Failed";
  }

  // payment confirmation page come here

  const filePath = join(__dirname, "../../../views/confirmation.html");

  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  console.log({ template });

  //   return `<h1>Payment ${status}</h1>`;

  return template;
};

export const paymentService = {
  confirmationService,
};

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const initiatePayment = async (paymentData: any) => {
  const transactionId = `TXN-${Date.now()}`;
  console.log("paymentData", paymentData);
  try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: transactionId,
      // tran_id: "1223",
      success_url: `https://assignment-3-plum-five.vercel.app/api/payment/confirmation?transactionId=${transactionId}&status=success`,
      fail_url: `https://assignment-3-plum-five.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: "https://wheels-wash-client-assignment-5.vercel.app/",
      amount: paymentData.serviceId.price,
      // amount: "100",
      currency: "BDT",

      desc: "Merchant Registration Payment",
      cus_name: paymentData.customer.name,
      cus_email: paymentData.customer.email,
      cus_add1: paymentData.customer.address,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.customer.phone,
      type: "json",
    });

    console.log("payment info", response.data);
    return response.data;
  } catch (err) {
    throw new Error("Payment initiation failed");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment Validation Failed");
  }
};

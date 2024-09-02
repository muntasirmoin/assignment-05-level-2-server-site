import { Request, Response } from "express";
import { paymentService } from "./payment.service";
// import { paymentService } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;
  // console.log(req.query.transactionId);
  const result = await paymentService.confirmationService(
    transactionId as string,
    status as string
  );

  res.send(result);

  //   res.send(`<h1>success</h1>`);
};

export const paymentController = {
  confirmationController,
};

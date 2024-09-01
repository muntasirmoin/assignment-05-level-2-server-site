/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const matching = err.message.match(/"([^"]*)"/);

  const extractedMessage = matching && matching[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${err.message}`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `${err.message}`,
    errorSources,
  };
};

export default handleDuplicateError;

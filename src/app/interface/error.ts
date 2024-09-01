// error source interface
export type TErrorSources = {
  path: string | number;
  message: string;
}[];

// error res. interface

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

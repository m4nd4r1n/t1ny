export const failureResponse = (message: string): FailureResponse => ({
  ok: false,
  message,
});

export const successResponse = (message?: string): SuccessResponse => ({
  ok: true,
  message,
});

type FailureResponse = {
  ok: false;
  message: string;
};

type SuccessResponse = {
  ok: true;
  message?: string;
};

export type Response = SuccessResponse | FailureResponse;

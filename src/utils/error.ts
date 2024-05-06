class HttpError extends Error {
  status;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

class BadRequestError extends HttpError {
  constructor(msg?: string) {
    super(msg || 'Bad Request', 400);
  }
}
class UnauthorizedError extends HttpError {
  constructor(msg?: string) {
    super(msg || 'Unauthorized', 401);
  }
}
class ForbiddenError extends HttpError {
  constructor(msg?: string) {
    super(msg || 'Forbidden', 403);
  }
}
class NotFoundError extends HttpError {
  constructor(msg?: string) {
    super(msg || 'Not Found', 404);
  }
}
class MethodNotAllowedError extends HttpError {
  constructor(msg?: string) {
    super(msg || 'Method Not Allowed', 405);
  }
}
class InternalServerErrorError extends HttpError {
  constructor(msg?: string) {
    super(msg || 'Internal Server Error', 500);
  }
}

export {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  InternalServerErrorError,
};

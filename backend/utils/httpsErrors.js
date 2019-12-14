class HTTPSClientError extends Error {
  constructor(message) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    }
    else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class HTTPS400Error extends HTTPSClientError {
  constructor(message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

class HTTPS404Error extends HTTPSClientError {
  constructor(message = 'Not found') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  HTTPSClientError,
  HTTPS400Error,
  HTTPS404Error
}

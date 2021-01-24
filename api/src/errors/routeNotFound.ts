import HttpError from "./http";

class RouteNotFoundError extends HttpError {
  constructor(params: any = {}) {
    super("RouteNotFound", 404, params);
  }
}

export default RouteNotFoundError;

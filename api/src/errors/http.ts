import { render } from "mustache";
import es from "../../locales/es.json";
import en from "../../locales/en.json";

class HttpError extends Error {
  public status: number;

  public name: string;

  public messages: { en: string; es: string };

  public params: any;

  constructor(name = "InternalServer", status = 500, params = {}) {
    super(name);

    this.name = name;
    this.status = status;

    this.messages = {
      en: render(en.errors[this.name] || "", params) || undefined,
      es: render(es.errors[this.name] || "", params) || undefined,
    };

    this.params = params;
  }
}

export default HttpError;

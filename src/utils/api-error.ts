export type ApiErrorItem = {
  path?: string[];
  message?: string;
};

export type ApiErrorResponse = {
  success?: boolean;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?:
    | string
    | {
        message?: string;
        statusCode?: number;
      }
    | unknown[];
  errors?: ApiErrorItem[] | string[];
};

export function extractApiErrorMessages(error: unknown): string[] {
  if (typeof error !== "object" || error === null || !("response" in error)) {
    if (error instanceof Error) {
      return [error.message];
    }

    return ["Có lỗi xảy ra"];
  }

  const axiosError = error as {
    response?: {
      data?: ApiErrorResponse;
    };
    message?: string;
  };

  const data = axiosError.response?.data;

  if (!data) {
    return [axiosError.message || "Có lỗi xảy ra"];
  }

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const messages = data.errors
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (
          item &&
          typeof item === "object" &&
          typeof item.message === "string"
        ) {
          return item.message;
        }

        return null;
      })
      .filter((item): item is string => Boolean(item));

    if (messages.length > 0) {
      return messages;
    }
  }

  if (typeof data.message === "string" && data.message.trim()) {
    return [data.message];
  }

  if (
    data.message &&
    typeof data.message === "object" &&
    !Array.isArray(data.message) &&
    "message" in data.message &&
    typeof data.message.message === "string"
  ) {
    return [data.message.message];
  }

  if (Array.isArray(data.message)) {
    const messages = data.message.filter(
      (item): item is string =>
        typeof item === "string" && item.trim().length > 0,
    );

    if (messages.length > 0) {
      return messages;
    }
  }

  return [axiosError.message || "Có lỗi xảy ra"];
}

export function getApiErrorMessage(error: unknown): string {
  const messages = extractApiErrorMessages(error);
  return messages[0] || "Có lỗi xảy ra";
}

export function formatErrorMessage(response) {
  if (!response?.data) return "An unknown error occurred.";

  const {
    title,
    message: msg,
    errors,
    traceId,
    referenceCode,
    description
  } = response.data;

  let message =
    title ||
    msg ||
    description ||
    "An error occurred.";

  if (errors && typeof errors === "object") {
    const errorMessages = Object.entries(errors)
      .flatMap(([field, msgs]) =>
        Array.isArray(msgs) ? msgs.map(msg => `${field}: ${msg}`) : [`${field}: ${msgs}`]
      )
      .join("\n");

    if (errorMessages) {
      message += `\n\nDetails:\n${errorMessages}`;
    }
  }

  const ref = traceId || referenceCode;
  if (ref) {
    message += `\n\nReference Code: ${ref}`;
  }

  return message;
}

export function formatErrorMessage(response) {
  if (!response?.data) return "An unknown error occurred.";

  const { title, errors, traceId } = response.data;
  let message = title || "An error occurred.";

  if (errors && typeof errors === "object") {
    const errorMessages = Object.entries(errors)
      .flatMap(([field, msgs]) => msgs.map(msg => `${field}: ${msg}`))
      .join("\n");

    if (errorMessages) {
      message += `\n\nDetails:\n${errorMessages}`;
    }
  }

  if (traceId) {
    message += `\n\nReference Code: ${traceId}`;
  }

  return message;
}
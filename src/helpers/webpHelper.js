export const isAnimatedWebP = async (file) => {
  const header = await file.slice(0, 64).arrayBuffer(); // read first 64 bytes
  const bytes = new Uint8Array(header);
  const ascii = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join("");
  return ascii.includes("ANIM");
};
import { ACCEPTABLE_FILE_FORMATS_JOINED } from "@/config";
import imageCompression from "browser-image-compression";

const fileChecker = async (icon) => {
    if (!icon) return { status: 400, data: { message: "No file provided." } };

    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    const allowedTypes = ACCEPTABLE_FILE_FORMATS_JOINED;

    if (!allowedTypes.includes(icon.type)) {
        return { status: 400, data: { message: "Invalid file type. Only images (JPEG, PNG, WEBP, GIF) are allowed." }};
    }

    const options = {
        maxSizeMb: 1,
        useWebWorker: true,
    }

    let compressedFile = icon;
    try {
        compressedFile = await imageCompression(icon, options);
    } catch (ex) {
        console.error("An error occured while compressing file:", ex);
    }

    if (compressedFile.size > MAX_SIZE_BYTES) {
        return { status: 400, data: { message: `File size exceeds ${MAX_SIZE_MB}MB limit.` }};
    }

    return { status: 200, icon: compressedFile }
}

export default fileChecker;
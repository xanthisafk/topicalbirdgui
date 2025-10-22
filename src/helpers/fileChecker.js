const fileChecker = (icon) => {
    if (!icon) return { status: 400, data: { message: "No file provided." } };

    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(icon.type)) {
        return { status: 400, data: { message: "Invalid file type. Only images (JPEG, PNG, WEBP, GIF) are allowed." }};
    }

    if (icon.size > MAX_SIZE_BYTES) {
        return { status: 400, data: { message: `File size exceeds ${MAX_SIZE_MB}MB limit.` }};
    }

    return { status: 200 }
}

export default fileChecker;
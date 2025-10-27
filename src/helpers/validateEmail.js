export const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/;

export const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
        return { 
            isValid: false, 
            message: "Email is invalid" 
        };
    }
    return { isValid: true, message: null };
}

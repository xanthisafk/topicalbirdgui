const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?=.{8,}).*$/;

export const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character." 
        };
    }
    return { isValid: true, message: null };
};
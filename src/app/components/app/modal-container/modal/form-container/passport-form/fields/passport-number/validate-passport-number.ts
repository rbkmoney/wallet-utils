export const validatePassportNumber = (value: string): boolean => {
    if (!value) {
        return false;
    }
    const reg = /^[0-9]{10}$/;
    return !reg.test(value.trim());
};

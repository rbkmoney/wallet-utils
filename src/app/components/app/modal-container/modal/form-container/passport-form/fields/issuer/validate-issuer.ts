export const validateIssuer = (value: string): boolean => {
    if (!value) {
        return true;
    }
    const reg = /^[А-Яа-я'.,0-9-]{1,1000}\s\$/;
    return !reg.test(value.trim());
};

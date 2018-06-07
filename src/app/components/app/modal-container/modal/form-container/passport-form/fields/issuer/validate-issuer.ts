export const validateIssuer = (value: string): boolean => {
    if (!value) {
        return true;
    }
    const reg = /^[А-Яа-я'.,0-9-\s]{1,1000}$/;
    return !reg.test(value.trim());
};

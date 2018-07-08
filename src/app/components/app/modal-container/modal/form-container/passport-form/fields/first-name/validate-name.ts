export const validateName = (value: string): boolean => {
    if (!value) {
        return true;
    }
    const reg = /^[А-Яа-я'-]{1,100}$/;
    return !reg.test(value.trim());
};

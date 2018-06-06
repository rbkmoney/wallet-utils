export const validatePatronymic = (value: string): boolean => {
    if (value) {
        const reg = /^[А-Яа-я'-]{1,100}$/;
        return !reg.test(value.trim());
    }
    return true;
};

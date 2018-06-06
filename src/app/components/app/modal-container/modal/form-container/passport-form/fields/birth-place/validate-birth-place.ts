export const validateBirthPlace = (value: string): boolean => {
    if (!value) {
        return true;
    }
    const reg = /^[А-Яа-я'.,0-9-]{1,120}\s\$/;
    return !reg.test(value.trim());
};

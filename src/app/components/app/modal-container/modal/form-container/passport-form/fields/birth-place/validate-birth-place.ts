export const validateBirthPlace = (value: string): boolean => {
    if (!value) {
        return true;
    }
    const reg = /^[А-Яа-я'.,0-9-\s]{1,120}$/;
    return !reg.test(value.trim());
};

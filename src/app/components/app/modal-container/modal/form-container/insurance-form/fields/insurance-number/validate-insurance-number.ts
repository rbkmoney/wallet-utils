export const validateInsuranceNumber = (value: string): boolean => {
    if (!value) {
        return true;
    }
    const reg = /^[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$/;
    return !reg.test(value.trim());
};

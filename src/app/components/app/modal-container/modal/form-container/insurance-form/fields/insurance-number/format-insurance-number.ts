export const formatInsuranceNumber = (value: string): string => {
    if (!value) {
        return '';
    }
    let result: string = value;
    if (value.length === 3 || value.length === 7) {
        result = result + '-';
    }
    if (value.length === 11) {
        result = result + ' ';
    }
    return result;
};

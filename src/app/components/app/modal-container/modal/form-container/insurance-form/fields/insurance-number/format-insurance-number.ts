import { FormEvent } from 'react';
import { safeVal } from '../../../common-fields/safe-val';

const format = (value: string): string => {
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

export const formatInsuranceNumber = (e: FormEvent<HTMLInputElement>): number | string => {
    const target = e.currentTarget;
    const value = target.value;
    const nativeEvent = e.nativeEvent as any;
    const numberRegexp = /[0-9]/;
    if (nativeEvent.inputType === 'deleteContentBackward') {
        return value;
    } else if (numberRegexp.test(nativeEvent.data) && value.length < 15) {
        return safeVal(format(value), target);
    } else {
        return safeVal(value.slice(0, -1), target);
    }
};

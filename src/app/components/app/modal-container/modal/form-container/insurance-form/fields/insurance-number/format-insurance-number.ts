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
    if (nativeEvent.inputType === 'deleteContentBackward') {
        return value;
    } else {
        return safeVal(format(value), target);
    }
};

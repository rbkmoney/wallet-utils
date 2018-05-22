import { FormEvent } from 'react';
import { replaceFullWidthChars, safeVal } from '../format-utils';
import { cardFromNumber } from '../card-info';

function format(num: string): string {
    let cardNumber = num.replace(/\D/g, '');
    const card = cardFromNumber(cardNumber);
    if (!card) {
        return cardNumber;
    }
    const upperLength = card.length[card.length.length - 1];
    cardNumber = cardNumber.slice(0, upperLength);
    if (card.format.global) {
        const ref = cardNumber.match(card.format);
        return ref != null ? ref.join(' ') : void 0;
    } else {
        let groups: any = card.format.exec(cardNumber);
        if (groups == null) {
            return;
        }
        groups.shift();
        groups = groups.filter((n: any) => n);
        return groups.join(' ');
    }
}

export function formatCardNumber(e: FormEvent<HTMLInputElement>): number {
    const target = e.currentTarget;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = format(value);
    return safeVal(value, target);
}

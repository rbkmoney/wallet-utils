import { cardFromNumber, luhnCheck } from '../card-info';

export function validateCardNumber(val: string): boolean {
    if (!val) {
        return true;
    }
    let ref;
    const value = (val + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(value)) {
        return true;
    }
    const card = cardFromNumber(value);
    if (!card) {
        return true;
    }
    return !((ref = value.length, [].indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(value)));
}

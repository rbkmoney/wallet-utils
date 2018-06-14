import * as React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as styles from './card-number.scss';
import { Card, cardFromNumber, CardTypes } from '../card-info';
import { Icon, IconType } from 'app/components/ui';
import { FormName, State } from 'app/state';

interface CardTypeIconProps {
    cardNumber: string;
}

function getCardType(cardNumber: string): Card | null {
    if (!cardNumber) {
        return null;
    }
    const typeInfo = cardFromNumber(cardNumber.replace(/\s/g, ''));
    return typeInfo ? typeInfo : null;
}

function findIcon(brand: CardTypes): IconType {
    return Object.keys(IconType).find((key) => key === brand) as IconType;
}

const CardTypeIconDef: React.SFC<CardTypeIconProps> = (props) => {
    const cardType = getCardType(props.cardNumber);
    const icon = cardType ? findIcon(cardType.type) : null;
    return (icon ? <Icon className={styles.cardTypeIcon} icon={icon}/> : null);
};

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

export const CardTypeIcon = connect(mapStateToProps)(CardTypeIconDef);

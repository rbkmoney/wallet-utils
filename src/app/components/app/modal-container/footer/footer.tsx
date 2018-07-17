import * as React from 'react';
import { connect } from 'react-redux';
import {
    footer,
    safe_payment_container,
    safe_payment,
    secure_icon,
    label,
    safe_logos,
    fill_icons,
    align_fix
} from './footer.scss';
import { State } from 'app/state';
import { ActionType } from 'app/config';
import { SecureIcon } from './secure-icon';
import { PciDssIcon } from './pci-dss-icon';
import { McIcon } from './mc-icon';
import { VisaIcon } from './visa-icon';

const cardIcons = () => (
    <div className={safe_payment_container}>
        <div className={safe_payment}>
            <SecureIcon className={secure_icon}/>
            <p className={label}>Безопасная оплата с RBKmoney</p>
        </div>
        <div className={safe_logos}>
            <VisaIcon fillStyle={fill_icons}/>
            <McIcon className={align_fix} fillStyle={fill_icons}/>
            <PciDssIcon className={align_fix} fillStyle={fill_icons}/>
        </div>
    </div>
);

interface FooterDef {
    actionType: ActionType;
}

export const FooterDef: React.SFC<FooterDef> = (props) => (
    <footer className={footer}>
        {props.actionType === ActionType.createOutput ?
            cardIcons()
            : null
        }
    </footer>
);

const mapStateToProps = (state: State) => ({
    actionType: state.config.initConfig.type
});

export const Footer = connect(mapStateToProps)(FooterDef);

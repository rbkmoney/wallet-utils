import * as React from 'react';
import {
    footer,
    safe_payment_container,
    safe_payment,
    secure_icon,
    label,
    safe_logos,
    fill_icons,
    align_fix,
    copyright
} from './footer.scss';
import { SecureIcon } from './secure-icon';
import { PciDssIcon } from './pci-dss-icon';
import { McIcon } from './mc-icon';
import { VisaIcon } from './visa-icon';

export const Footer: React.SFC = () => (
    <footer className={footer}>
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
        <p className={copyright}>
            © 2008-2018 RBKmoney | НКО "ЭПС" (ООО). Лицензия Банка России №3509-К, выдана 11 февраля 2013 г.
            Персональные данные защищены в соответствии с требованиями Федерального закона № 152-ФЗ «О персональных данных» от 27.07.2006 г.
        </p>
    </footer>
);

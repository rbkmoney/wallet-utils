import * as React from 'react';
import * as styles from './footer.scss';
import { SecureIcon } from './secure-icon';
import { PciDssIcon } from './pci-dss-icon';
import { McIcon } from './mc-icon';
import { VisaIcon } from './visa-icon';

export const Footer: React.SFC = () => (
    <footer className={styles.footer}>
        <div className={styles.safe_payment_container}>
            <div className={styles.safe_payment}>
                <SecureIcon className={styles.secure_icon}/>
                <p className={styles.label}>Secure payment with RBKmoney</p>
            </div>
            <div className={styles.safe_logos}>
                <VisaIcon fillStyle={styles.fill_icons}/>
                <McIcon className={styles.align_fix} fillStyle={styles.fill_icons}/>
                <PciDssIcon className={styles.align_fix} fillStyle={styles.fill_icons}/>
            </div>
        </div>
        <p className={styles.copyright}>
            © 2008-2018 RBKmoney | Direct Payments Ltd.
        </p>
        <a href='' className={styles.offer}>
            ['footer.offer.label']
            <hr/>
        </a>
    </footer>
);

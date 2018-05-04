import * as React from 'react';
import * as styles from './info.scss';

const getIdentityChallengeTitle = () => 'Процедура идентификации';
const getCreatePaymentResourceTitle = () => 'Заведение инструмента вывода средств';

export const Info: React.SFC = () => (
    <div className={styles.info}>
        <div>
            <h4 className={styles.company_name} id='company-name-label'>{getIdentityChallengeTitle()}</h4>
            {/*<div>*/}
                {/*<div className={styles.order}>Описание</div>*/}
                {/*<div className={styles.product_description} id='product-description'>Што происходит?</div>*/}
            {/*</div>*/}
        </div>
    </div>
);

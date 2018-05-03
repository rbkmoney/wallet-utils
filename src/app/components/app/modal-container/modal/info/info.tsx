import * as React from 'react';
import * as styles from './info.scss';

export const Info: React.SFC = () => (
    <div className={styles.info}>
        <div>
            <h4 className={styles.company_name} id='company-name-label'>Нейм</h4>
            <div>
                <div className={styles.order}>Лейбл</div>
                <div className={styles.product_description} id='product-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, iure, optio? Ab aperiam asperiores assumenda corporis deserunt dicta, dolores eaque earum eum nesciunt omnis porro quisquam quo quod suscipit tenetur?</div>
            </div>
        </div>
    </div>
);

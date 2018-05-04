import * as React from 'react';
import { info, action_name } from './info.scss';

const getIdentityChallengeTitle = () => 'Процедура идентификации';
const getCreatePaymentResourceTitle = () => 'Заведение инструмента вывода средств';

export const Info: React.SFC = () => (
    <div className={info}>
        <div>
            <h4 className={action_name} id='company-name-label'>{getIdentityChallengeTitle()}</h4>
            {/*<div>*/}
                {/*<div className={label}>Описание</div>*/}
                {/*<div className={action_description} id='product-description'>Што происходит?</div>*/}
            {/*</div>*/}
        </div>
    </div>
);

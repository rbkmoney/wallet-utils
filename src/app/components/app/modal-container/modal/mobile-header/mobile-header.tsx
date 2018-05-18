import * as React from 'react';
import * as cx from 'classnames';
import { header, text, _center } from './mobile-header.scss';

export const MobileHeader: React.SFC = () => (
    <header className={header}>
        <div className={cx(text, {[_center]: true})}>
            Процедура идентификации
        </div>
    </header>
);

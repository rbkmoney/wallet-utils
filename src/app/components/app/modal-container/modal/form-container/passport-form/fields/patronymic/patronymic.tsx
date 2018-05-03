import * as React from 'react';
import { Input } from '../../../input';

export const Patronymic: React.SFC = () => (
    <Input
        placeholder='Отчество'
        mark={true}
        id='passport-patronymic-input'
    />
);

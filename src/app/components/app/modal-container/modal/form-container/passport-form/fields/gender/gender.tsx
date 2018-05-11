import * as React from 'react';
import { formGroup } from '../../../forms.scss';
import { label } from './gender.scss';
import { RadioInput } from '../../../radio-input';

export const Gender: React.SFC = () => (
    <div className={formGroup}>
        <span className={label}>Пол:</span>
        <RadioInput values={[{name: 'gender', value: 'male', label: 'Муж'}, {name: 'gender', value: 'female', label: 'Жен'}]}/>
    </div>
);

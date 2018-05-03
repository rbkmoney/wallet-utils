import * as React from 'react';
import * as formStyles from 'app/styles/forms.scss';
import { Header } from '../header';
import { Issuer, Issued, PassportNumber, Surname, Name, Patronymic, Gender, BirthDate, BirthPlace } from './fields';

export const PassportForm: React.SFC = () => (
    <form>
        <Header key='header' title='Паспорт'/>
        <div key='passport-issuer' className={formStyles.formGroup}>
            <Issuer/>
        </div>
        <div key='passport-issued' className={formStyles.formGroup}>
            <Issued/>
        </div>
        <div key='passport-number' className={formStyles.formGroup}>
            <PassportNumber/>
        </div>
        <div key='passport-surname' className={formStyles.formGroup}>
            <Surname/>
        </div>
        <div key='passport-name' className={formStyles.formGroup}>
            <Name/>
        </div>
        <div key='passport-patronymic' className={formStyles.formGroup}>
            <Patronymic/>
        </div>
        <div key='passport-gender' className={formStyles.formGroup}>
            <Gender/>
        </div>
        <div key='passport-birthdate' className={formStyles.formGroup}>
            <BirthDate/>
        </div>
        <div key='passport-birthplace' className={formStyles.formGroup}>
            <BirthPlace/>
        </div>
    </form>
);

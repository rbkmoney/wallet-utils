import * as React from 'react';
import { Header } from '../header';
import { Issuer, Issued, PassportNumber, Surname, Name, Patronymic, Gender, BirthDate, BirthPlace } from './fields';

export const PassportForm: React.SFC = () => (
    <form>
        <Header key='header' title='Паспорт'/>
        <Issuer/>
        <Issued/>
        <PassportNumber/>
        <Surname/>
        <Name/>
        <Patronymic/>
        <Gender/>
        <BirthDate/>
        <BirthPlace/>
    </form>
);

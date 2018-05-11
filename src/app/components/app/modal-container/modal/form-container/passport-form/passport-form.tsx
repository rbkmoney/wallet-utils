import * as React from 'react';
import { Header } from '../header';
import { Issuer, Issued, PassportNumber, Surname, Name, Patronymic, Gender, BirthDate, BirthPlace } from './fields';
import { Button } from '../button';

export const PassportForm: React.SFC = () => (
    <form>
        <div>
            <Header key='header' title='Паспорт'/>
            <Surname/>
            <Name/>
            <Patronymic/>
            <Gender/>
            <BirthDate/>
            <BirthPlace/>
            <PassportNumber/>
            <Issuer/>
            <Issued/>
        </div>
        <Button
            type='submit'
            style='primary'
            id='pay-btn'>
            Далее
        </Button>
    </form>
);

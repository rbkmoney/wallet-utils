import * as React from 'react';
import { Button } from '../button';
import { Header } from '../header';
import { CardNumber, ExpireDate } from './fields';

export const CardForm: React.SFC = () => (
    <form>
        <div>
            <Header title='Карта для вывода средств'/>
            <CardNumber/>
            <ExpireDate/>
        </div>
        <Button
            type='submit'
            style='primary'
            id='pay-btn'>
            Далее
        </Button>
    </form>
);

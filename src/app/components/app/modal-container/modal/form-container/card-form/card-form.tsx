import * as React from 'react';
import { Button } from '../button';
import { Header } from '../header';
import { CardNumber, ExpireDate } from './fields';

export const CardForm: React.SFC = () => (
    <form>
        <div>
            <Header title='Банковская карта'/>
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

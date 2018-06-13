import * as React from 'react';
import { errorBlock, try_with_other } from './result-form.scss';
import { Button } from '../button';

export class ActionBlock extends React.Component {
    render() {
        return (
            <div className={errorBlock}>
                <Button
                    style='primary'
                    id='retry-btn'>
                    Попробовать еще раз
                </Button>
                <Button
                    style='default'
                    className={try_with_other}
                    id='reenter-btn'>
                    Попробовать с другими данными
                </Button>
            </div>
        );
    }
}

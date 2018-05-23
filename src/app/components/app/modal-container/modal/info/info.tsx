import * as React from 'react';
import { connect } from 'react-redux';
import { info, action_name, label, action_description } from './info.scss';
import { State } from 'app/state';
import { ActionType } from '../../../../../../communication/model';

class InfoContent {
    title: string;
    description: string;
}

const getInfoContent = (type: ActionType): InfoContent => {
    switch (type) {
        case ActionType.userIdentity:
            return {
                title: 'Процедура идентификации',
                description: 'Необходимо ввести паспортные данные и номер СНИЛС'
            };
        case ActionType.createOutput:
            return {
                title: 'Заведение инструмента вывода средств',
                description: 'Необходимо ввести реквизиты карты на которую будут производиться выплаты'
            };
    }
};

interface InfoDefProps {
    actionType: ActionType;
}

export const InfoDef: React.SFC<InfoDefProps> = (props) => {
    const {title, description} = getInfoContent(props.actionType);
    return (
        <div className={info}>
            <div>
                <h4 className={action_name} id='company-name-label'>{title}</h4>
                <div>
                    <div className={label}>Описание</div>
                    <div className={action_description}
                         id='product-description'>{description}</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    actionType: state.config.initConfig.type
});

export const Info = connect(mapStateToProps)(InfoDef);

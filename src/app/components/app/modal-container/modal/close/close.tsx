import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { close } from './close.scss';
import { ResultState } from 'app/state';
import { Icon, IconType } from 'app/components/ui';
import { ResultAction, setResult } from 'app/actions';

interface CloseDefProps {
    setForm: (resultState: ResultState) => ResultAction;
}

export const CloseDef: React.SFC<CloseDefProps> = (props) => (
    <div className={close} onClick={props.setForm.bind(null, ResultState.close)}>
        <Icon icon={IconType.cross}/>
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ResultAction>) => ({
    setForm: bindActionCreators(setResult, dispatch)
});

export const Close = connect(null, mapDispatchToProps)(CloseDef);

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { form, title } from './result-form.scss';
import { setViewInfoHeight } from 'app/actions';
import { ErrorState, State } from 'app/state';
import { ActionType } from '../../../../../../../communication/model';
import { makeContentFromUserIdentity, makeContentFromCreateOutput, ResultFormContent } from './make-content';
import { ActionBlock } from './action-block';

interface ResultFormDefProps {
    actionType: ActionType;
    error: ErrorState;
    setViewInfoHeight: (height: number) => any;
}

export class ResultFormDef extends React.Component<ResultFormDefProps> {
    componentWillMount() {
        this.props.setViewInfoHeight(410);
    }

    render() {
        const { header, description, icon, hasActions } = this.makeContent();
        return (
            <form className={form}>
                <div>
                    <h2 className={title}>{header}</h2>
                    {icon}
                    {description ? description : false}
                    {/*{hasActions ? <ActionBlock/> : false}*/}
                </div>
            </form>
        );
    }

    makeContent(): ResultFormContent {
        switch (this.props.actionType) {
            case ActionType.userIdentity:
                return makeContentFromUserIdentity(this.props.error);
            case ActionType.createOutput:
                return makeContentFromCreateOutput(this.props.error);
        }
    }
}

const mapStateToProps = (state: State) => ({
    actionType: state.config.initConfig.type,
    error: state.error
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);

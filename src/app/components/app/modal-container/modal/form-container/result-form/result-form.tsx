import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setViewInfoHeight } from 'app/actions';

interface ResultFormDefProps {
    setViewInfoHeight: (height: number) => any;
}

export class ResultFormDef extends React.Component<ResultFormDefProps> {
    componentDidMount() {
        this.props.setViewInfoHeight(150);
    }

    render() {
        return (
            <form>
                ResultForm
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

export const ResultForm = connect(null, mapDispatchToProps)(ResultFormDef);

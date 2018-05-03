import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as styles from '../input.scss';
import { Icon, IconType } from 'app/components/ui';

interface MarksProps {
    active: boolean;
    pristine: boolean;
    error: boolean;
}

export const Marks: React.SFC<MarksProps> = (props) => (
    <ReactCSSTransitionGroup
        component='div'
        transitionName={{
            appear: styles.appearMarks,
            enter: styles.enterMarks,
            leave: styles.leaveMarks
        }}
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionAppearTimeout={450}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        {!props.active && !props.error && !props.pristine ? <Icon className={styles.checkmark} icon={IconType.checkmark}/> : false}
        {!props.active && props.error ? <Icon className={styles.errorCross} icon={IconType.redCross}/> : false}
    </ReactCSSTransitionGroup>
);

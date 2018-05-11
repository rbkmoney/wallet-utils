import * as React from 'react';
import { Icon, IconType } from 'app/components/ui';

interface ChevronBackProps {
    className: string;
}

export const ChevronBack: React.SFC<ChevronBackProps> = (props) => (
    <div className={props.className}>
         <Icon icon={IconType.chevronLeft}/>
    </div>
);

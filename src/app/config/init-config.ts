import { ActionType } from '../../communication/model';
import { CreateOutputParams, StartIdentityChallengeParams } from '../../initializer/model';

export class InitConfig {
    token: string;
    type: ActionType;
    params: StartIdentityChallengeParams | CreateOutputParams;
}

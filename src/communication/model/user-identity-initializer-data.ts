import { StartIdentityChallengeParams } from '../../initializer/model';
import { InitializerData } from '.';

export interface UserIdentityInitializerData extends InitializerData {
    params: StartIdentityChallengeParams;
}

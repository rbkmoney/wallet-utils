import { InitializerData } from '.';
import { CreateDestinationParams } from '../../initializer/model';

export interface CreateDestinationInitializerData extends InitializerData {
    params: CreateDestinationParams;
}

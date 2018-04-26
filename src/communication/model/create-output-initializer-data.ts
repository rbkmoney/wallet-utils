import { InitializerData } from '.';
import { CreateOutputParams } from '../../initializer/model';

export interface CreateOutputInitializerData extends InitializerData {
    params: CreateOutputParams;
}

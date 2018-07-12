export enum LogicErrorTypes {
    SchemaViolated = 'SchemaViolated',
    NotFound = 'NotFound',
    WrongType = 'WrongType',
    NotInRange = 'NotInRange',
    WrongSize = 'WrongSize',
    WrongLength = 'WrongLength',
    WrongArray = 'WrongArray',
    NoMatch = 'NoMatch'
}

export interface LogicError {
    errorType: LogicErrorTypes;
    name: string;
    description: string;
    message: string; // TODO: Ошибки чет не аллё с бека сейчас приходят
}

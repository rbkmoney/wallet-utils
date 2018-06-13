import { Named } from 'app/state/modal';

export const findNamed = (items: ReadonlyArray<Named>, name: string): Named =>
    items && name ? items.find((item) => item.name === name) : null;

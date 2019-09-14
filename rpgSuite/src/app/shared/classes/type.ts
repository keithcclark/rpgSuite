import { Subtype } from './subtype';

export class Type {
    id: Number;
    type: String;
    description: String;
    subtypes: Array<Subtype>;
}

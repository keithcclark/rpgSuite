import { Subtype } from './subtype';

export class CreatureType {
    id: Number;
    type: String;
    description: String;
    subtype = new Subtype();
}

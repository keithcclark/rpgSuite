import { ChallengeRating } from './challenge-rating';
import { Alignment } from './alignment';
import { Type } from './type';
import { Size } from './size';
import { Language } from './language';
import { DamageType } from './damage-type';
import { Sense } from './sense';
import { Speed } from './speed';
import { Condition } from './condition';

export class Monster {
    // from the database
    name: string;
    strength: number;
    dexterity: number;
    constitution: Number;
    intelligence: Number;
    wisdom: number;
    charisma: number;
    armor_class: number;
    hit_points: number;
    hit_dice: string;
    savingThrows: [];
    challenge_rating: ChallengeRating;
    creature_type: Type;
    alignment: Alignment;
    creature_size: Size;
    languages = new Array<Language>();
    traits = new Array<any>();
    actions = new Array<any>();
    reactions = new Array<any>();
    legendaryActions = new Array<any>();
    environments = new Array<any>();
    damageVulnerability = new Array<DamageType>();
    damageResistance = new Array<DamageType>();
    damageImmunity = new Array<DamageType>();
    conditionImmunity = new Array<Condition>();
    senses = new Array<Sense>();
    speeds = new Array<Speed>();
    skills = new Array<any>();
    image: Blob;
    // used in the front end;
    faction: string;
    initiative: number;
    combathp: number;
    combatac: number;
    combatpp: number;
}




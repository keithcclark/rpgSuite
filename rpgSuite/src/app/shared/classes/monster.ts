import { ChallengeRating } from './challenge-rating';
import { Alignment } from './alignment';
import { Type } from './type';
import { Size } from './size';
import { Language } from './language';
import { DamageType } from './damage-type';
import { Sense } from './sense';
import { Speed } from './speed';
import { Condition } from './condition';
import { CreatureType } from './creature-type';
import { Subtype } from './subtype';
import { SkillProf } from './skill-prof';

export class Monster {
    // from the database
    name: String;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    armor_class: number;
    hit_points: number;
    hit_dice: String;
    savingThrows: [];
    challenge_rating: ChallengeRating;
    creature_type: CreatureType;
    creature_subtype: Subtype;
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
    skills = new Array<SkillProf>();
    image: Blob;
    // used in the front end;
    faction: String;
    initiative: Number;
    combathp: Number;
    combatac: Number;
    combatpp: Number;
}




import { ChallengeRating } from './challenge-rating';
import { Alignment } from './alignment';

export class Monster {
    // from the database
    name: string;
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    armor_class: number;
    hit_points: number;
    hit_dice: string;
    savingThrows: [];
    challenge_rating: ChallengeRating;
    creature_type: any;
    alignment: Alignment;
    creature_size: any;
    languages = new Array<any>();
    traits = new Array<any>();
    actions = new Array<any>();
    reactions = new Array<any>();
    legendaryActions = new Array<any>();
    environments = new Array<any>();
    damageVulnerability = new Array<any>();
    damageResistance = new Array<any>();
    damageImmunity = new Array<any>();
    senses = new Array<any>();
    speeds = new Array<any>();
    skills = new Array<any>();
    image: Blob;
    // used in the front end;
    faction: string;
    initiative: number;
    combathp: number;
    combatac: number;
    combatpp: number;
}




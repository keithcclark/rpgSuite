import { ChallengeRating } from './challenge-rating';

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
    alignment: any;
    creature_size: any;
    languages = new Array<any>();
    traits = new Array<any>();
    actions = new Array<any>();
    reactions = new Array<any>();
    legendaryActions= new Array<any>();
    environments = new Array<any>();
    damageVulnerability = new Array<any>();
    damageResistance = new Array<any>();
    damageImmunity = new Array<any>();
    senses = new Array<any>();
    speeds = new Array<any>();
    skills = new Array<any>();
    image: Blob;
    // used in the front end;
    initiative: number;
    combathp: number;
    faction: string;
}




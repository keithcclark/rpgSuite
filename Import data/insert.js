window.onload = function () {
    //console.log("Show me what you got!");
    document.getElementById("b").addEventListener("click", fill);
    document.getElementById("add").addEventListener("click", startAdd);
}
urls = new Array();
monsters = new Array();

let promiseURLs = function () {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = getURLs;
        xhr.open("GET", "http://www.dnd5eapi.co/api/monsters");
        xhr.send();
        function getURLs() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log("INSIDE the OUTSIDE")
                var data = JSON.parse(xhr.responseText);
                list = data.results;
                var i = 0;
                //console.log("FIrst Spin")
                for (let info in list) {
                    urls[i] = JSON.stringify(list[info].url);
                    i++
                }
                resolve();
            }
        }
    });
}

function getMonsters(index, url) {
    let xhrM = new XMLHttpRequest();
    xhrM.onreadystatechange = addMonster;
    var number = url.substring(url.lastIndexOf("/") + 1);
    var number = number.replace('"', '');
    xhrM.open("GET", "http://www.dnd5eapi.co/api/monsters/" + number);
    xhrM.send();
    function addMonster() {
        if (xhrM.readyState === 4 && xhrM.status === 200) {
            beast = JSON.parse(xhrM.responseText);
            monsters[index] = beast;
            if (number > 324) {
                //console.log("Imported")
                document.getElementById("step2").style.display ="block";
                return;
            } else {
                index++;
                document.getElementById("count").style.display = "block";
                document.getElementById("count").innerHTML = "Count: " + index + "/324"; 
                getMonsters(index, urls[index]);
            }
        }
    }
}


function fill() {
   // console.log("Start")
    promiseURLs().then(function () {
        //console.log("First Promise complete, starting Monster");
        getMonsters(0, urls[0]);
    });
}

function startAdd() {
    add(0);
}
function add(index) {
    var creature = new monster();
    setMonster(creature, monsters[index]);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = insert;
    xhr.open("POST", "http://localhost:3434/creatures");
    xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(JSON.stringify(creature));
    xhr.send(JSON.stringify(creature));
    function insert() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (index < 324) {
                document.getElementById("insert").style.display = "block";
                document.getElementById("insert").innerHTML = "Count: " + index + "/324";
                index++;
                add(index);
            }
        }
    }
}

class cAttack{
    constructor(name, description,damageBonus, damageDice, attackBonus){
        this.name = name;
        this.description = description;
        this.attackBonus = attackBonus;
        this.damageDice = damageDice;
        this.damageBonus = damageBonus;
    }
}

class cTraits {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class cSpeed{
    constructor(speed, distance){
        this.speed = speed;
        this.distance = distance;
    }
}
class dSpeed{
    constructor(id){
        this.id = id;
    }
}

class cSense{
    constructor(sense, distance){
        this.sense = sense;
        this.distance = distance;
    }
}
class dSense{
    constructor(id){
        this.id=id;
    }
}
class cSave{
    constructor(stat,modifier){
        this.stat=stat;
        this.modifier=modifier;
    }
}
class cSkill{
    constructor(skill,bonus){
        this.skills = skill;
        this.bonus = bonus;
    }
}
class dSkill{
    constructor(id){
        this.id=id;
    }
}
class monster {
    traits = [];
    actions = [];
    legendaryActions = [];
    reactions = [];
    speeds= [];
    senses=[];
    languages=[];
    savingThrows=[];
    skills=[];
    damageVulnerability= [];
    damageResistance = [];
    damageImmunity= [];
    conditionImmunity= [];
	subtype;
}

function setMonster(creature, m) {
    creature.name = m.name;
    checkSize(m.size, creature);
    checkType(m.type, creature);
	checkSubType(m.subtype, creature);
    checkAlign(m.alignment,creature);
    checkSaves(creature, m);
    checkSkills(creature, m);
    creature.hit_points = m.hit_points;
    creature.hit_dice = m.hit_dice;
    creature.strength = m.strength;
    creature.dexterity = m.dexterity;
    creature.constitution = m.constitution;
    creature.wisdom = m.wisdom;
    creature.intelligence = m.intelligence;
    creature.charisma = m.charisma;
    creature.armor_class = m.armor_class;
    creature.challenge_rating = {cr:String(m.challenge_rating)};
    for (let abil in m.special_abilities) {
        var abili = m.special_abilities[abil];
        var t = new cTraits(abili.name, abili.desc);
        creature.traits.push(t);
    }
    for (let a in m.actions) {
        var act = m.actions[a];
        var t = new cAttack(act.name, act.desc, act.damage_bonus, act.damage_dice, act.attack_bonus);
        creature.actions.push(t);
    }
    for (let la in m.legendary_actions) {
        var act = m.legendary_actions[la];
        var t = new cTraits(act.name, act.desc);
        creature.legendaryActions.push(t);
    }
    for (let re in m.reactions) {
        var react = m.reactions[re];
        var t = new cTraits(react.name, react.desc);
        creature.reactions.push(t);
    }
    speeds= [];
    travel = m.speed.split(",").map(item=>item.trim());
    travel.forEach(function(item){speeds.push(item.split(" "))});
    speeds.forEach(function(speed){
        checkSpeed(speed,creature);
    });
    senses = [];
    vision = m.senses.split(",").map(item=>item.trim());
    vision.forEach(function(item){senses.push(item.split(" "))});
    senses.forEach(function (sense){
        checkSense(sense, creature);
    });
    languages = []
    l = m.languages.split(",").map(item => item.trim());
    l.forEach(function(item){languages.push(item.split(" "))});
    languages.forEach(function(lang){
        checkLanguages(lang, creature);
    })
    d = m.damage_vulnerabilities.split(",").map(item => item.trim());
    d.forEach(function (type){
        checkDamage(type,creature.damageVulnerability);
    });
    d = m.damage_resistances.split(",").map(item => item.trim());
    d.forEach(function (type){
        checkDamage(type,creature.damageResistance);
    });
    d = m.damage_immunities.split(",").map(item => item.trim());
    d.forEach(function (type){
        checkDamage(type,creature.damageImmunity);
    });
}
function checkType(type, creature) {
    switch (type) {
        case "aberration": {
            creature.creature_type = { "id": 1 };
            break
        }
        case "beast": {
            creature.creature_type = { "id": 2 };
            break;
        }
        case "celestial": {
            creature.creature_type = { "id": 3 };
            break;
        }
        case "construct": {
            creature.creature_type = { "id": 4 };
            break;
        }
        case "dragon": {
            creature.creature_type = { "id": 5 };
            break;
        }
        case "elemental": {
            creature.creature_type = { "id": 6 };
            break;
        }
        case "fey": {
            creature.creature_type = { "id": 7 };
            break;
        }
        case "fiend": {
            creature.creature_type = { "id": 8 };
            break;
        }
        case "giant": {
            creature.creature_type = { "id": 9 };
            break;
        }
        case "humanoid": {
            creature.creature_type = { "id": 10 };
            break;
        }
        case "monstrosity": {
            creature.creature_type = { "id": 11 };
            break;
        }
        case "ooze": {
            creature.creature_type = { "id": 12 };
            break;
        }
        case "plant": {
            creature.creature_type = { "id": 13 };
            break;
        }
        case "undead": {
            creature.creature_type = { "id": 14 };
            break;
        }
    }
}

function checkSubType(subtype, creature){
	switch(subtype){
		case "": {
            creature.subtype = null;
            break;
        }
		case "aarakocra": {
            creature.subtype = { "id": 1 };
            break;
        }
		case "any race": {
            creature.subtype = { "id": 2 };
            break;
        }
		case "bullywug": {
            creature.subtype = { "id": 3 };
            break;
        }
		case "derro": {
            creature.subtype = { "id": 4 };
            break;
        }
		case "dragonborn": {
            creature.subtype = { "id": 5 };
            break;
        }
		case "dwarf": {
            creature.subtype = { "id": 6 };
            break;
        }
		case "elf": {
            creature.subtype = { "id": 7 };
            break;
        }
		case "firenewt": {
            creature.subtype = { "id": 8 };
            break;
        }
		case "gith": {
            creature.subtype = { "id": 9 };
            break;
        }
		case "gnoll": {
            creature.subtype = { "id": 10 };
            break;
        }
		case "goblinoid": {
            creature.subtype = { "id": 11 };
            break;
        }
		case "grimlock": {
            creature.subtype = { "id": 12 };
            break;
        }
		case "grung": {
            creature.subtype = { "id": 13 };
            break;
        }
		case "half-dragon": {
            creature.subtype = { "id": 14 };
            break;
        }
		case "half-elf": {
            creature.subtype = { "id": 15 };
            break;
        }
		case "halfling": {
            creature.subtype = { "id": 16 };
            break;
        }
		case "half-orc": {
            creature.subtype = { "id": 17 };
            break;
		}
		case "human": {
            creature.subtype = { "id": 18 };
            break;
		}
		case "kenku": {
            creature.subtype = { "id": 19 };
            break;
        }
		case "kobold": {
            creature.subtype = { "id": 20 };
            break;
        }
		case "kraul": {
            creature.subtype = { "id": 21 };
            break;
        }
		case "kuo-toa": {
            creature.subtype = { "id": 22 };
            break;
        }
		case "lizardfolk": {
            creature.subtype = { "id": 23 };
            break;
        }
		case "locathah": {
            creature.subtype = { "id": 24 };
            break;
        }
		case "meazel": {
            creature.subtype = { "id": 25 };
            break;
        }
		case "merfolk": {
            creature.subtype = { "id": 26 };
            break;
        }
		case "nagpa": {
            creature.subtype = { "id": 27 };
            break;
        }
		case "orc": {
            creature.subtype = { "id": 28 };
            break;
        }
		case "quaggoth": {
            creature.subtype = { "id": 29 };
            break;
        }
		case "simic hybrid": {
            creature.subtype = { "id": 30 };
            break;
        }
		case "sahuagin": {
            creature.subtype = { "id": 31 };
            break;
        }
		case "saurial": {
            creature.subtype = { "id": 32 };
            break;
        }
		case "tiefling": {
            creature.subtype = { "id": 33 };
            break;
        }
		case "tortle": {
            creature.subtype = { "id": 34 };
            break;
        }
		case "triton": {
            creature.subtype = { "id": 35 };
            break;
        }
		case "yuan-ti": {
            creature.subtype = { "id": 36 };
            break;
        }
		case "xvart": {
            creature.subtype = { "id": 37 };
            break;
        }
		case "angel": {
            creature.subtype = { "id": 38 };
            break;
        }
		case "titan": {
            creature.subtype = { "id": 39 };
            break;
        }
		case "cloud giant": {
            creature.subtype = { "id": 40 };
            break;
        }
		case "fire giant": {
            creature.subtype = { "id": 41 };
            break;
        }
		case "frost giant": {
            creature.subtype = { "id": 42 };
            break;
        }
		case "hill giant": {
            creature.subtype = { "id": 43 };
            break;
        }
		case "stone giant": {
            creature.subtype = { "id": 44 };
            break;
        }
		case "storm giant": {
            creature.subtype = { "id": 45 };
            break;
        }
		case "demon": {
            creature.subtype = { "id": 46 };
            break;
        }
		case "devil": {
            creature.subtype = { "id": 47 };
            break;
        }
		case "yagnoloth": {
            creature.subtype = { "id": 48 };
            break;
        }
		case "shapechanger": {
            creature.subtype = { "id": 50 };
            break;
        }
		case "inevitable": {
            creature.subtype = { "id": 51 };
            break;
        }
		
	}
}

function checkAlign(align, creature) {
    switch (align) {
        case "lawful good": {
            creature.alignment = { "id": 1 };
            break;
        }
        case "neutral good": {
            creature.alignment = { "id": 2 };
            break;
        }
        case "chaotic good": {
            creature.alignment = { "id": 3 };
            break;
        }
        case "Lawful neutral": {
            creature.alignment = { "id": 4 };
            break;
        }
        case "neutral": {
            creature.alignment = { "id": 5 };
            break;
        }
        case "chaotic neutral": {
            creature.alignment = { "id": 6 };
            break;
        }
        case "lawful evil": {
            creature.alignment = { "id": 7 };
            break;
        }
        case "neutral evil": {
            creature.alignment = { "id": 8 };
            break;
        }
        case "chaotic evil": {
            creature.alignment = { "id": 9 };
            break;
        }
        case "unaligned": {
            creature.alignment = { "id": 10 };
            break;
        }
        default: {
            creature.alignment = { "id": 11 };
            break;
        }    
    }
}
function checkSize(size, creature) {
    switch (size) {
        case "Tiny": {
            creature.creature_size = { "id": 1 };
            break;
        }
        case "Small": {
            creature.creature_size = { "id": 2 };
            break;
        }
        case "Medium": {
            creature.creature_size = { "id": 3 };
            break;
        }
        case "Large": {
            creature.creature_size = { "id": 4 };
            break;
        }
        case "Huge": {
            creature.creature_size = { "id": 5 };
            break;
        }
        case "Gargantuan": {
            creature.creature_size = { "id": 6 };
            break;
        }
        default: {
            creature.creature_size = { "id": 3 };
        }
    }
}
function checkSpeed(speed, creature){
    var s;
    switch(speed[0]){
        case "burrow":{
            s = new cSpeed(new dSpeed(2), +speed[1]);
            creature.speeds.push(s);
            break;
        }
        case "climb":{
            s = new cSpeed(new dSpeed(3), +speed[1]);
            creature.speeds.push(s);
            break;
        }
        case "fly":{
            s = new cSpeed(new dSpeed(4), +speed[1]);
            creature.speeds.push(s);
            break;
        }
        case "swim":{
            s = new cSpeed(new dSpeed(5), +speed[1]);
            creature.speeds.push(s);
            break;
        }
        default:{
            s = new cSpeed(new dSpeed(1), +speed[0]);
            creature.speeds.push(s);
        }
    }
}
function checkSense(sense,creature){
    var s;
    switch(sense[0]){
        case "passive":{
            s = new cSense(new dSense(1),+sense[2]);
            creature.senses.push(s);
            break;
            
        }
        case "blindsight":{
            s = new cSense(new dSense(2),+sense[1]);
            creature.senses.push(s);
            break;
        }
        case "darkvision":{
            s = new cSense(new dSense(3),+sense[1]);
            creature.senses.push(s);
            break;
        }
        case "tremorsense":{
            s = new cSense(new dSense(4),+sense[1]);
            creature.senses.push(s);
            break;
        }
        case "truesight":{
            s = new cSense(new dSense(5),+sense[1]);
            creature.senses.push(s);
            break;
        }
    }
}
function checkLanguages(lang,creature){
    switch(lang[0]){
        case "Common":{
            creature.languages.push({"id" : 1});
            break;
        }
        case "Dwarvish":{
            creature.languages.push({"id" : 2});
            break;
        }
        case "Elvish":{
            creature.languages.push({"id" : 3});
            break;
        }
        case "Giant":{
            creature.languages.push({"id" : 4});
            break;
        }
        case "Gnomish":{
            creature.languages.push({"id" : 5});
            break;
        }
        case "Goblin":{
            creature.languages.push({"id" : 6});
            break;
        }
        case "Halfling":{
            creature.languages.push({"id" : 7});
            break;
        }
        case "Orc":{
            creature.languages.push({"id" : 8});
            break;
        }
        case "Abyssal":{
            creature.languages.push({"id" : 9});
            break;
        }
        case "Celestial":{
            creature.languages.push({"id" : 10});
            break;
        }
        case "Draconic":{
            creature.languages.push({"id" : 11});
            break;
        }
        case "Deep":{
            creature.languages.push({"id" : 12});
            break;
        }
        case "Infernal":{
            creature.languages.push({"id" : 13});
            break;
        }
        case "Auran":{
            creature.languages.push({"id" : 14});
            break;
        }
        case "Ignan":{
            creature.languages.push({"id" : 15});
            break;
        }
        case "Terran":{
            creature.languages.push({"id" : 16});
            break;
        }
        case "Sylvan":{
            creature.languages.push({"id" : 17});
            break;
        }
        case "Aarakocra":{
            creature.languages.push({"id" : 18});
            break;
        }
        case "Druidic":{
            creature.languages.push({"id" : 19});
            break;
        }
        case "Gith":{
            creature.languages.push({"id" : 20});
            break;
        }
        case "Theieves":{
            creature.languages.push({"id" : 21});
            break;
        }
        case "telepathy":{
            creature.languages.push({"id" : 22});
            break;
        }
        case "Aquan":{
            creature.languages.push({"id" : 23});
            break;
        }
    }
}
function checkSaves(creature, m){
    if(m.strength_save){
        var s = new cSave("STR", +m.strength_save)
        creature.savingThrows.push(s);
    }
    if(m.dexterity_save){
        var s = new cSave("DEX", +m.dexterity_save)
        creature.savingThrows.push(s);
    }
    if(m.constitution_save){
        var s = new cSave("CON", +m.constitution_save)
        creature.savingThrows.push(s);
    }
    if(m.intelligence_save){
        var s = new cSave("INT", +m.intelligence_save)
        creature.savingThrows.push(s);
    }
    if(m.wisdom_save){
        var s = new cSave("WIS", +m.wisdom_save)
        creature.savingThrows.push(s);
    }
    if(m.charisma_save){
        var s = new cSave("CHR", +m.charisma_save)
        creature.savingThrows.push(s);
    }     
}
function checkSkills(creature, m){
    if(m.athletics){
        var t = new cSkill(new dSkill(1), m.athletics)
        creature.skills.push(t);
    }
    if(m.acrobatics){
        var t = new cSkill(new dSkill(2), m.acrobatics)
        creature.skills.push(t);
    }
    //Sleight of Hand                   3
    if(m.stealth){
        var t = new cSkill(new dSkill(4), m.stealth)
        creature.skills.push(t);
    }
    if(m.arcana){
        var t = new cSkill(new dSkill(5), m.arcana)
        creature.skills.push(t);
    }
    if(m.history){
        var t = new cSkill(new dSkill(6), m.history)
        creature.skills.push(t);
    }
    if(m.investigation){
        var t = new cSkill(new dSkill(7), m.investigation)
        creature.skills.push(t);
    }
    if(m.nature){
        var t = new cSkill(new dSkill(8), m.nature)
        creature.skills.push(t);
    }
    if(m.religion){
        var t = new cSkill(new dSkill(9), m.religion)
        creature.skills.push(t);
    }
    //Animal Handling               10
    if(m.insight){
        var t = new cSkill(new dSkill(11), m.insight)
        creature.skills.push(t);
    }
    if(m.medicine){
        var t = new cSkill(new dSkill(12), m.medicine)
        creature.skills.push(t);
    }
    if(m.perception){
        var t = new cSkill(new dSkill(13), m.perception)
        creature.skills.push(t);
    }
    if(m.survival){
        var t = new cSkill(new dSkill(14), m.survival)
        creature.skills.push(t);
    }
    if(m.deception){
        var t = new cSkill(new dSkill(15), m.deception)
        creature.skills.push(t);
    }
    if(m.intimidation){
        var t = new cSkill(new dSkill(16), m.intimidation)
        creature.skills.push(t);
    }
    if(m.performance){
        var t = new cSkill(new dSkill(17), m.performance)
        creature.skills.push(t);
    }
    if(m.persuasion){
        var t = new cSkill(new dSkill(18), m.persuasion)
        creature.skills.push(t);
    }
}
function checkDamage(type, array){
    switch(type){
        case "acid":{
            array.push({"id":1});
            break;
        }
        case "bludgeoning":{
            array.push({"id":2});
            break;
        }
        case "cold":{
            array.push({"id":3});
            break;
        }
        case "fire":{
            array.push({"id":4})
            break;
        }
        case "force":{
            array.push({"id":5})
            break;
        }
        case "lightning":{
            array.push({"id":6})
            break;
        }
        case "necrotic":{
            array.push({"id":7})
            break;
        }
        case "piercing":{
            array.push({"id":8})
            break;
        }
        case "poison":{
            array.push({"id":9})
            break;
        }
        case "psychic":{
            array.push({"id":10})
            break;
        }
        case "radiant":{
            array.push({"id":11})
            break;
        }
        case "slashing":{
            array.push({"id":12})
            break;
        }
        case "thunder":{
            array.push({"id":13})
            break;
        }
    }
}
cre = new monster();
a = "40 ft., fly 80 ft., swim 40 ft.";
var travel;
travel = a.split(",").map(item=>item.trim());
speeds = [];
travel.forEach(function(item){speeds.push(item.split(" "))});
speeds.forEach(function(speed){
    checkSpeed(speed,cre);
})
/*
 * Computes how much damage a character would do
 * to another character in case of a successful attack
 */
function get_hit_points(attacker, defender, technique) {
    var hit = attacker.strength + technique.strength - defender.defense;
    if (hit < 0)
        hit = 0;
    return hit;
}
/*
 * Computes the probability of a succesful attack
 * Integer from 0 to 100
 */
function get_hit_rate(attacker, defender, technique) {
    var attacker_hit = attacker.skill + technique.skill +
            attacker.speed + technique.speed;
    var defender_hit = defender.skill + defender.speed;
    var hit = attacker_hit * 1.75 - defender_hit;
    hit = Math.floor(hit);
    if (hit < 0)
        hit = 0;
    if (hit > 100)
        hit = 100;
    return hit;
}
/*
 * Attack Prediction class
 */
function AttackPrediction(attacker, defender, technique) {
    this.hit_points = get_hit_points(attacker, defender, technique);
    this.hit_rate = get_hit_rate(attacker, defender, technique);
    this.attacker = attacker;
    this.defender = defender;
    this.technique = technique;
}
/*
 * Attack class
 */
function Attack(attacker, defender, technique) {
    this.attacker = attacker;
    this.defender = defender;
    this.technique = technique;
    var hit_rate = get_hit_rate(attacker, defender, technique);
    if (dice(100) <= hit_rate) {
        this.success = true;
        this.hit_points = get_hit_points(attacker, defender, technique);
        defender.HP_current -= this.hit_points;
    } else {
        this.success = false;
        this.hit_points = 0;
    }
    if (defender.HP_current <= 0) {
        defender.HP_current = 0;
        this.defeat = true;
    } else
        this.defeat = false;
}
class Unit {
    constructor(health = 100, power = 1) {
        this.health = health;
        this.power  = power;
     }
     /*
     get health() {
         return this.health;
     }

     set health(value) {
         this.health = value;
     }

     get power() {
         return this.power;
     }

     set power(value) {
         this.power = value;
     }
     */
}

class Zombie extends Unit {
    constructor() {
        super(1000, 10);
    }

    static color() {
        return '#FFA500';
    }
}

class Civil extends Unit {
    constructor(health, power) {
        super(health, power);
    }

    static color() {
        return '#00FF00';
    }
}
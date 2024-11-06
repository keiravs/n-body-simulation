let G = 50;     // Variable gravitational constant
let ScaleFactor = 0.05;     // Scalefactor

class Body{
    constructor(x, y, v1, v2, mass, colour){
        this.pos = createVector(x, y);
        this.velocity = createVector(v1, v2);
        this.acceleration = createVector(0, 0);
        this.mass = mass;
        this.r = sqrt(mass)*2;
        this.history = [];
        this.colour = colour;
    }

    getdir(other){
        return p5.Vector.sub(this.pos, other.pos);
    }

    // Method to calculate magnitute of gravitational force exerted on 'other' body
    // f = G*(m1*m2)/(distance**2)
    attract(other){
        let dir = this.getdir(other);
        let disSq = constrain(dir.magSq(), 100, 1000);

        let magnitute = G * ((this.mass * other.mass)/disSq) * ScaleFactor;       // magnitude of force applied
        let force = dir.setMag(magnitute);
        other.applyForce(force);
    }

    // Updates body's acceleration vector with force parameter
    // F = ma, therefore, a = F/m
    applyForce(force){
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update(){
        this.history.push(this.pos.copy());    // Push current pos to history before updating
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.set(0, 0);

        if (this.history.length > 80) {
            this.history.splice(0, 1);
          }
    }

    // Method draws a path behind the body. The path tapers off in size
    drawPath(){
        stroke(this.colour);
        let scaled = max(0.80 * this.r, 1.5);     // Initial strokeWeight of stars is 80% of body's radius
        let divisionSize = scaled/this.history.length;
        for(let i=this.history.length-1; i>0; i--){
            let amount = i*divisionSize;
            strokeWeight(amount);
            if(i > 0){
                let pos = this.history[i];
                let pos2 = this.history[i-1];
                line(pos.x, pos.y, pos2.x, pos2.y);
            }
        }
    }

    show(){
        stroke(this.colour);
        strokeWeight(2);

        this.drawPath();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r*2);
    }
}
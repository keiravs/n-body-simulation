function setup(){
    createCanvas(800, 800);
    background(0);

    // Stars
    body1 = new Body(400, 100, 0, 1, 33, "blue");
    body2 = new Body(100, 700, 0, -2, 24, "red");
    body3 = new Body(700, 700, 0, 1, 16, "green");

    // Planet
    body4 = new Body(300, 200, 0, 0, 0.01, "orange");
}

function draw(){
    background(0);

    body1.update();
    body1.show();
    body2.update();
    body2.show();
    body3.update();
    body3.show();

    body4.update();
    body4.show();

    body1.attract(body2);
    body1.attract(body3);
    body1.attract(body4);

    body2.attract(body1);
    body2.attract(body3);
    body2.attract(body4);

    body3.attract(body1);
    body3.attract(body2);
    body3.attract(body4);

    body4.attract(body1);
    body4.attract(body2);
    body4.attract(body3);
}
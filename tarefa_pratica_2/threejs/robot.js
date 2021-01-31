// Function to generate robot
// The strategy below is just a suggestion, you may change the shapes to create your customized robot

function gen_robot() {
    // Creating Group (not nec;essary, but better readability)
    var robot = new THREE.Group();

    //HEADPHONE for anim2
    var headphone = new THREE.Group();
    headphone.name = "headphone";

    var hl1 = gen_rect(.5,1, '#FFFFFF');
    hl1.position.x = -0.75
    var hl2 = gen_rect(.1,1.5, '#FFFFFF');
    hl2.position.x = -.75
    hl2.position.y = 1.25;
    var hr1 = gen_rect(.5,1, '#FFFFFF');
    hr1.position.x = 2.25;
    var hr2 = gen_rect(.1,1.5, '#FFFFFF');
    hr2.position.y = 1.25;
    hr2.position.x = 2.25;
    var hm = gen_rect(3,.1, '#FFFFFF');
    hm.position.y = 2;
    hm.position.x = 0.75;

    headphone.position.x = -.75
    headphone.position.y = 20
    headphone.position.z = .5
    headphone.add(hl1);
    headphone.add(hl2);
    headphone.add(hm);
    headphone.add(hr1);
    headphone.add(hr2);


    // torso
    var torso = gen_rect(4, 6);
    torso.name = "torso";

    // head
    var head = gen_circle(1.6);
    head.name = "head";
    head.position.y = 4.8;
    head.position.z = -0.25;  // Not necessary, makes head not in front of other robot parts

    var left_eye = gen_circle(0.3);
    left_eye.name = "left_eye";
    left_eye.position.x = -0.5;

    var right_eye = gen_circle(0.3);
    right_eye.name = "right_eye";
    right_eye.position.x = 0.5;

    // left: upper arm, arm, hand
    var left_upper_arm = gen_rect(1.5, 4);
    left_upper_arm.name = "left_upper_arm";
    left_upper_arm.position.x = -3;
    left_upper_arm.position.y = 1;

    var left_lower_arm = gen_rect(1, 3);
    left_lower_arm.name = "left_lower_arm";
    left_lower_arm.position.y = -3;

    var left_hand = gen_rect(1,1);
    left_hand.name = "left_hand";
    left_hand.position.y = -2.25;

    var left_upper_leg = gen_rect(1.4, 3);
    left_upper_leg.name = "left_upper_leg";
    left_upper_leg.position.y = -4.5;
    left_upper_leg.position.x = -1.25;

    var left_lower_leg = gen_rect(1.4, 3);
    left_lower_leg.name = "left_lower_leg";
    left_lower_leg.position.y =-3.1;

    var left_foot = gen_rect(1.25,1);
    left_foot.name = "left_foot";
    left_foot.position.y = -2.1;

    left_upper_arm.add(left_lower_arm);
    left_lower_arm.add(left_hand);
    left_upper_leg.add(left_lower_leg);
    left_lower_leg.add(left_foot);

    // right: upper arm, arm, hand
    var right_upper_arm = gen_rect(1.5, 4);
    right_upper_arm.name = "right_upper_arm";
    right_upper_arm.position.x = 3;
    right_upper_arm.position.y = 1;

    var right_lower_arm = gen_rect(1, 3);
    right_lower_arm.name = "right_lower_arm";
    right_lower_arm.position.y = -3;

    var right_hand = gen_rect(1,1);
    right_hand.name = "right_hand";
    right_hand.position.y = -2.25;

    var right_upper_leg = gen_rect(1.4, 3);
    right_upper_leg.name = "right_upper_leg";
    right_upper_leg.position.y = -4.5;
    right_upper_leg.position.x = 1.25;

    var right_lower_leg = gen_rect(1.4, 3);
    right_lower_leg.name = "right_lower_leg";
    right_lower_leg.position.y =-3.1;

    var right_foot = gen_rect(1.25,1);
    right_foot.name = "right_foot";
    right_foot.position.y = -2.1;

    var emptyM4 = gen_rect(0,0);
    emptyM4.name = "M4";
    emptyM4.position.y = - 200;

    right_upper_arm.add(right_lower_arm);
    right_lower_arm.add(right_hand);
    right_upper_leg.add(right_lower_leg);
    right_lower_leg.add(right_foot);

    // Creating hieararchy
    robot.add(torso);
    robot.add(headphone);
    torso.add(head);
    head.add(left_eye);
    head.add(right_eye);
    torso.add(right_upper_arm);
    torso.add(right_upper_leg);
    torso.add(left_upper_leg);
    torso.add(left_upper_arm);
    robot.add(emptyM4);
    // TO DO: add remaining robot parts hierarchical relations


    robot.name = "robot";

    return robot
}


// Auxiliary function to generate rectangle
function gen_rect( width, height, c = Math.random() * 0xffffff ) {
    var plane_geometry = new THREE.PlaneGeometry( width, height );
    var plane_material = new THREE.MeshBasicMaterial( {color: c, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh(plane_geometry, plane_material);

    return plane;
}

// Auxiliary function to generate circle
function gen_circle( radius, segs = 30 ) {
    var circle_geometry = new THREE.CircleGeometry( radius, segs);
    var circle_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
    var circle = new THREE.Mesh(circle_geometry, circle_material);

    return circle
}

// Auxiliary function to generate triangle
function gen_triangle( size, v1 = new THREE.Vector3(-1, 0, 0), v2 = new THREE.Vector3(1, 0, 0), v3 = new THREE.Vector3(-1, 1, 0) ) {
    var triangle_geometry = new THREE.Geometry();
    var triangle = new THREE.Triangle(v1, v2, v3);
    var normal = triangle.normal();
    triangle_geometry.vertices.push(triangle.a);
    triangle_geometry.vertices.push(triangle.b);
    triangle_geometry.vertices.push(triangle.c);
    triangle_geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    var triangle = new THREE.Mesh(triangle_geometry, new THREE.MeshNormalMaterial());

    triangle.size = size;

    return triangle;
}

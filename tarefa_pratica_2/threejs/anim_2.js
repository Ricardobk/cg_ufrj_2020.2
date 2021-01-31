function Vibing() {}

Object.assign( Vibing.prototype, {

    init: function() {
		let left_upper_leg =  robot.getObjectByName("left_upper_leg");
		let right_upper_leg =  robot.getObjectByName("right_upper_leg");
		let torso =  robot.getObjectByName("torso");
		let head = robot.getObjectByName("head");
		let right_upper_arm = robot.getObjectByName("right_upper_arm");
		let left_upper_arm = robot.getObjectByName("left_upper_arm");
		let left_lower_leg = robot.getObjectByName("left_lower_leg");
		let left_eye = robot.getObjectByName("left_eye");
		let right_eye = robot.getObjectByName("right_eye");
		let headphone = robot.getObjectByName("headphone");
		let left_lower_arm = robot.getObjectByName("left_lower_arm");
		let right_lower_arm = robot.getObjectByName("right_lower_arm");
		let left_foot = robot.getObjectByName("left_foot");


        let sitDownRotation = new TWEEN.Tween( {theta:0} )
        .to( {theta:-Math.PI/2 }, 1000)
        .onUpdate(function(){
            // This is an example of rotation of the right_upper_arm
            // Notice that the transform is M = T * R

            left_upper_leg.matrix.makeRotationX(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_upper_leg.position.x, left_upper_leg.position.y, -0.1 ) );
			right_upper_leg.matrix.makeRotationX(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_upper_leg.position.x, right_upper_leg.position.y, 0 ) );



            // Updating final world matrix (with parent transforms) - mandatory
            left_upper_leg.updateWorldMatrix(false,false);
			right_upper_leg.updateWorldMatrix(false,false);
            // Updating screeny
            stats.update();
            renderer.render(scene, camera);
        })

		let sitDownTranslation = new TWEEN.Tween( {yd:0} )
        .to( {yd:.5 }, 1000)
        .onUpdate(function(){
            // This is an example of rotation of the right_upper_arm
            // Notice that the transform is M = T * R

            left_upper_arm.matrix.makeTranslation(0, -this._object.yd,0).premultiply( new THREE.Matrix4().makeTranslation(left_upper_arm.position.x, left_upper_arm.position.y, 0 ) );
			right_upper_arm.matrix.makeTranslation(0, -this._object.yd,0).premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x, right_upper_arm.position.y, 0 ) );
			head.matrix.makeTranslation(0, -.5*this._object.yd,0).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y, 0 ) );
			torso.matrix.makeTranslation(0, -3*this._object.yd,0).premultiply( new THREE.Matrix4().makeTranslation(torso.position.x, torso.position.y, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            left_upper_arm.updateMatrixWorld(true);
			right_upper_arm.updateMatrixWorld(true);
			head.updateMatrixWorld(true);
			torso.updateWorldMatrix(false,false);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })

		let dropHeadphone = new TWEEN.Tween( {theta:0} )
		.to( {theta:-16.25 }, 2500)
		.onUpdate(function(){
			// This is an example of rotation of the right_upper_arm
			// Notice that the transform is M = T * R
			headphone.matrix.makeTranslation(0, this._object.theta, 0).premultiply( new THREE.Matrix4().makeTranslation(headphone.position.x, headphone.position.y,  headphone.position.z+.1) );


			headphone.updateMatrixWorld(true);

			// Updating final world matrix (with parent transforms) - mandatory
			// Updating screeny
			stats.update();
			renderer.render(scene, camera);
		})

		let headSpinRight = new TWEEN.Tween( {theta:0} )
        .to( {theta:.5 }, 2000)
        .onUpdate(function(){
            // This is an example of rotation of the right_upper_arm
            // Notice that the transform is M = T * R
            head.matrix.makeRotationY(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y,  head.position.z) );
			headphone.matrix.makeRotationY(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(-.75, 3.75, 0) );

			left_eye.matrix.makeTranslation(this._object.theta*.5, 0, 0).premultiply( new THREE.Matrix4().makeTranslation(left_eye.position.x, left_eye.position.y,  left_eye.position.z+.5) );
			right_eye.matrix.makeTranslation(this._object.theta*.5, 0, 0).premultiply( new THREE.Matrix4().makeTranslation(right_eye.position.x, right_eye.position.y,  right_eye.position.z+.5));



			head.updateWorldMatrix(true,false);
			headphone.updateMatrixWorld(true);
			left_eye.updateMatrixWorld(true);
			right_eye.updateMatrixWorld(true);

			// Updating final world matrix (with parent transforms) - mandatory
            // Updating screeny
            stats.update();
            renderer.render(scene, camera);
        })
		let headSpinLeft = new TWEEN.Tween( {theta:.5} )
		.to( {theta:-0.5 }, 2000)
		.onUpdate(function(){
			// This is an example of rotation of the right_upper_arm
			// Notice that the transform is M = T * R
			head.matrix.makeRotationY(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y,  head.position.z) );
			headphone.matrix.makeRotationY(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(-.75, 3.75,  this._object.theta/2) );
			left_eye.matrix.makeTranslation(this._object.theta, 0, 0).premultiply( new THREE.Matrix4().makeTranslation(left_eye.position.x, left_eye.position.y,  left_eye.position.z+.1) );
			right_eye.matrix.makeTranslation(this._object.theta, 0, 0).premultiply( new THREE.Matrix4().makeTranslation(right_eye.position.x, right_eye.position.y,  right_eye.position.z+.1));



			head.updateWorldMatrix(true,false);
			headphone.updateMatrixWorld(true);
			left_eye.updateMatrixWorld(true);
			right_eye.updateMatrixWorld(true);

			// Updating final world matrix (with parent transforms) - mandatory
			// Updating screeny
			stats.update();
			renderer.render(scene, camera);
		})
		let lookForward = new TWEEN.Tween( {theta:-.5} )
		.to( {theta:0 }, 2000)
		.onUpdate(function(){
			// This is an example of rotation of the right_upper_arm
			// Notice that the transform is M = T * R
			head.matrix.makeRotationY(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y,  head.position.z) );
			headphone.matrix.makeRotationY(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(-.75, 3.75,  this._object.theta/3) );
			left_eye.matrix.makeTranslation(this._object.theta, 0, 0).premultiply( new THREE.Matrix4().makeTranslation(left_eye.position.x, left_eye.position.y,  left_eye.position.z+.1) );
			right_eye.matrix.makeTranslation(this._object.theta, 0, 0).premultiply( new THREE.Matrix4().makeTranslation(right_eye.position.x, right_eye.position.y,  right_eye.position.z+.1));



			head.updateWorldMatrix(true,false);
			headphone.updateMatrixWorld(true);
			left_eye.updateMatrixWorld(true);
			right_eye.updateMatrixWorld(true);

			// Updating final world matrix (with parent transforms) - mandatory
			// Updating screeny
			stats.update();
			renderer.render(scene, camera);
		})
		let enjoyPartA = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI/8 }, 500).onUpdate(function(){
			head.matrix.makeRotationX(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y,  head.position.z-.1) );
			headphone.matrix.makeRotationX(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(-.75, 3.75,  0) );
			head.updateWorldMatrix(true,false);
			headphone.updateMatrixWorld(true);

			stats.update();
			renderer.render(scene, camera);
		})
		let enjoyPartB = new TWEEN.Tween( {theta:Math.PI/8} )
		.to( {theta:0 }, 500).onUpdate(function(){
			head.matrix.makeRotationX(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y,  head.position.z-.1) );
			headphone.matrix.makeRotationX(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(-.75, 3.75,  0) );
			head.updateWorldMatrix(true,false);
			headphone.updateMatrixWorld(true);

			stats.update();
			renderer.render(scene, camera);
		})
		let enjoyFootPartA = new TWEEN.Tween( {theta:0} )
		.to( {theta:.5 }, 500)
		.onUpdate(function(){

			left_foot.matrix.makeTranslation(0, this._object.theta, 0).premultiply( new THREE.Matrix4().makeTranslation(left_foot.position.x, left_foot.position.y,  left_foot.position.z+.1) );
			left_foot.updateMatrixWorld(true);

			stats.update();
			renderer.render(scene, camera);
		})
		let enjoyFootPartB = new TWEEN.Tween( {theta:0.5} )
		.to( {theta:0 }, 500)
		.onUpdate(function(){
			left_foot.matrix.makeTranslation(0, this._object.theta, 0).premultiply( new THREE.Matrix4().makeTranslation(left_foot.position.x, left_foot.position.y,  left_foot.position.z+.1) );
			left_foot.updateMatrixWorld(true);

			stats.update();
			renderer.render(scene, camera);
		})
        sitDownRotation.start()
		sitDownTranslation.start()
		enjoyPartA.chain(enjoyPartB)
		enjoyPartB.chain(enjoyPartA)
		enjoyFootPartA.chain(enjoyFootPartB)
		enjoyFootPartB.chain(enjoyFootPartA)

		setTimeout(function(){dropHeadphone.start();},1100);
		setTimeout(function(){headSpinRight.start();},4500);
		setTimeout(function(){headSpinLeft.start();},7500);
		setTimeout(function(){lookForward.start();},10500);
		setTimeout(function(){enjoyPartA.start();},13500);
		setTimeout(function(){enjoyFootPartA.start();},13500);
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});

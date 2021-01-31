function Exercises() {}

Object.assign( Exercises.prototype, {

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

		let leftArmStretch = new TWEEN.Tween( {theta:0, move:0} )
        .to( {theta:Math.PI/2.5, move:0.5 }, 1000)
        .onUpdate(function(){
            left_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_upper_arm.position.x+4*this._object.move, left_upper_arm.position.y, left_upper_arm.position.z +.1) );
			right_lower_arm.matrix.makeRotationZ(-2*this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_lower_arm.position.x-this._object.move, right_lower_arm.position.y+this._object.move,
				right_lower_arm.position.z +.2) );
            left_upper_arm.updateMatrixWorld(true);
			right_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })
		let returnFromLeftArmStretch = new TWEEN.Tween( {theta:Math.PI/2.5, move:0.5} )
        .to( {theta:0, move:0 }, 1000)
        .onUpdate(function(){
            left_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_upper_arm.position.x+4*this._object.move, left_upper_arm.position.y, left_upper_arm.position.z) );
			right_lower_arm.matrix.makeRotationZ(-2*this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_lower_arm.position.x-this._object.move, right_lower_arm.position.y+this._object.move,
				right_lower_arm.position.z) );
            left_upper_arm.updateMatrixWorld(true);
			right_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })
		let rightArmStretch = new TWEEN.Tween( {theta:0, move:0} )
		.to( {theta:-Math.PI/2.5, move:0.5 }, 1000)
		.onUpdate(function(){
			right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x-4*this._object.move, right_upper_arm.position.y, right_upper_arm.position.z) );
			left_lower_arm.matrix.makeRotationZ(-2*this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_lower_arm.position.x+this._object.move, left_lower_arm.position.y+this._object.move,
				 left_lower_arm.position.z+.2) );
			right_upper_arm.updateMatrixWorld(true);
			left_lower_arm.updateMatrixWorld(true);
			// Updating screen
			stats.update();
			renderer.render(scene, camera);
		})
		let returnFromrightArmStretch = new TWEEN.Tween( {theta:-Math.PI/2.5, move:0.5 } )
		.to( {theta:0, move:0 }, 1000)
		.onUpdate(function(){
			right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x-4*this._object.move, right_upper_arm.position.y, right_upper_arm.position.z) );
			left_lower_arm.matrix.makeRotationZ(-2*this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_lower_arm.position.x+this._object.move, left_lower_arm.position.y+this._object.move,
				 left_lower_arm.position.z) );
			right_upper_arm.updateMatrixWorld(true);
			left_lower_arm.updateMatrixWorld(true);
			// Updating screen
			stats.update();
			renderer.render(scene, camera);
		})
		let jumpingJack = new TWEEN.Tween( {theta:0, yd: 0 } )
		.to( {theta:Math.PI/1.5, yd:.5 }, 500)
		.onUpdate(function(){
			right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x+this._object.yd, right_upper_arm.position.y+4*this._object.yd
				, right_upper_arm.position.z) );
			left_upper_arm.matrix.makeRotationZ(-this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_upper_arm.position.x-this._object.yd, left_upper_arm.position.y+4*this._object.yd
				, left_upper_arm.position.z) );
			left_lower_arm.matrix.makeRotationZ(-this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_lower_arm.position.x-4*this._object.yd, left_lower_arm.position.y+4*this._object.yd,
				 left_lower_arm.position.z) );
			right_lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_lower_arm.position.x+4*this._object.yd, right_lower_arm.position.y+4*this._object.yd,
				 right_lower_arm.position.z) );
			left_upper_leg.matrix.makeRotationZ(-this._object.theta/9).premultiply( new THREE.Matrix4().makeTranslation(left_upper_leg.position.x-this._object.yd, left_upper_leg.position.y, left_upper_leg.position.z) );
			right_upper_leg.matrix.makeRotationZ(this._object.theta/9).premultiply( new THREE.Matrix4().makeTranslation(right_upper_leg.position.x+this._object.yd, right_upper_leg.position.y, right_upper_leg.position.z) );

			head.matrix.makeTranslation(0, this._object.yd,0).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y, 0 ) );
			torso.matrix.makeTranslation(0,this._object.yd, 0).premultiply( new THREE.Matrix4().makeTranslation(torso.position.x, torso.position.y, torso.position.z ) );
			// Updating screen
			torso.updateMatrixWorld(true);
			left_upper_arm.updateMatrixWorld(true);
			right_upper_arm.updateMatrixWorld(true);
			left_lower_arm.updateMatrixWorld(true);
			right_lower_arm.updateMatrixWorld(true);
			left_upper_leg.updateMatrixWorld(true);
			right_upper_leg.updateMatrixWorld(true);
			// head.updateMatrixWorld(true);
			stats.update();
			renderer.render(scene, camera);
		})
		let jumpingJackReturn = new TWEEN.Tween( {theta:Math.PI/1.5, yd: .5 } )
		.to( {theta:0, yd:0 }, 500)
		.onUpdate(function(){
			right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x+this._object.yd, right_upper_arm.position.y+4*this._object.yd
				, right_upper_arm.position.z) );
			left_upper_arm.matrix.makeRotationZ(-this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_upper_arm.position.x-this._object.yd, left_upper_arm.position.y+4*this._object.yd
				, left_upper_arm.position.z) );
			left_lower_arm.matrix.makeRotationZ(-this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_lower_arm.position.x-4*this._object.yd, left_lower_arm.position.y+4*this._object.yd,
				 left_lower_arm.position.z) );
			right_lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(right_lower_arm.position.x+4*this._object.yd, right_lower_arm.position.y+4*this._object.yd,
				 right_lower_arm.position.z) );
			left_upper_leg.matrix.makeRotationZ(-this._object.theta/9).premultiply( new THREE.Matrix4().makeTranslation(left_upper_leg.position.x-this._object.yd, left_upper_leg.position.y, left_upper_leg.position.z) );
			right_upper_leg.matrix.makeRotationZ(this._object.theta/9).premultiply( new THREE.Matrix4().makeTranslation(right_upper_leg.position.x+this._object.yd, right_upper_leg.position.y, right_upper_leg.position.z) );

			head.matrix.makeTranslation(0, this._object.yd,0).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y, 0 ) );
			torso.matrix.makeTranslation(0,this._object.yd, 0).premultiply( new THREE.Matrix4().makeTranslation(torso.position.x, torso.position.y, torso.position.z ) );
			// Updating screen
			torso.updateMatrixWorld(true);
			left_upper_arm.updateMatrixWorld(true);
			right_upper_arm.updateMatrixWorld(true);
			left_lower_arm.updateMatrixWorld(true);
			right_lower_arm.updateMatrixWorld(true);
			left_upper_leg.updateMatrixWorld(true);
			right_upper_leg.updateMatrixWorld(true);
			// head.updateMatrixWorld(true);
			stats.update();
			renderer.render(scene, camera);
		})
		jumpingJack.chain(jumpingJackReturn)
		jumpingJackReturn.chain(jumpingJack)
		leftArmStretch.start()
		setTimeout(function(){returnFromLeftArmStretch.start();},2000);
		setTimeout(function(){rightArmStretch.start();},4000);
		setTimeout(function(){returnFromrightArmStretch.start();},6000);
		setTimeout(function(){jumpingJack.start();},7500);
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

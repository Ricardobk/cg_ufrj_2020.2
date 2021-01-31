function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2}, 500)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(4, 2.2, 0 ) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })
        let lowerArmTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI/2 }, 500)
        .onUpdate(function(){
            let right_lower_arm =  robot.getObjectByName("right_lower_arm");
            right_lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(1, -1.75, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            right_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })
        let rightHandTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:2*Math.PI}, 1000)
        .onUpdate(function(){
            let right_hand =  robot.getObjectByName("right_hand");

            right_hand.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(0, -1.8, 0 ) );



            // Updating final world matrix (with parent transforms) - mandatory
            right_hand.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })
        let headTilt = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI/10}, 500)
        .onUpdate(function(){
            let head =  robot.getObjectByName("head");

            head.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(head.position.x, head.position.y, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            head.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })
        let leftArmTilt = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI/10}, 500)
        .onUpdate(function(){
            let left_lower_arm =  robot.getObjectByName("left_lower_arm");

            left_lower_arm.matrix.makeRotationZ(-this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(left_lower_arm.position.x-.5, left_lower_arm.position.y, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            left_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        })

        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        upperArmTween.start()
        lowerArmTween.start()
        leftArmTilt.start();
        headTilt.start()
        setTimeout(function(){rightHandTween.start();},1000);

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

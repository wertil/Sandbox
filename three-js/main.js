function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	var enableFog = false;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}
	
	var plane = getPlane(30);
	// var spotLight = getSpotLight(7, 0.3);
	var directionalLight = getDirectionalLight(2);
	var sphere = getSphere(0.05);
	var boxGrid = getBoxGrid(10, 1.5);
	// var helper  = new THREE.CameraHelper(directionalLight.shadow.camera)

	plane.name = 'plane-1';

	plane.rotation.x = Math.PI/2;
	directionalLight.position.y = 4;
	directionalLight.intensity = 2;

	scene.add(plane);
	directionalLight.add(sphere);
	scene.add(directionalLight);
	scene.add(boxGrid);

	// gui controls
	gui.add(directionalLight, 'intensity', 0, 10);
	gui.add(directionalLight.position, 'x', 0, 20);
	gui.add(directionalLight.position, 'y', 0, 20);
	gui.add(directionalLight.position, 'z', 0, 20);

	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);

	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120, 120, 120)');
	document.getElementById('webgl').appendChild(renderer.domElement);

	// Orbit control, move scene by dragging the mouse
	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}

function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.castShadow = true;

	return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(1, 1, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for (var j=1; j<amount; j++) {
			var obj = getBox(1, 1, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.receiveShadow = true;

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);

	return mesh;
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;

	return light;
}

function getSpotLight(intensity, fuzz) {
	var light = new THREE.SpotLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.bias = 0.001; // removed sharp shadow edges
	light.shadow.mapSize.width = 2048; // default 1024
	light.shadow.mapSize.height = 2048; // default 1024
	light.penumbra = fuzz;
	return light;
}

function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.camera.left = -10;
	light.shadow.camera.bottom = -10;
	light.shadow.camera.right = 10;
	light.shadow.camera.top = -10;

	return light;
}

function update(renderer, scene, camera, controls) {
	renderer.render(
		scene,
		camera
	);

	controls.update();

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	})
}

var scene = init();
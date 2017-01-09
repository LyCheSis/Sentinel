var EngineCore = (function () {
  var camera;
  var controls;
  var renderer;
  var scene;

  var assetManager;
  var materials = [];
  var meshes = [];
  var textures = [];

  function _init(args) {
    assetManager = new AssetManager();

    assetManager.prepare('box', AssetManager.Type.TEXTURE2D, 'assets/textures/f4h_1f__f_4a_3_mc__buno_146817__april_7__1960_by_fighterman35-da7djxl.jpg');
    assetManager.load();

    scene = new THREE.Scene();
    scene.name = 'demo scene';

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x222222, 1.0);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 2, 8);
    scene.add(camera);

    controls = new THREE.FirstPersonControls(camera, renderer.domElement);

    var light = new THREE.HemisphereLight(0xFFEEBB, 0x080820, 0.5);
    light.name = 'hemisphere light';
    scene.add(light);

    var geometry = new THREE.BoxBufferGeometry(1, 1, 1);

    var material = new THREE.MeshStandardMaterial();
    material.map = assetManager.get('box');
    material.roughness = 0.1;
    material.metalness = 0.0;

    console.log(material);

    mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'demo cube';
    mesh.position.set(0, 2, 0);
    scene.add(mesh);

    var light = new THREE.DirectionalLight(0xBBEEFF, 0.5);
    light.position.set(0, 1, 1);
    scene.add(light);

    var material = new THREE.MeshStandardMaterial();
    material.side = THREE.FrontSide;

    meshes.terrain = new THREE.Mesh(generateTerrain(), material);
    meshes.terrain.name = 'terrain';
    meshes.terrain.position.set(0, 0, 0);

    scene.add(meshes.terrain);

    window.addEventListener('resize', _onWindowResize, false);
  };

  function generateTerrain() {
    var geometry = new THREE.Geometry();

    var x;
    var y;
    var z;
    var segX = 16;
    var segZ = 16;

    var segXHalf = segX >> 1;
    var segZHalf = segZ >> 1;

    var ptr;

    for (var z = 0; z < segZ; z++) {
      for (var x = 0; x < segX; x++) {
        geometry.vertices.push(
          new THREE.Vector3(x - segXHalf, y, z - segZHalf)
        );
      }
    }

    for (var z = 1; z < segZ; z++) {
      for (var x = 1; x < segX; x++) {
        ptr = z * segX + x;
        geometry.faces.push(new THREE.Face3(ptr, ptr - segX, ptr - segX - 1));
        geometry.faces.push(new THREE.Face3(ptr, ptr - segX - 1, ptr - 1));
      }
    }

    for (var z = 1; z < segZ; z += 2) {
      for (var x = 1; x < segX; x += 2) {
        ptr = z * segX + x;
        y = Math.random() * 2;
        geometry.vertices[ptr].y = y;
        geometry.vertices[ptr - 1].y = y;
        geometry.vertices[ptr - segX].y = y;
        geometry.vertices[ptr - segX - 1].y = y;
      }
    }

    geometry.computeBoundingBox();
    geometry.computeFaceNormals();

    return geometry;
  };

  function _animate() {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  function _onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return {
    publicProperty: '',

    init: function (args) {
      _init(args);
    },

    start: function () {
      var _this = this;

      _this.animate();
    },

    animate: function () {
      var _this = this;

      requestAnimationFrame(_this.animate.bind(_this));

      _animate();
    },

    getScene: function () {
      return scene;
    },
  };
})();

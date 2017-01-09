AssetManager = function (base) {
  this.assets = {};
};

AssetManager.Type = {
  TEXT: 0,
  JSON: 1,
  XML: 2,
  IMAGE: 16,
  TEXTURE2D: 17,
  CUBEMAP: 18,
};

AssetManager.prototype = {
  prepare: function (id, type, file) {
    switch (type) {
      case AssetManager.Type.IMAGE:
        this.assets[id] = new AssetImage(this, file);
        break;

      case AssetManager.Type.TEXTURE2D:
        this.assets[id] = new AssetsTexture2D(this, file);
        break;

      default:
        console.log('asset type', type, 'for', id, 'not supported');
        break;
    }
  },

  load: function () {
    var num = this.assets.length;

    for (var key in this.assets) {
      this.assets[key].load();
    }
  },

  get: function (key) {
    return this.assets[key].get();
  },
};

AssetsImage = function (file) {
  this.file = file;
};

AssetsImage.prototype = {
  load: function () {
    this.asset = new Image();
    this.asset.onload(this.onLoaded);
    this.asset.src = file;
  },

  onLoaded: function () {
    console.log(this);
  },
};

AssetsTexture2D = function (parent, file) {
  console.log('init texture2D', file);

  this.parent = parent;
  this.file = file;
  this.texture = false;

  if (typeof this.parent.textureLoader == 'undefined') {
    this.parent.textureLoader = new THREE.TextureLoader();
  }
};

AssetsTexture2D.prototype = {
  load: function () {
    console.log('load texture2D', this.file);
    this.texture = this.parent.textureLoader.load(this.file);
  },

  get: function () {
    return this.texture;
  },
};

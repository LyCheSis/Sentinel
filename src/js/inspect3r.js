var Inspect3r = (function() {
    var privateProperty = 'foo';
    var el;
    var sheet;

    function privateMethod(args) {
        // do something
    }

    function _init() {

        var style = document.createElement('style');
        style.appendChild(document.createTextNode('')); // WebKit hack
        document.head.appendChild(style);

        sheet = style.sheet;

        _addCSSRule(sheet, '#inspect3r', 'position:absolute; top:64px; left:0px; width:480px; height:480px; color:#DDD; background:rgba(64, 64, 64, 0.5); font-size:12px; font-family:"Lucida Sans Unicode","Lucida Grande",sans-serif; padding:0 16px; z-index:256; overflow:auto;');
        _addCSSRule(sheet, '#inspect3r h1', 'padding:0; margin:4px 0; font-size:0.75em; font-weight:normal; border-bottom:1px solid #666; text-align:right;');
        _addCSSRule(sheet, '#inspect3r ul', 'padding:0 0 0 16px; margin:0; list-style:none;');
        _addCSSRule(sheet, '#inspect3r li', 'padding:0; margin:0;');
        _addCSSRule(sheet, '#inspect3r .attr', 'border:1px solid #666; padding:0 0.2em; margin:0 0.2em; font-size:0.75em;');
        _addCSSRule(sheet, '#inspect3r .type_light', 'background-image:url("data:image/svg+xml;utf8,<svg width=\"1024\" height=\"1024\"><path d=\"M736 960q0 -13 -9.5 -22.5t-22.5 -9.5t-22.5 9.5t-9.5 22.5q0 46 -54 71t-106 25q-13 0 -22.5 9.5t-9.5 22.5t9.5 22.5t22.5 9.5q50 0 99.5 -16t87 -54t37.5 -90zM896 960q0 72 -34.5 134t-90 101.5t-123 62t-136.5 22.5t-136.5 -22.5t-123 -62t-90 -101.5t-34.5 -134 q0 -101 68 -180q10 -11 30.5 -33t30.5 -33q128 -153 141 -298h228q13 145 141 298q10 11 30.5 33t30.5 33q68 79 68 180zM1024 960q0 -155 -103 -268q-45 -49 -74.5 -87t-59.5 -95.5t-34 -107.5q47 -28 47 -82q0 -37 -25 -64q25 -27 25 -64q0 -52 -45 -81q13 -23 13 -47 q0 -46 -31.5 -71t-77.5 -25q-20 -44 -60 -70t-87 -26t-87 26t-60 70q-46 0 -77.5 25t-31.5 71q0 24 13 47q-45 29 -45 81q0 37 25 64q-25 27 -25 64q0 54 47 82q-4 50 -34 107.5t-59.5 95.5t-74.5 87q-103 113 -103 268q0 99 44.5 184.5t117 142t164 89t186.5 32.5 t186.5 -32.5t164 -89t117 -142t44.5 -184.5z\"></path></svg>")');


        el = document.createElement('div');
        el.id = 'inspect3r';
        el.innerHTML = '<h1>initializing...</h1>';
        document.body.appendChild(el);
    }

    function _onClick(e) {
        console.log(e);
    }

    function _addCSSRule(sheet, selector, rules, index) {
        if ('insertRule' in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        } else if('addRule' in sheet) {
            sheet.addRule(selector, rules, index);
        } else {
            console.warn('unable to add css rules');
        }
    }

    function _buildTree() {

        function _traverseTree(node) {
            output += '<ul><li data-node="' + node.uuid + '">';
            output += '<span class="type_light">' + node.type + '</span> ' + node.name + ' ';
            output += '<span class="attr position">' + numberFormat.format(node.position.x) + ', ' + numberFormat.format(node.position.y) + ', ' + numberFormat.format(node.position.z) + '</span>';
            output += '<span class="attr rotation">' + numberFormat.format(node.rotation.x) + ', ' + numberFormat.format(node.rotation.y) + ', ' + numberFormat.format(node.rotation.z) + '</span>';

            var childCount = node.children.length;

            if (childCount > 0) {
                for (var i = 0; i < childCount; i++) {
                    _traverseTree(node.children[i]);
                }
            }

            output += '</li></ul>';
        }

        var numberFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        var output = '<h1>inspect³r</h1>';

        if (typeof scene != 'undefined') {
            output += '[' + scene.type + '] ' + scene.name;

            var childCount = scene.children.length;

            if (childCount > 0) {
                for (var i = 0; i < childCount; i++) {
                    _traverseTree(scene.children[i]);
                }
            }
        } else {
            output += 'scene not initialized';
        }

        el.innerHTML = output;
    }

    return {

        publicProperty: '',

        init: function(args) {
            _init();
            _buildTree();

//            el.addEventListener('click', this.onClick.bind(this), false);

            setInterval(this.buildTree.bind(this), 1000);
        },

        buildTree: function() {
            _buildTree();
        },

        onClick: function(e) {
            console.log(e.target.getAttribute('data-uuid'));
        }
    };
})();

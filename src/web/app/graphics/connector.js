define(['jsplumb'], function(jsplumb) {
    'use strict';
    
    function init($timeout) {
        var jsp = jsplumb.getInstance();
        window.jsp = jsp;
        var nodes, nodesDisplay, containerId;

        var reconnectAll = function(nodes) {
            for (var i in nodes) {
                var node = nodes[i];
                if (!nodesDisplay[node.id]) {
                    console.log('recreating');
                    nodesDisplay[node.id] = {
                        id: node.id,
                        position:{
                            top:10, 
                            left:10
                        }
                    };
                }
                console.log('setting draggable %s', node.id);
                var nInfo = nodesDisplay[node.id];
                var n = $('#'+node.id);
                n.animate(nInfo.position);
                jsp.draggable(node.id, {containment: jsp.getContainer(),
                    start: function() {
                        
                    },
                    stop: function(eve, ui){
                        nInfo.position.top = ui.position.top;
                        nInfo.position.left = ui.position.left;
                        var e = {type:'stop', data:nInfo};
                        for (var i in listeners) {
                            listeners[i](e);
                        }
                    }
                });
            };
        };
        var init = function(_containerId, _nodes, _nodesDisplay) {
            nodes = _nodes;
            nodesDisplay = _nodesDisplay;
            console.log('Initializing jsplumb into %s', _containerId);
            if (containerId !== _containerId)
                jsp.setContainer(_containerId);
            containerId=_containerId;
            if (nodes) {
                console.log('..%s', nodes);
                reconnectAll(nodes);
            }
        };
        
        var listeners = [];
    
        return {
            init: init,
            onChange: function(listener) {
                listeners.push(listener);
            },
            reconnectAll: reconnectAll
        };
    };
    init.$injector = ['$timeout'];


    return init;
});

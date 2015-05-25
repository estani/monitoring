define(['jsplumb'], function(jsplumb) {
    'use strict';
    
    function init($timeout) {
        var jsp = jsplumb.getInstance({
            Endpoint: ["Dot", {radius: 2}],
            //HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 2 },
            ConnectionOverlays: [
                    [ "Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 10,
                        foldback: 0.8
                    } ]]
        });
        window.jsp = jsp;
        var nodes, nodesDisplay, containerId;

        var reconnectAll = function(nodes) {
            for (var i in nodes) {
                var node = nodes[i];
                if (!nodesDisplay[node.id]) {
                    nodesDisplay[node.id] = {
                        id: node.id,
                        position:{
                            top:10, 
                            left:10
                        }
                    };
                }
                //connectors
                for (var s in node.services) {
                    var service = node.services[s];
                    for (var u in service.uses) {
                        var connect = service.uses[u];
                        jsp.connect({
                            source:service.id, 
                            target:connect.id, 
                            anchor:['Continuous', {faces:['left','right']}],
                            connectorStyle: {strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 }
                        });
                        console.log ('%s->%s', service.id, connect.id);
                    }
                }
                //dragging logic
                jsp.animate(node.id, nodesDisplay[node.id].position);
                jsp.draggable(node.id, {containment: jsp.getContainer(),
                    start: function() {
                        
                    },
                    stop: function(eve, ui){
                        var nInfo = nodesDisplay[eve.target.id];
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

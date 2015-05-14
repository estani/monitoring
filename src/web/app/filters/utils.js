define([], function(){
    
    return {
        join: function (items, sep) {
            if (items.constructor !== Array){
                //no array, do nothing
                return items;
            }
            return items.join(sep);
        }
    };
});

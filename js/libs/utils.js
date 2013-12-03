define({
    mergeObjects: function(){
        var mergedObj = {};
        for (var i = 0, max=arguments.length; i !== max; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if( obj.hasOwnProperty(key) ) {
                    if( mergedObj[key] ) {
                        mergedObj[key] += obj[key]
                    }
                    else {
                        mergedObj[key] = obj[key];
                    }
                }
            }
        }
        return mergedObj;
    }
});


angular.module('ngCategories', []).filter('ngCategories', ['$filter', function($filter) {
    return function(list, k, strict) {
        var doFilter = {
            data: list,
            filtered: [],
            applyFilter: function(arr, key, countEach) {
                var d = [];
                //Resetto la lista filtrata quando cambia un filtro
                if (countEach === 1) this.filtered = this.data;
                //È definito l'argomento e, in caso sia stringa, ha lunghezza >0
                if (arr) {
                    var o = {};
                    //Gestisco filtri singoli
                    if (angular.isString(arr)) {
                        o[key] = arr;
                        d = d.concat($filter('filter')(this.filtered, o, strict));
                        this.filtered = d;
                    }
                    //Gestisco array di filtri
                    if (angular.isArray(arr)) {
                        //Se la lunghezza è 0 non devo filtrare
                        if (arr.length > 0) {
                            for (var i = 0; i < arr.length; i++) {
                                if (angular.isString(arr[i])) {
                                    //Costruisco fake object da passare come filtro singolo
                                    o[key] = arr[i];
                                    d = d.concat($filter('filter')(this.filtered, o, strict));
                                }
                            }
                            this.filtered = d;
                        }
                    }
                }
                //No else perchè se non è definito o è stringa con lunghezza zero non devo filtrare
            }
        };
        if (angular.isDefined(k)) {
            var countEach = 1;
            angular.forEach(k, function(arr, key) {
                doFilter.applyFilter(arr, key, countEach);
                countEach++;
            });
        } else {
            doFilter.filtered = doFilter.data;
        }
        return doFilter.filtered;
    }
}]).filter('ngOnce', function() {
    return function(fullData, key, count, filteredData) {
        var filteredCount = {}; //contiene la conta della lista filtrata
        var fullCount = {}; //contiene la conta totale degli elementi
        var list = [];
        if (count) {
            for (var i = 0; i < filteredData.length; i++) {
                if (angular.isUndefined(filteredCount[filteredData[i][key]])) {
                    filteredCount[filteredData[i][key]] = 1;

                } else {
                    filteredCount[filteredData[i][key]]++;
                }
            }
        }
        for (var i = 0; i < fullData.length; i++) {
            if (angular.isUndefined(fullCount[fullData[i][key]])) {
                fullCount[fullData[i][key]] = 1;
                list.push(fullData[i]);
            } else {
                fullCount[fullData[i][key]]++;
            }
        }
        if (count) {
            for (var i = 0; i < list.length; i++) {
                list[i].totalCount = fullCount[list[i][key]];
                list[i].count = filteredCount[list[i][key]];
            }
        }
        return list;
    };
}).factory('ngCatoggle', function() {
    return function(target, key) {
        var index = target.indexOf(key);
        if (index === -1) {
            target.push(key);
        } else {
            target.splice(index, 1);
        }
    };
});
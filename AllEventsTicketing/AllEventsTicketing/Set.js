function Set() {


	this.intersection = function(listA, listB) {

	   var resultList = [];

	   if (listA === null || listB === null) {
	   	return null;
	   }

	   for (var i = 0; i < listA.length; i++) {
	   	var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    resultList.push(listB[j]);
                    break;
                }
			}
	   }


	   return resultList;
	}



	this.union = function(listA, listB) {

	   // var resultList = [];
       //
        // if (listA === null || listB === null) {
        //     return null;
        // }
       //
        // for (var i = 0; i < listA.length; i++) {
        //     var nextValue = listA[i];
       //
        //     for (var j = 0; j < listB.length; j++) {
        //         if (listB[j] == listA[i]) {
        //             resultList.push(listB[j]);
        //             break;
        //         }
        //     }
        // }

	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];
            resultList.push(listA[i]);

        }

        return resultList;
    }



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];


        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                var nextValueB = listB[j];
                if (listB[j] !== nextValue) {
                    resultList.push(listB[j]);
                }
                if (listA[i] !== nextValueB) {
                    resultList.push(listA[i]);
                    break;
                }
            }
        }



        return resultList;
	}



}
function Set() {


    this.intersection = function (listA, listB) {

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


    this.union = function (listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] == listA[i]) {
                    resultList.push(listB[j]);
                    break;
                }
            }
        }

        return resultList;
    }


    this.relativeComplement = function (listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        /* for every item in A assign it to next value
        *  */

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] !== nextValue) {
                    resultList.push(nextValue);
                    break;
                }

            }

            return resultList;
        }


        this.symmetricDifference = function (listA, listB) {

            var resultList = [];


            if (listA === null || listB === null) {
                return null;
            }

            /*Compare each item in A to each item in B and push up the ones that are not the same,
             then compare all items in B to each item in A and push up the ones that are not the same.

             * if a[i] !== nextValueB
                push into list

             * if b[j] !== nextValueB
                push into list*/


            for (var i = 0; i < listA.length; i++) {
                var nextValueA = listA[i];

                for (var j = 0; j < listB.length; j++) {
                    var nextValueB = listB[j];

                    if (listA[i] !== nextValueB) {
                        resultList.push(listA[i]);
                            break;
                        }
                    if (nextValueA!== listB[j]) {
                        resultList.push(listB[j]);
                        break
                    }


                }
            }


            return resultList;
        }

    }
}
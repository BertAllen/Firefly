app.controller("FireflyController", function($scope) {
    $scope.btnText = "Start";
    //color layer --v

    $scope.quilt = [];
    $scope.colorLayer = function() {
        //populating the grid    
        for (var x = 0; x < 80; x++) {
            $scope.quilt[x] = [];
            for (var y = 0; y < 80; y++) {
                var obj = {
                    red: Math.floor(Math.random() * 256),
                    green: Math.floor(Math.random() * 256),
                    blue: Math.floor(Math.random() * 256),
                    neighbors: [],
                    xx: x,
                    yy: y,
                }
                $scope.quilt[x][y] = obj;
            }
        }
        //wiring the grid
        for (var x = 0; x < 80; x++) {
            for (var y = 0; y < 80; y++) {
                for (var a = -1; a < 2; a++) {
                    for (var b = -1; b < 2; b++) {
                        if (a == 0 && b == 0) { b = 1 }
                        var m = x + a;
                        var n = y + b;
                        if (m == -1) { m = 79 }
                        if (m == 80) { m = 0 }
                        if (n == -1) { n = 79 }
                        if (n == 80) { n = 0 }
                        $scope.quilt[x][y].neighbors.push($scope.quilt[m][n]);
                    }
                }
            }
        }
        return $scope.quilt;
    }//end of colorLayer function


    //syncron --v      package com.Atavia;

    $scope.syncron = function(obj) {
        //short[] exam = new short[9];
        //values are passed to the exam array here, unit zero is the center of the 3x3 block
        // Syncron (exam[]<short>) {
        //here is the syncro logic
        for (color in obj) {
            if (color != "red" && color != "green" && color != "blue") {
                return;
            }
            var blockValue = 0;
            //short[] test = new short[1];
            for (var i = 0; i < 8; i++) {
                var test = obj.neighbors[i][color] - obj[color];
                if (test < -150) { blockValue += 256; }
                if (test > 150) { blockValue -= 256; }
                blockValue += obj.neighbors[i][color];
            }
            var average = blockValue / 8;
            //how to react to syncro logic result
            //public SyncroLogicResult() {
            var result = obj[color];
            //if (average-exam[0] ==0); {result = exam[0];} <<--this line not needed
            if (average - result < 0 && average - result > -51) {
                result -= 1;
                if (result < 0) {
                    result += 256;
                }
            }
            if (average - result > 0 && average - result < 51) {
                result += 1;
                if (result > 255) {
                    result -= 256;
                }
            }
            if (average - result >= 51 && average - result < 101) {
                result += 2;
                if (result > 255) {
                    result -= 256;
                }
            }
            //return;//code here needs to take care of the "no change" case 
            obj[color] = result;
        }

    }// end of syncron function

    $scope.nightTime = function() {
        if ($scope.btnText === "Start") {
            $scope.btnText = "End";
            $scope.colorLayer();
        } else {
            $scope.btnText = "Start";
        }
        while ($scope.btnText === "End") {
        debugger;
            for (var x = 0; x < 80; x++) {
                for (var y = 0; y < 80; y++) {
                    $scope.syncron($scope.quilt[x][y]);
                    //print out quilt obj here ...........
                }
            }
        }
    }//end nightTime function 

})
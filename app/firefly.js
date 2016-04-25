app.controller("FireflyController", function ($scope, $interval) {
    $scope.btnText = "Start";
    $scope.redish = true
    $scope.greenish = true
    $scope.blueish = true
    //color layer --v

    $scope.quilt = [];
    $scope.colorLayer = function () {
        //populating the grid    
        for (var x = 0; x < 80; x++) {
            $scope.quilt[x] = [];
            for (var y = 0; y < 80; y++) {
                var obj = {
                    red: Math.floor(Math.random() * 256),
                    green: Math.floor(Math.random() * 256),
                    blue: Math.floor(Math.random() * 256),
                    neighbors: [],
                    // xx: x,
                    // yy: y,
                }
                $scope.quilt[x][y] = obj;
                var squareColor = $scope.colorConverter($scope.quilt[x][y]);
                    drawMe(squareColor);                                       
           
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
    $scope.syncron = function (obj) {
          //here is the syncro logic
        for (color in obj) {
            if (color != "red" && color != "green" && color != "blue") {
                return;
            }
            var blockValue = 0;
            //short[] test = new short[1];
                var buddies = 0;
            for (var i = 0; i < 8; i++) {
                var test = obj.neighbors[i][color] - obj[color];
                var flag = 0;
                if (test < -150) {
                    blockValue += 256;
                    flag = 1;
                    buddies++;
                }
                if (test > 150) {
                    blockValue -= 256;
                    flag = 1;
                    buddies--;
                }
                blockValue += obj.neighbors[i][color];
                if (!flag) {
                    if (test < 0) {
                        buddies--;
                    } else {
                        buddies++;
                    }
                }
            }
            var average = blockValue / 8;
            //how to react to syncro logic result
            //public SyncroLogicResult() {
            var result = obj[color];
            //if (average-exam[0] ==0); {result = exam[0];} <<--this line not needed
            if (average - result < 0 && average - result > -51 && buddies < 0) {
                result -= 1;
                if (result < 0) {
                    result += 256;
                }
            }
            if (average - result > 0 && average - result < 51 && buddies >0) {
                result += 1;
                if (result > 255) {
                    result -= 256;
                }
            }
            if (average - result >= 51 && average - result < 101 && buddies >0) {
                result += 2;
                if (result > 255) {
                    result -= 256;
                }
            }
            //return;//code here needs to take care of the "no change" case 
            obj[color] = result;
        }

    }// end of syncron function

    $scope.nightTime = function () {
        $('#field').empty();
        if ($scope.btnText === "Start") {
            $scope.btnText = "Continue";
            // $scope.colorLayer();
        }
        // else {
        //     $scope.btnText = "Start";
        // }

        for (var x = 0; x < 80; x++) {
            for (var y = 0; y < 80; y++) {
                $scope.syncron($scope.quilt[x][y]);
                //print out quilt obj here ...........
               
                    var squareColor = $scope.colorConverter($scope.quilt[x][y]);
                    drawMe(squareColor);                                       
            }//end of y loop
        }//end of x loop
    }//end nightTime function 

    drawMe = function (squareColor) {
                $(document).ready(function () {
                    var unitSize = 6; // width (and height) of one square
                    var unitsWide = 80; // number of squares along x-axis
                    var unitsTall = 80; // number of squares along y-axis
                    var field = $('#field').css({
                        overflow: 'hidden',
                        border: '16px solid #000000',
                        width: unitSize * unitsWide + 32
                    });

                    // var field = $('#field');
                    $('<span class="square"></span>').css({
                        display: 'block',
                        float: 'left',
                        // position: fixed,
                        // top: y * unitSize,
                        // left: x * unitSize,
                        width: unitSize,
                        height: unitSize,
                        'background-color': squareColor
                    }).appendTo(field);
                    // $(window).trigger('resize'); //attempt to force redraw

                });   
}// end of drawMe function


    // colors converted to hex values here --v
    $scope.colorConverter = function (obj) {
        var colorOut = "#";
        colorOut += obj.red.toString(16);
        colorOut += obj.green.toString(16);
        colorOut += obj.blue.toString(16);
        return colorOut;
    }
 
// timeout function that will allow for updating the view --v    
    $scope.waitForMe = function () {
        if ($scope.btnText === "Start") {
            $scope.colorLayer();
        }     
        // var count = 5;
        // var x = $interval(function(){  
        // for (var ticks = 0; ticks < 5; ticks++){
            // count--;
            $scope.nightTime();
            // if (!$scope.reddish || !$scope.greenish || !$scope.blueish) {
            //     // $interval.cancel(x)
            // }
        // } //, 3000 )
    }
})
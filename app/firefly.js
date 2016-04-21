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

    $scope.syncron = function (obj) {
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

    $scope.nightTime = function () {
        $('#field').empty();
        if ($scope.btnText === "Start") {
            $scope.btnText = "End";
            $scope.colorLayer();
        } else {
            $scope.btnText = "Start";
        }
        // var looper = 0
        // while (looper<5){
        // while ($scope.reddish || $scope.greenish || $scope.blueish) {
        // debugger;
        for (var x = 0; x < 80; x++) {
            for (var y = 0; y < 80; y++) {
                $scope.syncron($scope.quilt[x][y]);
                //print out quilt obj here ...........
                /*
                * style="position: absolute; top: ; left: ; width: 4px; height: 4px; background: #ffddaa"                    
                */
                    var squareColor = $scope.colorConverter($scope.quilt[x][y]);

                    drawMe(squareColor);                    

                    // .appendTo($("body"));

                    // if (y == 79) {
                    //     $('</br>').css({
                    //     display: 'block',
                    //     float: 'left',
                    //     width: 6,
                    //     height: 6,
                    // }).appendTo(field);
                    // }
                    // old code that didn't really work --v
                    // var target = document.getElementById("field").style; 
                    // target.top = y * 4;
                    // target.left = x * 4;
                    // target.background = rgb($scope.quilt[x][y].red, $scope.quilt[x][y].green, $scope.$scope.quilt[x][y].blue);
                    // end of non-working "legacy" code --^

                    // field.appendTo($("body"));
                    // if (x === 79 && y === 79 && field.length > 6400) {
                    //     field.splice(0, 6400);
                    // }
            }//end of y loop
        }//end of x loop
        // debugger;
        //     looper++;
        // }
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
                    }).appendTo(field)
                });
    
}


    // colors converted to hex values here --v
    $scope.colorConverter = function (obj) {
        var colorOut = "#";
        colorOut += obj.red.toString(16);
        colorOut += obj.green.toString(16);
        colorOut += obj.blue.toString(16);
        return colorOut;
    }

    //colored square drawing function --v
    // $(document).ready(function () {
    //     var unitSize = 16; // width (and height) of one square
    //     var unitsWide = 6; // number of squares along x-axis
    //     var unitsTall = 6; // number of squares along y-axis
    //     var drawing = $('<div class="drawing"></div>').css({
    //         overflow: 'hidden',
    //         border: '16px solid #000000',
    //         width: unitSize * unitsWide
    //     });
    //     for (var i = 0; i < unitsWide * unitsTall; i++) {
    //         var randomColor;
    //         randomColor = Math.random() * 0x1000000; // 0 < randomColor < 0x1000000
    //         randomColor = Math.floor(randomColor); // 0 < randomColor <= 0xFFFFFF
    //         randomColor = randomColor.toString(16); // hex representation randomColor
    //         randomColor = ("000000" + randomColor).slice(-6); // leading zeros added
    //         randomColor = "#" + randomColor; // # added
    //         $('<span class="square"></span>').css({
    //             display: 'block',
    //             float: 'left',
    //             width: unitSize,
    //             height: unitSize,
    //             'background-color': randomColor
    //         }).appendTo(drawing);
    //     }
    //     drawing.appendTo($("body"));
    // });
    // end of colored square drawing function --^

// timeout function that will allow for updating the view --v    
    $scope.waitForMe = function () {
        // var count = 5;
        var x = $interval(function(){  
            // count--;
            $scope.nightTime();
            if (!$scope.reddish || !$scope.greenish || !$scope.blueish) {
                $interval.cancel(x)
            }
        }, 3000, 5)
    }
})
let curveFactor = 0.4;

let getPath = function(startX, startY, endX, endY) {

    // M
    var AX = startX;
    var AY = startY;

    // L
    var BX = Math.abs(endX - startX) * 0.05 + startX;
    var BY = startY;

    // C
    var CX = startX + Math.abs(endX - startX) * curveFactor;
    var CY = startY;
    var DX = endX - Math.abs(endX - startX) * curveFactor;
    var DY = endY;
    var EX = - Math.abs(endX - startX) * 0.05 + endX;
    var EY = endY;

    // L
    var FX = endX;
    var FY = endY;

    // setting up the path string
    var path  = 'M' + AX + ',' + AY;
    path += ' L' + BX + ',' + BY;
    path += ' C' + CX + ',' + CY + ' ' + DX + ',' + DY + ' ' + EX + ',' + EY;
    path += ' L' + FX + ',' + FY;

    return path;

}

var addCurve = function(pathId,positions) {

    var path = getPath(positions[0],positions[1],positions[2],positions[3]);

    const color = (lk.type == 'data') ? 'blue' : 'white';
    const weight = (lk.type == 'data') ? '2' : '3';

    var html = '<path id="'+pathId+'" d="'+path+'" stroke="'+color+'" stroke-width="'+weight+'" fill="none"></path>';

    appendSVG(html);
}

var updateCurve = function(pathId,positions) {

    var path = getPath(positions[0],positions[1],positions[2],positions[3]);

    $('#'+pathId).attr("d",path);

}

var drawCurve = function(id, side, a, b) {

    let position = (side == 'right')
        ? [a[0], a[1], b[0], b[1]]
        : [b[0], b[1], a[0], a[1]];

    if(path.exist(id)) {

        updateCurve(id, position);

    } else {

        addCurve(id, position);

    }

}

var appendSVG = function(html) {

    $('svg').append(html);
    $("svg").html($("svg").html());

}

var removeCurve = function(id) {

    $('#'+id).remove();

}

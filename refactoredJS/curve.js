'use strict'

class Curve {

    static get([ startX, startY ], [ endX, endY ]) {

        // horizontal distance
        const Xdiff = Math.abs(endX - startX);

        // M
        const M = 'M' + startX + ',' + startY;

        // L
        const L1 = 'L' + Xdiff * Curve.warp + startX + ',' + startY;

        // C
        const c1 = startX + Xdiff * Curve.factor;
        const c2 = endX - Xdiff * Curve.factor;
        const c3 = - Xdiff * Curve.warp + endX;
        const C = 'C' + c1 + ',' + startY + ' ' + c2 + ',' + endY + ' ' + c3 + ',' + endY

        // L
        const L2 = 'L' + endX + ',' + endY;

        // setting up the path string
        return M + ' ' + L1 + ' ' + C + ' ' + L2;

    }

}

Curve.factor = 0.4;
Curve.warp = 0.05;

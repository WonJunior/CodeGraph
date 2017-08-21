class Linking {

    static handler() {

        $('.snapDock').mousedown(function() {

            lk = new Linking(this);
            lk.mouseDown();

        })

    }

    mouseDown() {

        lk.snapped = false;
        if (this.occupied) {

            lk.unoccupy()

            lk.findOccupant()

        }

        if (!this.occupied) {

            lk.pos = lk.offset();

            $('.snapDock').mouseenter(function() {

                lk.mouseEnter(this);

            });

        }

        $('.snapDock').mouseleave(function() {
            lk.mouseLeave();
        })

    }

    unoccupy() {
        lk.$.attr('state', '');
        lk.occupied = false;
    }

    findOccupant() {

        const pathId = path.linkedTo();

        const startDock = path.startDock(pathId)

        this.start = startDock[0]; this.$ = startDock[1];
        [this.node, this.occupied, this.type, this.dock, this.side] = this.details(startDock[0]);
        this.id = this.node+'-'+this.dock;
        this.pos = this.offset();

        path.switchId(pathId, this.id);

    }

    offset() {

        let pos = arguments[0] ? lk.target.$.offset() : lk.$.offset();
        return [pos.left + 17, pos.top + 17]

    }

    mouseLeave() {

        this.snapped = false;

        $('body').unbind('mousemove');

        // <!-- Added to prevent mouseup event stacking -->
        $('body').unbind('mouseup');

        $('body').mousemove(function() {
            lk.mouseMove();
        })

        $('body').mouseup(function() {
            lk.mouseUp();
        })

    }

    mouseUp() {

        /**********/
        $('body').unbind('mousemove')
        $('body').unbind('mouseup')
        $('.snapDock').unbind('mouseenter')
        $('.snapDock').unbind('mouseleave')
        /**********/

        if (!this.snapped) {

            this.remove();

        } else if(this.snapped) {

            if(this.target.occupied) {

                path.removeOccupant();

            } this.save();

        }

    }

    save() {

        const attr = path.orientAttr()

        lk.occupy(attr[0]);
        path.setAttr(this.id, attr[1])

    }

    orientPathName() {

    }

    occupy(el) {

        el.attr('state', true);

    }

    remove() {

        if (arguments[0]) { removeCurve(this.target.id) } else { removeCurve(this.id) }

    }

    mouseEnter(that) {

        lk.targetInit(that);
        $('body').unbind('mousemove');

        if (lk.areCompatible()) {

            this.target.pos = this.offset('target');

            lk.snapped = true;

            drawCurve(this.id, this.side, this.pos, this.target.pos);

        } else {

            $('body').mousemove(function() {

                lk.mouseMove();

            })

        }

    }

    mouseMove() {

        const mousePos = [event.pageX, event.pageY];
        drawCurve(this.id, this.side, this.pos, mousePos);

    }

    targetInit(that) {

        lk.target = {}
        const details = lk.details(that);

        lk.target.$ = $(that)
        lk.target.node = details[0];
        lk.target.occupied = details[1];
        lk.target.type = details[2];
        lk.target.dock = details[3];
        lk.target.side = details[4];
        lk.target.id = details[0]+'-'+details[3];

    }

    areCompatible() {

        const notEqual = (this.node != this.target.node);
        const opposite = (this.side != this.target.side);
        const sameType = (this.type == this.target.type);
        return notEqual && opposite && sameType;

    }

    details() {
        let el = arguments[0] ? $(arguments[0]) : this.$;
        let array = [];

        array[0] = el.parents('.container').attr('class').split(' ')[1]
        array[1] = el.attr('state') == 'true';

        return array.concat(el.parent().attr('class').split(' '));
    }

    constructor(startDock) {
        this.start = startDock;
        this.$ = $(this.start);
        [this.node, this.occupied, this.type, this.dock, this.side] = this.details();
        this.id = this.node+'-'+this.dock;
    }

} let lk;
'use strict'

class DockElement extends Element {

    static parameters = {
        ExeDock: { offset: 10 },
        DataDock: { offset: 7 }
    }

	get position() {

        const [ nodePosX, nodePosY ] = this.nodeElement.position;
        const [ offsetX, offsetY ] = this.offset;

        return [ nodePosX + offsetX, nodePosY + offsetY ];

    }

    get labelText() {
        
        return this.label.textContent;
    
    }

    set labelText(label) {
        
        this.label.textContent = label;

    }

	constructor(dock, location, params) {

		super(dock);

        this.render(dock.node.element[location]);
        
		this.nodeElement = dock.node.element;
        this.location = location;
        this.dock = dock;
        
        this.labelText = params.label;
        
        wait(() => this.offset = this.getRelativePosition());

	}

	create(dock) {

		const $ = Template.dock();
		
        Object.assign(this, {
            container: $('.dock-container'),
            pin: $('.dock'),
            snap: $('.snap-dock'),
            param: $('.param-container'),
            label: $('.param-label'),
        });

        this.container.classList.add(
            dock instanceof DataDock ? 'data' : 'exe',
            dock.isRight ? 'right' : 'left'
        );

        this.snap.ref = dock.id;
        this.container.id = dock.id;

    }

	getRelativePosition() {

        const nodePos = this.nodeElement.container.getBoundingClientRect();
        const dockPos = this.pin.getBoundingClientRect();
        const offset = DockElement.parameters[this.dock.constructor.name].offset;

        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + offset,
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + offset
        ];

    }

}
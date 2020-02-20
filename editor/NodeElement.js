'use strict'

class NodeElement extends Element {

	/**
	 * Getter/Setter for the node's header background color.
	 */
	get headerColor() { 
		
		return this.header.style.background;
	
	}

	set headerColor(color) {

		this.header.style.background = color;
	
	}

	/**
	 * Getter for the width and length of the node's container returned as an array.
	 */
	get size() {
		
		const properties = this.container.getBoundingClientRect();

		return [ properties.width, properties.height ];

	}

 	/**
	 * Setter which adds or remove the `"selected"` class name the node's container.
	 */
	set highlight(bool) { 
		
		this.container.classList[ bool ? 'add' : 'remove' ]('selected'); 
	
	}

	/**
     * Getter/Setter which returns the x and y coordinates of the node's position on the canvas.
     */
    get position() {

        return [ this.container.style.left, this.container.style.top ].map(parseFloat);

    }

	set position(position = [0, 0]) { 
		
		const [ x, y ] = this.boundaryClamp(position);
		Object.assign(this.container.style, { left: `${x}px`, top: `${y}px` });

	}

	/**
	 * Getter/Setter for the text label on the node's header section.
	 */
	get labelText() {

		return this.label.textContent;

	}

	set labelText(label) {

		this.label.textContent = label;

	}

	/**
	 * Getter/Setter for node's background text label.
	 */
	get backgroundText() {

		return this.label.textContent;

	}

	set backgroundText(background) {

		this.background.textContent = background;

	}
		
	constructor(node, dockElements, parent, params) {

		super(node);
		
		this.render(parent, dockElements);

		this.labelText = params.label;
		this.backgroundText = params.background;
		this.headerColor = params.header;
		this.position = params.position || [0,0];

		if (this.hideBody) this.hide('body');
		if (this.hideHeader) this.hide('header');

	}

	render(parent, dockElements) {

		super.render(parent);

		dockElements.forEach(dockElement => dockElement.render(this));

	}

	/**
	 * Creates the node's HTML element. All HTML elements that are needed are saved as HTML objects 
	 * in the NodeElement instance. The property element contains the following elements:
	 * { `node`, `header`, `label`, `headLeft`, `headRight`, `bodyLeft`, `bodyRight`, `background` }
	 * @override
	 */
	create(node) {

		const $ = Template.node();

		Object.assign(this, {
			container: $('.node-container'),
			header: $('.header'),
			label: $('.header-title'),
			headLeft: $('.header-block > .left-block'),
			headRight: $('.header-block > .right-block'),
			bodyLeft: $('.body > .left-block'),
			bodyRight: $('.body > .right-block'),
			background: $('.body > .background')
		});
		
		this.header.ref = node.id;
		this.container.id = node.id;

	}

	/**
	 * Clamps the provided [x, y] position so the node container remains inside its parent canvas area.
	 */
	boundaryClamp(position) {

		return position.map((value, i) => {

			const [ minLimit, maxLimit ] = [ 0, (Canvas.size[i] - this.size[i]) / Canvas.zoomLevel ];

			return value <= minLimit ? minLimit : (value >= maxLimit ? maxLimit : value);

		});

	}

	/**
	 * Hides the corresponding node portion
	 * @param {string} part is either `"header"` or `"body"`
	 */
	hide(part) {

		this.container.classList.add(`hide-${part}`);

	}

	/**
	 * Toggles the `"selected"` class name on the node's container element.
	 * @returns {Boolean} - the state of the node, i.e. if it is selected or not
	 */
	toggleHighlight() {
		
		return this.container.classList.toggle('selected');

	}

}
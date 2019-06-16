module.exports = function (RED) {
	const GroveChainableRGBLed = require('node-grovehat').GroveChainableRGBLed;
	
	function GroveChainableRGBLedNode(config) {
		RED.nodes.createNode(this, config);
		this.pin = parseInt(config.pin) || 5;

		if (RED.settings.verbose) { this.log("GroveChainableRGBLed: Pin: " + this.pin); }
		
		var display = new GroveChainableRGBLed(this.pin, this.pin + 1);

		var node = this;
		node.on('input', function (msg) {
			display.show(msg.payload);
		});
	}
	RED.nodes.registerType("grove-chainable_rgb_led", GroveChainableRGBLedNode);
}
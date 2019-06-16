module.exports = function (RED) {
	const GroveChainableRGBLed = require('node-grovehat').GroveChainableRGBLed;

	function GroveChainableRGBLedNode(config) {
		RED.nodes.createNode(this, config);
		this.pin = parseInt(config.pin) || 5;

		if (RED.settings.verbose) { this.log("GroveChainableRGBLed: Pin: " + this.pin); }

		var led = new GroveChainableRGBLed(this.pin, this.pin + 1);

		var node = this;
		node.on('input', function (msg) {
			// msg.payload is rgb(red, green, blue)
			// format is ['rgb', 'red, green, blue']
			var format = msg.payload.replace(')', '').split('(');
			values = format[1].split(",");
			if (format[0] == "rgb") {
				led.setColorRGB(0, values[0], values[1], values[2]);
			} else if (format[0] == "hsv") {
				led.setColorHSB(0, values[0] / 360.0, 1.0, 0.5);
				//led.setColorHSB(0, values[0] / 360.0, parseInt(values[1]) / 100.0, parseInt(values[2]) / 100.0);
			}
		});
	}
	RED.nodes.registerType("grove-chainable-rgb-led", GroveChainableRGBLedNode);
}
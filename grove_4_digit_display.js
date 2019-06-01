module.exports = function (RED) {
	const Grove4DigitDisplay = require('node-grovehat');
	
	function Grove4DigitDisplayNode(config) {
		RED.nodes.createNode(this, config);
		this.pin = parseInt(config.pin) || 5;

		if (RED.settings.verbose) { this.log("Grove4DigitDisplay: Pin: " + this.pin); }
		
		var display = new Grove4DigitDisplay(this.pin, this.pin + 1);

		var node = this;
		node.on('input', function (msg) {
			display.show(msg.payload);
		});
	}
	RED.nodes.registerType("grove-4-digit-display", Grove4DigitDisplayNode);
}
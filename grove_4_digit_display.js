module.exports = function (RED) {
	const Grove4DigitDisplay = require('node-grovehat');
	
	function Grove4DigitDisplayNode(config) {
		RED.nodes.createNode(this, config);
		this.pin = 5;
		var display = new Grove4DigitDisplay(this.pin, this.pin + 1);

		var node = this;
		node.on('input', function (msg) {
			display.show(msg.payload);
		});
	}
	RED.nodes.registerType("grove-4-digit-display", Grove4DigitDisplayNode);
}
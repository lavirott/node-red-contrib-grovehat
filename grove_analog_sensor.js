module.exports = function (RED) {
	const GroveAnalogSensor = require('node-grovehat').GroveAnalogSensor;

	function GroveAnalogSensorNode(config) {
		RED.nodes.createNode(this, config);
		this.pin = parseInt(config.pin) || 0;

		if (RED.settings.verbose) { this.log("GroveAnalogSensor: Pin: " + this.pin); }

		var analogSensor = new GroveAnalogSensor();

		var node = this;
		node.on('input', function (msg) {
			analogSensor.read(this.pin);
		});
	}
	RED.nodes.registerType("grove-analog-sensor", GroveAnalogSensorNode);
}
module.exports = function (RED) {
	const GroveAnalogSensor = require('node-grovehat').GroveAnalogSensor;

	function GroveAnalogSensorNode(config) {
		RED.nodes.createNode(this, config);
		this.pin = parseInt(config.pin) || 0;

		if (RED.settings.verbose) { this.log("GroveAnalogSensor: Pin: " + this.pin); }

		var analogSensor = new GroveAnalogSensor();

		var node = this;
		//console.log(analogSensor.name() + " " + analogSensor.version());
/* 		
		setTimeout(function(){
			node.send({ topic: "pi/" + this.pin, payload: analogSensor.read(this.pin) });
		}, 250);
		 */

		node.on('input', function (msg) {
			node.send({topic: "pi/" + this.pin, payload: analogSensor.read(this.pin) });
		});
		
	}
	RED.nodes.registerType("grove-analog-sensor", GroveAnalogSensorNode);
}
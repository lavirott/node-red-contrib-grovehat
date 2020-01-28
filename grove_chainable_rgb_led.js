module.exports = function (RED) {
    const GroveChainableRGBLed = require('node-grovehat').GroveChainableRGBLed;

    function GroveChainableRGBLedNode(config) {
        RED.nodes.createNode(this, config);
        this.pin = parseInt(config.pin) || 5;

        if (RED.settings.verbose) {
            this.log("GroveChainableRGBLed: Pin: " + this.pin);
        }

        var led = new GroveChainableRGBLed(this.pin, this.pin + 1, config.nbleds);

        var node = this;
        node.on('input', function (msg) {
			if(msg.payload.led !== undefined){
				// ""new"" object payload style for individual LED addressing
				if(msg.payload.format === "rgb"){
					led.setColorRGB(msg.payload.led, msg.payload.r, msg.payload.g, msg.payload.b);
				} else if(msg.payload.format === "hsv"){
					led.setColorHSB(msg.payload.led, msg.payload.h / 360.0, 1.0, 0.5);
				} else {
					console.log("invalid format");
					console.log(msg.payload);
				}
			} else {
				// ""old"" string payload style
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
			}
        });
    }
    RED.nodes.registerType("grove-chainable-rgb-led", GroveChainableRGBLedNode);
}

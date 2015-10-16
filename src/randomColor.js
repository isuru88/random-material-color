var murmur = require("murmurhash-js");

module.exports = function() {

    /* usedColors = [{ text:SomeText, color: SomeColor }] */
    var usedColors = [],
        defaultOptions = {
            shades: ['500'],
            palette: defaultPalette,
            text: null,
			ignoreColors: []
        },

        getColor = function (options) {
            options || (options = defaultOptions);
            options.palette || (options.palette = defaultPalette);
            options.shades || (options.shades = ['500']);			

            var l = usedColors.length,
                color;

            for (var i = 0; i < l; i++) {
                if (options.text && usedColors[i].text === options.text) {
                    return usedColors[i].color;
                }
            }

            color = pickColor(options);
			
            if (options.text) {
                usedColors.push({text: options.text, color: color});
            }

            return color;
        },

        pickColor = function (options) {
            var shade = options.shades[getRandomInt(options.shades.length)];
            var color = '';

            for (var key in options.palette) {
                if (options.palette.hasOwnProperty(key) && key === shade) {
                    if (options.text) {
                        color = options.palette[key][getHashedInt(options.text, options.palette[key].length)];
                    }
                    else {
                        color = options.palette[key][getRandomInt(options.palette[key].length)];
                    }
                }
            }

            return color;
        },

        getRandomInt = function (max) {
            return Math.floor(Math.random() * (max));
        },

        getHashedInt = function (text, max) {
            var hash = murmur.murmur3(text) / 10000000000; // Turn it into a fraction
			if(hash < 0.1){
				hash = hash * 10;
			}			
            return Math.floor(hash * (max));
        };


    return {
        getColor: getColor
    };
}();

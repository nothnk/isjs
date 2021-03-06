/** 
 * is.js
 * Version: 0.1.1
 * Created by: Ragnar Þór Valgeirsson (rthor)
 * URL: http://github.com/rthor/isjs
 * License: MIT
 */
(function() {
	// All regexes that can be tested against.
	regex = {
		cc: /^[0-9]{16}$/,
		datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
		email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		isbn: /^(?:(?=.{17}$)97[89][ -](?:[0-9]+[ -]){2}[0-9]+[ -][0-9]|97[89][0-9]{10}|(?=.{13}$)(?:[0-9]+[ -]){2}[0-9]+[ -][0-9Xx]|[0-9]{9}[0-9Xx])$/,
		latlng: /-?\d{1,3}\.\d+/,
		phone: /^(?:\+\d{3}\s?)?\d{3}[ ]?[-]?[ ]?\d{4}$/,
		zip: {
			'au': /^\d{4}$/,
			'at': /^\d{4}$/,
			'be': /^\d{4}$/,
			'br': /^\d{5}[\-]?\d{3}$/,
			'ca': /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
			'dk': /^\d{3,4}$/,
			'de': /^\d{5}$/,
			'es': /^((0[1-9]|5[0-2])|[1-4]\d)\d{3}$/,
			'gb': /^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? \d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/,
			'hu': /^\d{4}$/,
			'is': /^\d{3}$/,
			'it': /^\d{5}$/,
			'jp': /^\d{3}-\d{4}$/,
			'lu': /^(L\s*(-|—|–))\s*?[\d]{4}$/,
			'nl': /^[1-9]\d{3}\s?[a-zA-Z]{2}$/,
			'pl': /^\d{2}\-\d{3}$/,
			'se': /^\d{3}\s?\d{2}$/,
			'us': /^(\d{5}([\-]\d{4})?)$/
		}
	};

	/**
	 * Trims leading and trailing whitespace of a string
	 * @return {string}
	 */
	function trim() {
		return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
	}

	/**
	* Tests a regular expression against a string
	* @param  {string} value
	* @param  {regexp} expression
	* @return {boolean}
	*/
	function test( value, expression ) {
		return expression.test( value.trim() );
	}

    /**
     * Make the is function globally avalible.
     */
    window.is = function( elem, expression ) {
        if (typeof expression === undefined) return false;

        var deep = false;

        // If expression is deep
        if (
            typeof expression === 'string' &&
            expression.indexOf(':') !== -1
        ) {
            expression = expression.match( /(\w+)(?:\:)(\w+)/ );
            deep = expression[2];
            expression = expression[1];
        }

        if (regex.hasOwnProperty(expression)) {
            return test(elem, deep ? regex[expression][deep] : regex[expression]);
        }

        if (typeof expression === 'object') {
            return test(elem, expression);
        }

        return false;
    };
})();
var starjs = {
	correct: function(message, allowMultipleCorrections = false, allowLongCorrections = false) {
		var correction = message[1];
		var words = message[0].split(" ");

		if (correction.split(" ").length - 2 > words.length) {
			console.log("Filter 1");
			return false;
		}	       

		correction = correction.split("*");
		if (!allowLongCorrections) {
			if (message[1].split(" ").length > 4) {
				console.log("Triggered filter 2");
				return false; // disallow long corrections
			}
		}

		var modifiedText = false;
		for (var i = words.length; i--;) {

			if (this.soundex(words[i]) == this.soundex(correction)) {
				words[i] = correction;   
				modifiedText = true;
				if (!allowMultipleCorrections) {
					break;
				}
			}

		}
		if (modifiedText) {
			return words.join(" ");
		} else {
			console.log("Star.js: could not find suitable replacement.")
			return false;
		}

	},
	soundex: function(str) { 
		str = str.toString();
		str = str.toUpperCase();
		str = str.split('');

		var firstLetter = str[0];

		// convert letters to numeric code
		for (var i = 0; i < str.length; i++) {
			switch (str[i]) {

				case 'B':
				case 'F':
				case 'P':
				case 'V':
					str[i] = '1';
					break;

				case 'C':
				case 'G':
				case 'J':
				case 'K':
				case 'Q':
				case 'S':
				case 'X':
				case 'Z':
					str[i] = '2';
					break;

				case 'D':
				case 'T':
					str[i] = '3';
					break;

				case 'L':
					str[i] = '4';
					break;

				case 'M':
				case 'N':
					str[i] = '5';
					break;

				case 'R':
					str[i] = '6';
					break;

				default:
					str[i] = '0';
					break;
			}
		}

		// remove duplicates
		var output = firstLetter;
		for (var i = 1; i < str.length; i++)
			if (str[i] != str[i-1] && str[i] != '0')
				output += str[i];

		// pad with 0's or truncate
		output = output + "0000";
		return output.substring(0, 4);
	}

};

module.exports = starjs;

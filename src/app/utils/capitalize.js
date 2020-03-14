function capitalize(string) {
	return string.trim()
		.split(' ')
		.filter((word) => {
			if (word.length === 0) return false;
			return true;
		})
		.map((word) => {
			return (word.charAt(0).toUpperCase() + word.slice(1)).trim();
		})
		.join(' ');
}

module.exports = capitalize;

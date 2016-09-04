
module.exports = {

	numberWithSeed: function(seed, seed2, max, min) {
	    max = max || 1;
	    min = min || 0;

	    seed = ((seed + seed2) * 9301 + 49297) % 233280;
	    var rnd = seed / 233280.0;

	    return min + rnd * (max - min);
	}
}
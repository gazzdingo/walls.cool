//function is taken from Moka @ https://bitbucket.org/moka/fuglyflowers/ thanks a ton for it


var noise = new ClassicalNoise();
var noiseSeed = Math.random() * 255;

//helper function to noisify a paperjs path or a paperjs group of paths
function applyNoiseToPath(_path, _sampleDist, _noiseDiv, _noiseScale)
{
    if(_path instanceof Group)
    {
        for(var i = 0; i < _path.children.length; i++)
        {
            applyNoiseToPath(_path.children[i], _sampleDist, _noiseDiv, _noiseScale);
        }
    }
    else
    {
        if(_sampleDist < _path.length)
            _path.flatten(_sampleDist);
        for(var i = 0; i < _path.segments.length; i++)
        {
            var noiseX = noise.noise(_path.segments[i].point.x / _noiseDiv,
                _path.segments[i].point.y / _noiseDiv,
                noiseSeed);
            var noiseY = noise.noise(_path.segments[i].point.y / _noiseDiv,
                noiseSeed,
                _path.segments[i].point.x / _noiseDiv);

            _path.segments[i].point = _path.segments[i].point + new Point(noiseX, noiseY) * _noiseScale;
        }
        _path.smooth();
    }
}

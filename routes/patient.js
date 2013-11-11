
/*
 * GET patient viewer.
 */
 
exports.viewer = function(req, res){
    res.render('viewer', { title: 'Viewer', name: 'Toto' });
};


/*
 * POST patient files.
 */

exports.upload = function(req, res){
console.log(req.files);
    var file = req.files.file;
    var sys = require('sys')
    var exec = require('child_process').exec;
 
    console.log('Temp file path: ' +  file.path);
    console.log('Original file name: ' + file.name);
    

    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("dcm2xml "+ file.path +" temp/test.xml", puts);
    //exec("ls", puts);
    res.redirect('viewer');
};


/////////////////////////
// SOCKET IO

exports.send_pixel_data = function(socket){
    var array = new Uint16Array(10);
    for (var i=0; i<array.length; ++i)
        array[i] = i * 10000.0 / 1.23658;

    socket.emit('data', {
        name: 'Charlie',
        pixel_data: array
    });
};

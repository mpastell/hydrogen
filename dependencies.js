// Generated by CoffeeScript 1.10.0
(function() {
  var MINIMAL_WIN_CL_VERSION, child_process, os, spawn,
    slice = [].slice;

  child_process = require('child_process');

  if (!child_process.spawnSync) {
    throw "Please install iojs or node >= 0.12. Hydrogen doesn't support older versions of node";
  }

  os = require('os');

  MINIMAL_WIN_CL_VERSION = 15;

  spawn = function(command) {
    var a, c, o, ref;
    ref = command.split(' '), c = ref[0], a = 2 <= ref.length ? slice.call(ref, 1) : [];
    o = child_process.spawnSync(c, a);
    o.stdout = o.stdout.toString().trim();
    o.stderr = o.stderr.toString().trim();
    return o;
  };

  if (os.platform() === 'win32') {
    spawn("cl").stdout.replace(/Version \d+/, function(x) {
      if (parseInt(x.split(' ')[1]) < MINIMAL_WIN_CL_VERSION) {
        throw new Error('You need Visual Studio 2013 (or above) Community Edition to compile ZMQ');
      }
    });
  }

  if (os.platform() === 'darwin') {
    if (!spawn("which pkg-config").stdout.length) {
      throw new Error('You need pkg-config to install zmq: brew install pkg-config (or use your favorite build tool)');
    }
  }

  if (!(/\ 2\./.test(spawn('python --version').stderr) || /\ 2\./.test(spawn('python2 --version').stderr))) {
    throw new Error("Python2 is required to build Hydrogen. You should have python\nor python2 in your PATH variable.\nCheck your python installation (if you have one) with: python --version");
  }

  if (child_process.spawnSync("python", ["-c", "import zmq"]).stderr.toString()) {
    throw new Error("You need to install ZMQ. Please refer: http://zeromq.org/intro:get-the-software");
  }

  if (!spawn("pip show notebook").stdout) {
    throw new Error("Please install notebook: pip install ipython[notebook]");
  }

}).call(this);

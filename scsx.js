(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_name = function(deviceid, callback) {
        // Make an AJAX call to the Smart Citizen API
        $.ajax({
              url: 'http://api.smartcitizen.me/devices/'+deviceid,
              dataType: 'jsonp',
              success: function( device_data ) {
                  // Got the data - parse it and return the name
                  name = device_data['name'];
                  return name;
              }
        });
    };
    
    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Get Information Device %s', 'get_name',],
            ['r', '%n ^ %n', 'power', 2, 3]
        ]
    };

    // Register the extension
    ScratchExtensions.register('SmartCitizen extension', descriptor, ext);
})({});

var mqtt = require('mqtt'), url = require('url');
var querystring = require('querystring'); 
var request = require("request");
const EventEmitter = require('events');
var Today=  new Date();
var smartxlab_content={
  uri: "https://getsmartx.com:3000/api/1/login",
  method: "POST",
  form: {
    username: "ntut",
	password: "ntut"
  }
}


var url = 'mqtt://getsmartx.com';

var Password_token;

var reques = new EventEmitter();

var k=setInterval(function(){reques.emit('start');},100000);

reques.on('start',function(){
				request(smartxlab_content, function(error, response, body) {

				  obj = JSON.parse(body);
				  console.log(obj.res.token);
				  Password_token=obj.res.token;
				  var options = {
						  port: '1883',
						  username: 'ntut',
						  password: Password_token
						};
						
				var client = mqtt.connect(url,options);



				client.on('connect', function () {
				  client.subscribe('ntut/186',function(){
						client.on('message', function (topic, message) {
					  // message is Buffer 
					  console.log(message.toString());
					  client.end();
					});
				  });
				});

				client.on('error', function (error) {
				  console.log("%s",error);
				  //console.log("%s",options.password);
				  
				});

				client.on('packetreceive', function (packet) {
				  console.log("%s",packet);
				  //console.log("%s",options.password);
				  
				});
				});
});
reques.emit('start');







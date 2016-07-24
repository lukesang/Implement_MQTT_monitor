
var mqtt = require('mqtt'), url = require('url');
var querystring = require('querystring'); 
var request = require("request");
var Today=  new Date();
var schedule = require('node-schedule');
var client
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
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 7)];
rule.hour = 8;
rule.minute = 38;
 token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI1NzcwZTgzYzEwZWNmMzJiYTQ2ZTg2MmYiLCJpYXQiOjE0NjkzMjA1NDAsImV4cCI6MTQ3MDUzMDE0MCwiaXNzIjoiZ2V0c21hcnR4LmNvbSJ9.eQfg8fP4zJgY14fKV2He4ibQDf47mv6iU30bSs_kSIw'

	var j=schedule.scheduleJob(rule, function(){
    console.log('The answer to life, the universe, and everything!');
});
    //request(smartxlab_content, function(error, response, body) {
		
		//  obj = JSON.parse(body);
		 // console.log(obj.res.token);
		  //Password_token=obj.res.token;
		  //options = {
			//	  port: '1883',
			//	  username: 'ntut',
			//	  password: token
				//	};
				//})
				
		var client = mqtt.connect(url,options,function(){
			request(smartxlab_content, function(error, response, body) {
		
			obj = JSON.parse(body);
			console.log(obj.res.token);
			Password_token=obj.res.token;
			var options = {
				  port: '1883',
				  username: 'ntut',
				  password: Password_token
					};
		  	})
		});
		
			client.on('connect', function () {
				  client.subscribe('ntut/186',function(){
					client.on('message', function (topic, message) {
			  // message is Buffer 
			  console.log(message.toString());
			  
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
	













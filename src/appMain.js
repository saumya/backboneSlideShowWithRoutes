requirejs.config({
	//To get timely, correct error triggers in IE, force a define/shim exports check.
    enforceDefine: true,
	// 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.3.min")
    paths: {
        // Core Libraries
        "jquery": "../assets/js/jquery-1.9.0",
        "underscore": "../assets/js/underscore-1.4.4",
        "backbone": "../assets/js/backbone-0.9.10",
        "jquery.xml2json": "../assets/js/jquery.xml2json" //xml to json plugin for JQuery
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        'jquery': {
            exports: '$'
        },
        'jquery.xml2json':{
        	deps: ['jquery'],
        	exports: 'jquery.xml2json'
        },
        'underscore': {
        	exports: '_'
        },
        'backbone': {
            deps: ['jquery','underscore','jquery.xml2json'],
            exports: 'Backbone'
        }
    }// end Shim Configuration
});


define(
    ['jquery','underscore','backbone','jquery.xml2json'],
    
    function (jQueryLocal,underscoreLocal,backboneLocal,xml2jsonLocal) {
       	console.log('Application initalisation');
       	//finally the call to the application initialisation
       	require(['modules/dirtyModule','modules/appEntryModule'],
       	function(DirtyModule,ApplicationEntry){
			console.log('Entry to the application Entry code : Seems to be running after application is finished initialising !!');
			//We are not doing anything specifically here as a space for flexibility
			new ApplicationEntry();
			/*
			$.get('assets/data/slides.xml',function(ev){
				var dataJson=$.xml2json(ev).slide;
				new ApplicationEntry(dataJson);
			});
			*/
		});
    }
);
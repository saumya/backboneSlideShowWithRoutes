define('modules/router/applicationRouter',
function(){
	var AppRouter = Backbone.Router.extend({
		initialize: function(options) {
			console.log('AppRouter : initialize : ');
			this.pageCounter=0;
			this.totalCount=0;
		},
		routes: {
			//'': 'index',
			'page/:query': 'page'
		},
		index: function() {
			console.log('AppRouter : index : ');
			//this.trigger('Route.onPage',{'pageNum':1});
			this.navigate('#/page/1');
		},
		page: function(query){
			console.log('AppRouter : page : '+query);
			this.pageCounter=query;
			this.trigger('Route:onPage',{'pageNum':query});
		},
		//utility functions
		setMaxPageNum:function(maxValue){
			console.log('AppRouter : setMaxPageNum : total Pages='+maxValue);
		},
		gotoHomePage: function(){
			console.log('AppRouter : gotoHomePage : ');
			this.pageCounter=1;
			this.navigate('#/page/'+this.pageCounter,{trigger: true, replace: false});
		},
		goToPage: function(whichOne){
			console.log('AppRouter : goToPage : '+whichOne);
			if(whichOne==='back')
			{
				this.pageCounter--;
			}else if(whichOne==='next'){
				this.pageCounter++;
			}
			this.navigate('#/page/'+this.pageCounter,{trigger: true, replace: false});
		}
 
	});
	return AppRouter;	
		
});

define('modules/appEntryModule',
	['modules/collection/slidesCollection','modules/model/slideModel','modules/view/slideView','modules/router/applicationRouter'],
	function(SlidesCollection,SlideModel,SlideView,ApplicationRouter){
		console.log('AppEntry Module : Lets do the XML parsoing dance here. Before moving on to initialize this view !! ');
		
		var ApplicationEntry = Backbone.View.extend({
			initialize:function(){
				console.log('ApplicationEntry : initialize');
				//initialise properties
				this.pageCounter=1;
				//collection
				this.slidesCollection=new SlidesCollection();
				this.slidesCollection.on("reset",function(event){
					//console.log(this.length);//seems "this" refers to the Collection
					this.onCollectionUpdatedWithData();
					//console.log(this.pageCounter);
				},this);//passing "this" as third parameter makes the context to this class rather than the Collection
				this.slidesCollection.fetch();//they call it bad practice
			},
			onCollectionUpdatedWithData: function(event){
				console.log('ApplicationEntry : onCollectionUpdatedWithData : ');
				//view
				this.slide=new SlideView();
				this.slide.on('SlideView:onBack',this.onBack,this);
				this.slide.on('SlideView:onNext',this.onNext,this);
				//Router
				this.appRouter=new ApplicationRouter();
				this.appRouter.on('Route:onPage',this.onPageRoute,this);
				this.appRouter.setMaxPageNum(this.slidesCollection.length);
				Backbone.history.start();
				//Go to first page
				this.appRouter.gotoHomePage();
			},
			onPageRouteIndex: function(){
				console.log('ApplicationEntry : onPageRouteIndex : page=index');
				//this.renderPage(1);
				//this.pageCounter++;
				console.log('ApplicationEntry : onPageRouteIndex : this.pageCounter='+this.pageCounter);
				//this.appRouter.goToPage(this.pageCounter);
			},
			onPageRoute: function(event){
				console.log('ApplicationEntry : onPageRoute : page='+event.pageNum);
				
				this.renderPage(event.pageNum);
			},
			onNext:function(event){
				console.log('ApplicationEntry : onNext');
				this.appRouter.goToPage('next');
			},
			onBack:function(event){
				console.log('ApplicationEntry : onBack : this.pageCounter='+ this.pageCounter);
				this.appRouter.goToPage('back');
			},
			renderPage: function(pageNum){
				console.log('ApplicationEntry : renderPage : pageNum='+pageNum);
				//checking for first and last page
				if(pageNum<=0)
				{
					console.log('ApplicationEntry : renderPage : NO BACK ');
				}else if(pageNum>=(this.slidesCollection.length+1))
				{
					console.log('ApplicationEntry : renderPage : NO NEXT ');
				}else{
					var pageCount=pageNum-1;//as count starts from 0
					this.slideModel=this.slidesCollection.at(pageCount);
					this.slide.setData(this.slideModel);
					
					if(pageCount<=0)
					{
						this.slide.disableBackButton();
						this.slide.enableNextButton();
					}else if(pageCount>=(this.slidesCollection.length-1)){
						this.slide.enableBackButton();
						this.slide.disableNextButton();
					}
				}
			}
		});
		return ApplicationEntry;
	});

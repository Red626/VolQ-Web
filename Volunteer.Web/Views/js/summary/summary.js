(function () {
	$('.summernote').summernote({
	  toolbar: [
	    ['style', ['bold', "italic", "underline"]],
	    ['fontsize', ['fontsize']],
	    ['color', ['color']],
	    ['para', ["ul", "ol", "paragraph"]],
	    ["height", ['height']],
	  ],
	  height: 300
	});
	var query = getquery();
	if (query) {
	    $(".body-right .btn").hide();
	    $("#share").hide();
	    $(".summary").hide();
	    amplify.request({
	    	resourceId: 'summaryStatus',
	        data: {
	            "id": query,
	        },
	        success: function(data){
	        	switch(data)
	        	{
	        		case 0://新建
	        			$(".draft").show();
	        			getActivityDetail(query);
	        			break;
	        		case 1://草稿
	        			$(".draft").show();
	        			getActivityDetail(query);
	        			getSummaryDetail(query);
	        			break;
	        		case 2://发布
	        			$(".publish").show();
	        			$("input[name='shareLink']").val(window.location.href);
	        			getActivityDetail(query);
	        			getSummaryDetail(query);
	        			break;
	        		default:
	        			break;
	        	}
	        }
	    });
	}
	function getActivityDetail(id)
	{
		amplify.request({
	        resourceId: 'activityDetail',
	        data: {
	            "id": id,
	        },
	        success: function(activity_data){
	        	$('#organizationName').text(activity_data.OrganizationName);
	        	$('#organizationAvatar').attr('src',activity_data.OrganizationAvatar);
	        	$(".organization-link").attr("href", "/views/visitor.html?id=" + activity_data.OrganizationId);
	        	$("#activityName").text(activity_data.Name);
	        	$("#activityName").parent().attr("href","/views/activity.html?id="+activity_data.Id);
	        	$('#openSignInTime').text(time_change(activity_data.OpenSignInTime));
	            $('#closeSignInTime').text(time_change(activity_data.CloseSignInTime));
	            $('#startTime').text(time_change(activity_data.StartTime));
	            $('#finishTime').text(time_change(activity_data.FinishTime));
	            $('#location').text(activity_data.Location);
            	$('#point').text(activity_data.Point);
            	$('#rating').text(activity_data.Rating.toFixed(1));
            	$('#ratedNumber').text(activity_data.ratedNumber);
            	$('#viewedTime').text(activity_data.VolunteerViewedTime);
            	$('#favoritedTime').text(activity_data.VolunteerFavoritedTime);
            	$('#hasSignedInVolunteerNumber').text(activity_data.HasSignedInVolunteerNumber);
            	if(activity_data.hasFavorited)
            	{
            		$("#favoritedTime").siblings("img.ico").attr("src","image/favorite_pink.png");
            	}
            	else
            	{
            		$("#favoritedTime").siblings("img.ico").attr("src","image/favorite_gray.png");
            	}
            	if(activity_data.hasViewed)
            	{
            		$("#viewedTime").siblings("img.ico").attr("src","image/view_pink.png");
            	}
            	else
            	{
            		$("#viewedTime").siblings("img.ico").attr("src","image/view_gray.png");
            	}
            	if(activity_data.hasSignined)
            	{
            		$("#hasSignedInVolunteerNumber").siblings("img.ico").attr("src","image/signin_pink.png");
            	}
            	else
            	{
            		$("#hasSignedInVolunteerNumber").siblings("img.ico").attr("src","image/signin_gray.png");
            	}
            	switch($.cookie("role"))
            	{
            		case "Volunteer":
	            		$("#homePage").attr("href","/views/volunteer.html");
	                    $("#homePage").attr("title","跳转到志愿者页面");
	                    getParticipateRecords(activity_data);
	                    break;
            		case "Organizer":
	            		$("#homePage").attr("href","/views/organizer.html");
	                    $("#homePage").attr("title","跳转到组织者页面");
	                    getParticipateRecords(activity_data);
	                    break;
            		case "Organization":
	            		$("#homePage").attr("href","/views/organization.html");
	                    $("#homePage").attr("title","跳转到组织机构页面");
            			getParticipateRecords(activity_data);
            		    break;
	                default:
	                	$("#homePage").attr("href","/views/signin.html");
	                    $("#homePage").attr("title","跳转VolQ首页");
	                	$("button.makeComment").text("注册后参与评论").off().on("click",function(){
	                        registerAndBack(this);
	                    });
	                  	break;
            	}
	        },
	        error: function(){
	            
	        },
	    });
	}
	function getSummaryDetail(id)
	{
		amplify.request({
	        resourceId: 'summaryDetail',
	        data: {
	            "id": id,
	        },
	        success: function(data){
	        	$("#mainId").text(data.Id);
	        	$('#organizerName').text(data.OrganizerName);
	        	$('#organizerAvatar').attr('src',data.OrganizerAvatar);
	        	//$(".organizer-link").attr("href", "/views/visitor.html?id=" + data.OrganizerId);
	        	getCommentHistory(data.Id,1);
	        	if(data.IsActivated)
	        	{
	        		$("#summaryTitle").text(data.Title);
	        		$("#summaryContent").summernote().code(data.Content).destroy();
	        	}
	        	else
	        	{
	        		$("input[name='summaryTitle']").val(data.Title);
	        		$("#content").code(data.Content);
	        	}
	            switch($.cookie("role"))
	            {
	                case "Volunteer":
	                    
	                    break;
	                case "Organizer":
	                    
	                    break;
	                case "Organization":
	                    
	                    break;
	                default:
	                    break;
	            }
	        },
	        error: function(data){
	            
	        },
	    });
	}
	$("#saveDraft").off().on('click',function() {
		amplify.request({
	        resourceId: 'makeSummary',
	        data: {
	            activityId: query,
	            title:$("input[name='summaryTitle']").val(),
	            content:$('#content').code()
	        },
	        success: function(data){
	            document.location.reload();
	        },
	        error: function(){
	            
	        },
	    });
	});
	$("#publishSummary").off().on('click',function() {
		amplify.request({
	        resourceId: 'makeSummary',
	        data: {
	            activityId:query,
	            title:$("input[name='summaryTitle']").val(),
	            content:$('#content').code()
	        },
	        success: function(data){
	            amplify.request({
			        resourceId: 'activateSummary',
			        data: {
			            activityId: query
			        },
			        success: function(data){
			            
			        },
			        error: function(){
			            
			        },
			    });
			    document.location.reload();
	        },
	        error: function(){
	            
	        },
	    });
	});
})();
var pageSize=5;
amplify.request.define("statistics", "ajax", {
	url: "/api/volunteer/statistics",
	data: {id: $.cookie("userid")},
	type: "get"
});
amplify.request.define("profile", "ajax", {
	url: "/api/user/information",
	data: {id: $.cookie("userid")},
	type: "get"
});
amplify.request.define("mymessages", "ajax", {
    url: "/api/user/mymessages",
    type: "get"
});
amplify.request.define("unfavorite", "ajax", {
    url: "/api/volunteer/unfavorite",
    type: "post",
});
amplify.request.define("favorite", "ajax", {
    url: "/api/volunteer/favorite",
    type: "post",
}); 
amplify.request.define("activity_detail","ajax", {
    url: "/api/activity",
    type: "GET",
    dataType: "json",
    data: {id: "{id}"}
});
amplify.request.define("volunteerstatistics", "ajax", {
    url: "/api/volunteer/statistics",
    data: {id: null},
    type: "get"
});
amplify.request.define("signin_activity","ajax", {
    url: "/api/volunteer/SignInactivity",
    type: "POST",
});
amplify.request.define("signout_activity","ajax", {
    url: "/api/volunteer/SignOutactivity",
    type: "POST",
});
amplify.request.define("active_activity", "ajax", {
    url: "/api/activity/active",
    type: "POST",
});
amplify.request.define("isFavorited", "ajax", {
    url: "/api/activity/isfavorited",
    type: "get",
});
amplify.request.define("isSignedin", "ajax", {
    url: "/api/activity/isSignedin",
    type: "get",
});
amplify.request.define("activityQRCode", "ajax", {
    url: "/api/activity/qrcode",
    data: {id:null},
    type: "post",
    dataType: "json"
});
amplify.request.define("rate", "ajax", {
    url: "/api/activity/rate",
    data: {activityId:null,rate:0.0},
    type: "post"
});
amplify.request.define("commentHistory", "ajax", {
    url: "/api/activity/comment",
    data: {id:null,type:"activity",sortbykey:"Position",isascending:false,pageindex:1,pagesize:pageSize},
    type: "get",
    dataType: "json"
});
amplify.request.define("commentCount", "ajax", {
    url: "/api/activity/commentcount",
    data: {id:null},
    type: "get",
    dataType: "json"
});
amplify.request.define("makeComment", "ajax", {
    url: "/api/activity/comment",
    data: {id:null,isCommentOnComment:false,fatherCommentId:null,content:""},
    type: "post"
});
amplify.request.define("getRate", "ajax", {
    url: "/api/activity/rate",
    data: {id:null},
    type: "get",
    dataType: "json"
});
amplify.request.define("summaryStatus", "ajax", {
    url: "/api/activity/summarystatus",
    data: {id:null},
    type: "get",
    dataType: "json"
});
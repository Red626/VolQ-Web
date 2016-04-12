var pageSize=5;
amplify.request.define("volstatistics", "ajax", {
	url: "/api/volunteer/statistics",
	data: {id: $.cookie("userid")},
	type: "get"
});
amplify.request.define("statistics", "ajax", {
    url: "/api/organization/statistics",
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
amplify.request.define("mine", "ajax", {
    url: "/api/activity/mine",
    data: {id: getquery(), stage:0, sortByKey: "StartTime", isAscending: false, pageSize: pageSize, pageIndex: 1,filtersource: null},
    type: "GET",
    dataType: "json"
});
amplify.request.define("ismyfriend", "ajax", {
	url: "/api/volunteer/ismyfriend",
	type: "GET",
	data: {"id": null},
});
amplify.request.define("hasappliedtome", "ajax", {
	url: "/api/volunteer/hasappliedtome",
	type: "GET",
	data: {"id": null},
});
amplify.request.define("make_friend", "ajax", {
    url: "/api/volunteer/applyfriend",
    type: "POST",
    data: {id: null, comment: null}
});
amplify.request.define("accept_friend", "ajax", {
    url: "/api/volunteer/acceptfriend",
    type: "POST",
    data: {id: null, comment: null}
});
amplify.request.define("refuse_friend", "ajax", {
    url: "/api/volunteer/refusefriend",
    type: "POST",
    data: {id: null, comment: null}
});
amplify.request.define("breakoff", "ajax", {
    url: "/api/volunteer/breakofffriendship",
    type: "POST",
    data: {id: null}
});
amplify.request.define("activity_detail","ajax", {
    url: "/api/activity/",
    type: "GET",
    dataType: "json",
    data: {id: "{id}"}
});
amplify.request.define("volunteerstatistics", "ajax", {
    url: "/api/volunteer/statistics",
    data: {id: null},
    type: "get"
});
amplify.request.define("activityQRCode", "ajax", {
    url: "/api/activity/qrcode",
    data: {id:null},
    type: "post",
    dataType: "json"
});
amplify.request.define("myfeeds", "ajax", {
    url: "/api/user/myfeeds",
    data: {id: null, sortByKey: "Time", isAscending: false, pageIndex: 1, pageSize: 10},
    type: "GET",
    dataType: "JSON"
});
amplify.request.define("readfeed", "ajax", {
    url: "/api/user/readfeed",
    type: "POST",
    data: {feedId:null}
});
amplify.request.define("myachievementscount", "ajax", {
    url: "/api/badge/userbadgecount",
    data: {id: null},
    type: "GET",
    dataType: "text"
});
amplify.request.define("myachievements", "ajax", {
    url: "/api/badge/userbadges",
    data: {id: null, sortByKey: "GrantedTime", isAscending: false, pageIndex: 1, pageSize: 20},
    type: "GET",
    dataType: "JSON"
});
amplify.request.define("achievementdetail", "ajax", {
    url: "/api/badge/userbadgedetail",
    data: {id: $.cookie("userid"), badgename: null},
    type: "GET",
    dataType: "JSON"
});
amplify.request.define("isFavorited", "ajax", {
    url: "/api/activity/isfavorited",
    type: "get",
});
amplify.request.define("favorite", "ajax", {
    url: "/api/volunteer/favorite",
    type: "post",
});
amplify.request.define("unfavorite", "ajax", {
    url: "/api/volunteer/unfavorite",
    type: "post",
});
amplify.request.define("signin_activity","ajax", {
    url: "/api/volunteer/SignInactivity",
    type: "POST",
});
amplify.request.define("signout_activity","ajax", {
    url: "/api/volunteer/SignOutactivity",
    type: "POST",
});
amplify.request.define("rate", "ajax", {
    url: "/api/activity/rate",
    data: {activityId:null,rate:0.0},
    type: "post"
});
amplify.request.define("commentHistory", "ajax", {
    url: "/api/activity/comment",
    data: {id:null,type:"activity",sortbykey:"Position",isascending:false,pageindex:0,pagesize:pageSize},
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
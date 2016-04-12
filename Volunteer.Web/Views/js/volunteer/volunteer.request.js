var pageSize=5;

amplify.request.define("suggestion", "ajax", {
	url: "/api/content/suggestion",
	type: "post"
});
amplify.request.define("mostViewed","ajax", {
	url: "/api/activity",
	type: "GET",
	data: {stage:0, sortByKey: "VolunteerViewedTime" ,isAscending: false,pageSize: pageSize, pageIndex: 1, filtersource: null},
	dataType: "json",
});

amplify.request.define('point', "ajax", {
	url: "/api/volunteer/point",
	type: "GET",
});

amplify.request.define('activity', "ajax", {
	url: "/api/activity/",
	type: "GET",
	data: {stage:0, sortByKey: null ,isAscending: false,pageSize: pageSize, pageIndex: 1, filtersource: null},
	dataType: "json",
});
amplify.request.define("mine", "ajax", {
	url: "/api/activity/mine",
	data: {id:$.cookie("userid"), stage:0, sortByKey: "StartTime", isAscending: false, pageSize: pageSize, pageIndex: 1,filtersource: null},
	type: "GET",
	dataType: "json"
});
amplify.request.define("collection", "ajax", {
	url: "/api/volunteer/favorite",
	data: {stage:0, sortByKey: "StartTime", isAscending: false, pageSize: pageSize, pageIndex: 1,filtersource: null},
	type: "GET",
	dataType: "JSON"
}); 
amplify.request.define("history", "ajax", {
	url: "/api/volunteer/viewedactivities",
	data: {stage:0, sortByKey: "StartTime", isAscending: false, pageSize: pageSize, pageIndex: 1,filtersource: null},
	type: "GET",
	dataType: "JSON"
});
amplify.request.define("clearhistory", "ajax", {
	url: "/api/volunteer/clearviewedactivityhistory",
	type: "post"
});
amplify.request.define("statistics", "ajax", {
	url: "/api/volunteer/statistics",
	data: {id: $.cookie("userid")},
	type: "get"
});
amplify.request.define("profile", "ajax", {
	url: "/api/user/information",
	data: {id: $.cookie("userid")},
	type: "get",
	async: false
});
amplify.request.define("reviseautograph", "ajax", {
	url: "/api/user/description",
	type: "put",
	data: {description: ""},
});
amplify.request.define("reviseemail", "ajax", {
	url: "/api/user/email",
	type: "put",
	data: {email: null}
});
amplify.request.define("revisephonenumber", "ajax", {
	url: "/api/user/phonenumber",
	type: "put",
	data: {phoneNumber: null}
});
amplify.request.define("revisePassword", "ajax", {
	url: "/api/user/revisepassword",
	type: "put",
	data: {OldPassword: "", NewPassword: ""},
});
amplify.request.define("reviselocation", "ajax", {
	url: "/api/volunteer/location",
	type: "put",
	data: {location: "" ,coordinate: ""}
});
amplify.request.define("reviseaffiliation", "ajax", {
	url: "/api/volunteer/affiliation",
	type: "put",
	data: {affiliations: "" }
});
amplify.request.define("mymessages", "ajax", {
	url: "/api/user/mymessages",
	type: "get"
});
amplify.request.define("firends_by_email", "ajax", {
	url: "/api/user",
	data: {email: ""},
	dataType: "JSON"
});
amplify.request.define("find_friends", "ajax", {
	url: "/api/volunteer/{resource}",
	dataType: "JSON"
});
amplify.request.define("make_friend", "ajax", {
	url: "/api/volunteer/applyfriend",
	type: "POST",
	data: {id: null, comment: ""}
});
amplify.request.define("accept_friend", "ajax", {
	url: "/api/volunteer/acceptfriend",
	type: "POST",
	data: {id: null, comment: ""}
});
amplify.request.define("refuse_friend", "ajax", {
	url: "/api/volunteer/refusefriend",
	type: "POST",
	data: {id: null, comment: ""}
});
amplify.request.define("breakoff", "ajax", {
	url: "/api/volunteer/breakofffriendship",
	type: "POST",
	data: {id: null}
});
amplify.request.define("recommend", "ajax", {
	url: "/api/volunteer/recommendfriend",
	data: {id: $.cookie("userid"), number: 6},
	dataType: "JSON"
});
amplify.request.define("myfriends", "ajax", {
	url: "/api/volunteer/myfriends",
	data: {id: $.cookie("userid")},
	dataType: "JSOn"
});
amplify.request.define("applymefriend", "ajax", {
	url: "/api/volunteer/applytomehistory",
	data: {id: $.cookie("userid"), sortByKey: "Time", isAscending: false, pageIndex: 1, pageSize: 10},
	dataType: "JSON"
});
amplify.request.define("myappliedfriend", "ajax", {
	url: "/api/volunteer/applyfrommehistory",
	data: {id: $.cookie("userid"), sortByKey: "ActionTime", isAscending: false, pageIndex: 1, pageSize: 10},
	dataType: "JSON"
});
amplify.request.define("myfeeds", "ajax", {
	url: "/api/user/myfeeds",
	data: {id: $.cookie("userid"), sortByKey: "Time", isAscending: false, pageIndex: 1, pageSize: pageSize},
	type: "GET",
	dataType: "JSON"
});
amplify.request.define("readfeed", "ajax", {
	url: "/api/user/readfeed",
	type: "POST",
	data: {feedId:null}
});
amplify.request.define("myachievements", "ajax", {
	url: "/api/badge/userbadges",
	data: {id: $.cookie("userid"), sortByKey: "GrantedTime", isAscending: false, pageIndex: 1, pageSize: 10},
	type: "GET",
	dataType: "JSON"
});
amplify.request.define("myachievementscount", "ajax", {
	url: "/api/badge/userbadgecount",
	data: {id: $.cookie("userid")},
	type: "GET",
	dataType: "text"
});
amplify.request.define("achievementdetail", "ajax", {
	url: "/api/badge/userbadgedetail",
	data: {id: $.cookie("userid"), badgename: null},
	type: "GET",
	dataType: "JSON"
});
amplify.request.define("hottags", "ajax", {
	url: "/api/activity/hottags",
	data: {number:10},
	type: "GET",
	dataType: "json"
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
amplify.request.define("isFavorited", "ajax", {
	url: "/api/activity/isfavorited",
	type: "get",
});
amplify.request.define("isSignedin", "ajax", {
	url: "/api/activity/isSignedin",
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
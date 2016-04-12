var pageSize=5;

amplify.request.define("suggestion", "ajax", {
	url: "/api/content/suggestion",
	type: "post"
});
amplify.request.define("mydraft", "ajax", {
	url: "/api/activity/minedraft",
	type: "GET",
	data: {"id":$.cookie("userid"), "filtersource":null,"sortByKey": null, "isAscending": false, "pageIndex": 1, "pageSize": 5},
	dataType: "json"
});
amplify.request.define("mine", "ajax", {
	url: "/api/activity/mine",
	data: {id:$.cookie("userid"), stage:0, sortByKey: "StartTime", isAscending: false, pageSize: pageSize, pageIndex: 1,filtersource: null},
	type: "GET",
	dataType: "json"
});
amplify.request.define("activity_detail","ajax", {
	url: "/api/activity/",
	type: "GET",
	dataType: "json",
	data: {id: "{id}"}
});
amplify.request.define("active_activity", "ajax", {
	url: "/api/activity/active",
	type: "POST",
});
amplify.request.define("volunteerstatistics", "ajax", {
	url: "/api/volunteer/statistics",
	data: {id: null},
	type: "get"
});
amplify.request.define("members", "ajax", {
	url: "/api/organization/members",
	type: "GET",
	data: {"sortByKey": null, "isAscending": false, "pageIndex": 1, "pageSize": pageSize},
	dataType: "JSON"
});
amplify.request.define("applied", "ajax", {
	url: "/api/organization/appliedhistory",
	type: "GET",
	data: {"sortByKey": null, "isAscending": false, "pageIndex": 1, "pageSize": pageSize},
	dataType: "JSON"
});
amplify.request.define("remove", "ajax", {
	url: "/api/organization/kickout",
	type: "POST",
	data: {"id": null},
});
amplify.request.define("accept", "ajax", {
	url: "/api/organization/accepttojoin",
	type: "POST",
	data: {"id": null},
});
amplify.request.define("refuse", "ajax", {
	url: "/api/organization/refusetojoin",
	type: "POST",
	data: {"id": null},
});
amplify.request.define("profile", "ajax", {
	url: "/api/user/information",
	data: {id: $.cookie("userid")},
	type: "get"
});
amplify.request.define("revisePassword", "ajax", {
	url: "/api/user/revisepassword",
	type: "put",
	data: {OldPassword: null, NewPassword: null},
});
amplify.request.define("reviseautograph", "ajax", {
	url: "/api/user/description",
	type: "put",
	data: {description: null}
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
amplify.request.define("mymessages", "ajax", {
	url: "/api/user/mymessages",
	type: "get"
});
amplify.request.define("statistics", "ajax", {
	url: "/api/organization/statistics",
	data: {id: $.cookie("userid")},
	type: "GET",
});
amplify.request.define("hottags", "ajax", {
	url: "/api/activity/hottags",
	data: {number:10},
	type: "GET",
	dataType: "json"
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
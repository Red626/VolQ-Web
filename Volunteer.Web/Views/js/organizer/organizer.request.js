var pageSize = 5;

amplify.request.define("suggestion", "ajax", {
	url: "/api/content/suggestion",
	type: "post"
});
amplify.request.define('remaining_point', "ajax", {
	url: "/api/organization/remainingpoint",
	type: "GET",
	data: {"id": null}
});

amplify.request.define('add_activity', "ajax", {
	url: '/api/activity/',
	type: "POST",
});

amplify.request.define("activity_detail","ajax", {
    url: "/api/activity",
    type: "GET",
    dataType: "json",
    data: {"id": null}
});

amplify.request.define("update_activity", "ajax", {
	url: "/api/activity/",
	type: "PUT",
});

amplify.request.define('applied_ogn', "ajax", {
	url: "/api/organizer/appliedhistory",
	type: "GET",
	dataType: "json",
});

amplify.request.define('ogn_to_join', "ajax", {
	url: '/api/organizer/to_join',
	type: "GET",
	dataType: "json",
});

amplify.request.define('ogn_be_in', "ajax", {
	url: '/api/organizer/be_in',
	type: "GET",
	dataType: "json",
});

amplify.request.define("quitogn", "ajax", {
	url: "/api/organizer/quit",
	type: "POST"
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

amplify.request.define("join", "ajax", {
	url: "/api/organizer/join",
	type: "POST",
	data: {"id": null, "comment": null}
});

amplify.request.define("signedInVols", "ajax", {
	url: "/api/activity/volunteerstocheckin",
	data: {"id": null, "sortByKey": null, "isAscending": false, "pageIndex": 0, "pageSize": 5},
	dataType: "json"
});
amplify.request.define("checkedIn", "ajax", {
	url: "/api/activity/volunteerstocheckout",
	data: {"id": null, "sortByKey": null, "isAscending": false, "pageIndex": 0, "pageSize": 5},
	dataType: "json"
});
amplify.request.define("completed", "ajax", {
	url: "/api/activity/completedvolunteers",
	data: {"id": null, "sortByKey": null, "isAscending": false, "pageIndex": 0, "pageSize": 5},
	dataType: "json"
});
amplify.request.define("failed", "ajax", {
	url: "/api/activity/notcompletedvolunteers",
	data: {"id": null, "sortByKey": null, "isAscending": false, "pageIndex": 0, "pageSize": 5},
	dataType: "json"
});
amplify.request.define("checkin", "ajax", {
	url: "/api/organizer/checkinactivity",
	type: "POST",
	data: {"activityId": null, "volunteerIds": null}
});
amplify.request.define("checkout", "ajax", {
	url: "/api/organizer/checkoutactivity",
	type: "POST",
	data: {"activityId": null, "volunteerIds": null, "isComplete": false }
});
amplify.request.define("kickout", "ajax", {
	url: "/api/organizer/kickout",
	type: "POST",
	data: {"activityId": null, "volunteerIds": null}
});
amplify.request.define("unkickout", "ajax", {
	url: "/api/organizer/unkickout",
	type: "POST",
	data: {"activityId": null, "volunteerIds": null}
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
amplify.request.define("volunteerstatistics", "ajax", {
	url: "/api/volunteer/statistics",
	data: {id: null},
	type: "get"
});
amplify.request.define("hottags", "ajax", {
	url: "/api/activity/hottags",
	data: {number: 3},
	dataType: "JSON"
});
amplify.request.define("allbadges", "ajax", {
	url: "/api/badge/allbadges",
	data: {sortbykey:'BadgeName', isascending:true, pageindex:0, pagesize:0},
	dataType: "JSON"
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
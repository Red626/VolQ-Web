const rank_pageSize = 10;

amplify.request.define("friendsRank", "ajax", {
	url: "/api/volunteer/myfriendsrank",
	data: {id:$.cookie("userid"), "sortByKey": "point", "isAscending": false, "pageIndex": 1, "pageSize": rank_pageSize},
	dataType: "json"
});
amplify.request.define("myRank", "ajax", {
	url: "/api/volunteer/myrank",
	data: {id:$.cookie("userid"), "sortByKey": "point", "isAscending": false}
});
amplify.request.define("myPosition", "ajax", {
	url: "/api/volunteer/mypointrank",
	data: {id:$.cookie("userid")},
	dataType: "json"
});
amplify.request.define("friendsCount", "ajax", {
	url: "/api/volunteer/myfriendcount",
	data: {id: $.cookie("userid")},
});
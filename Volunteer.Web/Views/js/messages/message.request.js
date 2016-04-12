const message_pageSize = 10;
amplify.request.define("mymessages", "ajax", {
	url: "/api/user/mymessages",
	data: {"sortByKey": null, "isAscending": false, "pageIndex": 1, "pageSize": message_pageSize},
	dataType: "json"
});

amplify.request.define("read", "ajax", {
	url: "/api/user/readmessage",
	type: "post",
	data: {"messageId": null}
});

amplify.request.define("delete", "ajax", {
	url: "/api/user/deletemessage?id={id}",
	type: "delete"
});
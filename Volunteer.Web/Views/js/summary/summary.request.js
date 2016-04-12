var pageSize=5;

amplify.request.define("activityDetail","ajax", {
    url: "/api/activity",
    data: {id: ""},
    type: "GET",
    dataType: "json"
});
amplify.request.define("volunteerstatistics", "ajax", {
    url: "/api/volunteer/statistics",
    data: {id: null},
    type: "get"
});
amplify.request.define("makeSummary", "ajax", {
    url: "/api/activity/summary",
    data: {activityId:null,title:"",content:""},
    type: "post"
});
amplify.request.define("summaryDetail", "ajax", {
    url: "/api/activity/summary",
    data: {id:null},
    type: "get",
    dataType: "json"
});
amplify.request.define("activateSummary", "ajax", {
    url: "/api/activity/activatesummary",
    data: {activityId:null},
    type: "post"
});
amplify.request.define("summaryStatus", "ajax", {
    url: "/api/activity/summarystatus",
    data: {id:null},
    type: "get",
    dataType: "json"
});
amplify.request.define("commentHistory", "ajax", {
    url: "/api/activity/comment",
    data: {id:null,type:"summary",sortbykey:"Position",isascending:false,pageindex:1,pagesize:pageSize},
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
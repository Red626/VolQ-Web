$(function () {
	var Rank = {
		rank_container: $(".rank-container"),
		loading: true,
		rank_template: $("#rank_tmpl").html(),
		getrank: function (cate, data, success_cb, error_cb) {
			data.sortByKey = cate;
			var resource = "friendsRank";
			if ($(".panel").data("mode") === "all") {

			}
			else if ($(".panel").data("mode") === "friends") {
				resource = "friendsRank";
			}
			amplify.request({
				resourceId: resource,
				data: data,
				success: success_cb,
				error: error_cb
			});
		},
		init: function () {
			this.show_rank("point", {"pageIndex": 1});
			activeOne($("#pointRank"), "active");
			amplify.request({
				resourceId: "myRank",
				data: {"sortByKey": "point"},
				success: function(data){
					$("#pointRank .myRank").text(data);
				}
			});
			amplify.request({
				resourceId: "myRank",
				data: {"sortByKey": "activityCount"},
				success: function(data){
					$("#activityRank .myRank").text(data);
				}
			});
			amplify.request({
				resourceId: "myRank",
				data: {"sortByKey": "badgeCount"},
				success: function(data){
					$("#badgeRank .myRank").text(data);
				}
			});
			amplify.request({
				resourceId: "myPosition",
				success: function(data){
					$("#volunteerNumber").text(data.volunteerNumber);
					$("#myPosition").text(data.myPosition);
				}
			});
			amplify.request({
				resourceId: "friendsCount",
				success: function (data) {
					$(".friendsCount").text(parseInt(data)+1);
				}
			});
			this.rank_container.removeData("pageMax");
			this.bindEvents();
		},
		show_rank: function (cate, data, add) {
			var tmpl = this.rank_template;
			var self = this;

			self.rank_container.data("pageIndex", data.pageIndex);

			this.getrank(cate, data, function (datas) {
				if (datas.length === 0) {
					self.rank_container.data("pageMax", self.rank_container.data('pageIndex'));
				}
				for (var i =0; i < datas.length; i++) {
					datas[i].index = i+1;
					if(datas[i].id===$.cookie("userid"))
					{
						datas[i].side="side0";
					}
					datas[i].link="/views/visitor.html?id="+datas[i].id;
				}
				var unread_count = 0;
				var rank_box = $("#rank");
				var rendered = Mustache.render(tmpl, {"ranks": datas});
				if (add) {
					rank_box.append(rendered).fadeIn("slow");
				} else {
					rank_box.html(rendered).fadeIn("slow");
				}
				self.loading = false;
			}, function () {

			});
		},
		bindEvents: function () {
			var self = this;

			$("#pointRank").bind("click", function () {
				activeOne($(this), "active");
				$("#pointRank .ico").attr("src","image/score_pink.png");
				$("#activityRank .ico").attr("src","image/mine_gray.png");
				$("#badgeRank .ico").attr("src","image/badge_gray.png");
				self.show_rank("point", {"pageIndex": 1});
			});
			$("#activityRank").bind("click", function () {
				activeOne($(this), "active");
				$("#pointRank .ico").attr("src","image/score_gray.png");
				$("#activityRank .ico").attr("src","image/mine_pink.png");
				$("#badgeRank .ico").attr("src","image/badge_gray.png");
				self.show_rank("activityCount", {"pageIndex": 1});
			});
			$("#badgeRank").bind("click", function () {
				activeOne($(this), "active");
				$("#pointRank .ico").attr("src","image/score_gray.png");
				$("#activityRank .ico").attr("src","image/mine_gray.png");
				$("#badgeRank .ico").attr("src","image/badge_pink.png");
				self.show_rank("badgeCount", {"pageIndex": 1});
			});
			$(window).unbind("scroll").scroll(function () {
				var a = document.documentElement.scrollTop==0? document.body.clientHeight : document.documentElement.clientHeight;
				var b = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
				var c = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
				if (b > 100 ) {
					$(".go-top").show();
				}
				else {
					$(".go-top").hide();
				}
				if ( a + b === c && self.loading === false) {
					var index = self.rank_container.data("pageIndex");
					var max = self.rank_container.data("pageMax");
					if (typeof max === "undefined" || index < max) {
						self.loading = true;
						self.show_rank("point", {"pageIndex": index + 1}, true);
					}
				}
			});
			$(".go-top").bind("click", function (event) {
				$("html, body").animate({scrollTop: 0}, 100);
			});
		}
	};

	$("#main-body").off("rank.init").on("rank.init", function () {
		Rank.init();
	});
});

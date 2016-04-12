$(function () {
	var main_html=$('#main-body').html();

	var app=Sammy(function() {
		this.cache = {};
		this.element_selector = "#main-body";

		this.before({
				path: ["#/activities", "#/mine", "#/collection", "#/history", "#/friends"]
			}, function () {
			this.swap("");
			slide(this.$element());
		});
		this.before({except: /\#\/activity\/.*/}, function () {
			$("#myModal").modal("hide");
		});

		this.get('#/', function() {
			$("#main-body").html(main_html);
			slide($("#main-body"));
			showOne($("#index-item"));
			$("#currentPath").text("我的主页");
			activeOne($("a[href='#/']"), "active");
			activeList($("a[href='#/index']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			$.get("templates/feeds.html", function (data) {
				$("#main-body").html(data);
			});
		});
		this.get('#/index', function() {
			this.redirect('#/');
		});
		this.get('#/hotactivity', function() {
			showOne($("#index-item"));
			$("#currentPath").text("我的主页");
			activeOne($("a[href='#/']"), "active");
			activeList($("a[href='#/hotactivity']"), "ul", "active");
			$("#modalContent").load("templates/activity_detail.html");
			$('#main-body').load('templates/activity_related.html', function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"mostViewed", 
						{
							search: true,
							sort: false
						}, null, hot_activity_item_Click]);
				}, 10);
				$("#related_content").data("source", "activity");
			});
		});

		this.get('#/me', function() {
			this.redirect('#/achievement');
		});

		this.get('#/service', function() {
			showOne($("#service-item"));
			$("#currentPath").text("联系我们");
			activeOne($("a[href='#/service']"), "active");
			$('#main-body').load('templates/email.html');
		});

		this.get("#/achievement", function (context) {
			showOne($("#me-item"));
			$("#currentPath").text("我的资料");
			activeOne($("a[href='#/me']"), "active");
			activeList($("a[href='#/achievement']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			$.get("templates/achievements.html", function (data) {
				$("#main-body").html(data);
			});
		});

		this.get("#/stastic", function (context) {
			if ($("#main-body").length == 0) {
	        	$("#main-body").html(main_html);
	        }
			showOne($("#me-item"));
			$("#currentPath").text("我的资料");
			activeOne($("a[href='#/me']"), "active");
			activeList($("a[href='#/stastic']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			var cache = context.app.cache;
			if (cache.stastic) {
				$("#main-body").html(cache.stastic);
			} else {
				$.get("templates/volunteer_stastic.html", function (data) {
					cache.stastic = data;
					$("#main-body").html(cache.stastic);
				});
			}
		});

		this.get('#/rank', function(context) {
			if ($("#main-body").length == 0) {
	        	$("#main-body").html(main_html);
	        }
	        showOne($("#me-item"));
			$("#currentPath").text("我的资料");
			activeOne($("a[href='#/me']"), "active");
			activeList($("a[href='#/rank']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			var cache = context.app.cache;
			if (cache.rank) {
				$("#main-body").html(cache.rank);
			} else {
				$.get("templates/volunteer_rank.html", function (data) {
					cache.rank = data;
					$("#main-body").html(cache.rank);
				});
			}
		});

		this.get('#/profile', function(context) {
	        if ($("#main-body").length == 0) {
	        	$("#main-body").html(main_html);
	        }
	        showOne($("#me-item"));
			$("#currentPath").text("我的资料");
			activeOne($("a[href='#/me']"), "active");
	        activeList($("a[href='#/profile']"), "ul", "active");
	    	showSelectedContent($("#main-body"), $("#main-body"), slide);
	    	var cache = context.app.cache;
			if (cache.profile) {
				$("#main-body").html(cache.profile);
			} else {
				$.get("templates/profile.html", function (data) {
					cache.profile = data;
					$("#main-body").html(cache.profile);
				});
			}
		});

		this.get('#/messages', function(context) {
			$("#main-body").html(main_html);
			showOne($("#me-item"));
			$("#currentPath").text("我的资料");
			activeList($("a[href='#/messages']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			var cache = context.app.cache;
			if (cache.message) {
				$("#main-body").html(cache.message);
			} else {
				$.get("templates/message.html", function (data) {
					cache.message = data;
					$("#main-body").html(cache.message);
				});
			}
		});

		this.get('#/activities', function () {
		    $("#finished").text("已结束");
			showOne($("#activities-item"));
			$("#currentPath").text("浏览活动");
			activeOne($("a[href='#/activities']"), "active");
			activeOne($("#abouttostart"),"active");
			$("#modalContent").load("templates/activity_detail.html");
			$('#main-body').load('templates/activity_related.html', function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"activity", 
						{
							search: true,
							sort: true
						}, null, hot_activity_item_Click]);
				}, 10);
				$("#related_content").data("source", "activity");
			});
		});
		this.get('#/mine', function () {
		    $("#finished").text("我已完成");
		    showOne($("#activities-item"));
			$("#currentPath").text("我的活动");
			activeOne($("a[href='#/mine']"), "active");
			activeOne($("#aboutostart"),"active");
			$("#modalContent").load("templates/activity_detail.html");
			$("#main-body").load("templates/activity_related.html", function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"mine", {
							search: false,
							sort: true
						}, null, hot_activity_item_Click]);
				}, 10);
				$("#related_content").data("source", "mine");
			});
		});
		this.get('#/collection', function () {
		    $("#finished").text("已结束");
			showOne($("#activities-item"));
			$("#currentPath").text("我的收藏");
			activeOne($("a[href='#/collection']"), "active");
			activeOne($("#abouttostart"),"active");
			$("#modalContent").load("templates/activity_detail.html");
			$("#main-body").load("templates/activity_related.html", function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"collection", {
							search: false,
							sort: true
						}, null, hot_activity_item_Click]);
				}, 10);
				$("#related_content").data("source", "collection");
			});
		});
		this.get('#/history', function () {
		    $("#finished").text("已结束");
			showOne($("#activities-item"));
			$("#currentPath").text("浏览历史");
			activeOne($("a[href='#/history']"), "active");
			activeOne($("#abouttostart"),"active");
			$("#modalContent").load("templates/activity_detail.html");
			$("#main-body").load("templates/activity_related.html", function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"history", {
							search: false,
							sort: true
						}, null, hot_activity_item_Click]);
				}, 10);
				$("#related_content").data("source", "history");
			});
		});

		this.get("#/friends", function () {
			showOne($("#friends-item"));
			$("#currentPath").text("我的好友");
			activeOne($("a[href='#/friends']"), "active");
			activeOne($("#myfriends"),"active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			$.ajax({
				url: "templates/firends.html", 
				cache: true,
				success: function (data) {
					$("#main-body").html(data);
				}
			});
		});
	});

	(function () {
		var query = getquery();
		if (typeof query !== "undefined") {
			app.run('#/');
		} else {

		}
	})();

	function hot_activity_item_Click() {
		$(".hot_activity_item").attr("data-toggle","modal")
		$(".hot_activity_item").attr("data-target","#myModal")
		$(".hot_activity_item").on("click", function(){
		    initActivity($.cookie("role"),$(this).attr("id"),true,true);
		});
	}
});


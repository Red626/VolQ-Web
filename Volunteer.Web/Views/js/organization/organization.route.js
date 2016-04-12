$(function () {
	var main_html=$('#main-body').html();

	var app=Sammy(function() {
		this.cache = {};
		this.element_selector = "#main-body";
		
		this.before({path: 
				["#/", "#/profile", "#/messages", "#/activities", "#/members"]
			}, function () {
			this.swap("");
			slide(this.$element());
		});
		
		this.get('#/', function() {
			$("#main-body").html(main_html);
			slide($("#main-body"));
			showOne($("#me-item"));
			$("#currentPath").text("我的主页");
			activeOne($("a[href='#/']"), "active");
			activeList($("a[href='#/']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			$.get("templates/organization_stastic.html", function (data) {
				$("#main-body").html(data);
			});
		});
		this.get('#/me', function() {
			this.redirect('#/');
		});

		this.get('#/service', function() {
			showOne($("#service-item"));
			$("#currentPath").text("联系我们");
			activeOne($("a[href='#/service']"), "active");
			$('#main-body').load('templates/email.html');
		});
		
		this.get('#/profile', function(context) {
			if ($("#main-body").length == 0) {
	        	$("#main-body").html(main_html);
	        }
	        showOne($("#me-item"));
			$("#currentPath").text("我的主页");
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

		this.get("#/messages", function (context) {
			$("#main-body").html(main_html);
			showOne($("#me-item"));
			$("#currentPath").text("我的主页");
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

		this.get('#/activities', function() {
			showOne($("#activities-item"));
			$("#currentPath").text("我的活动");
			activeOne($("a[href='#/activities']"), "active");
			$("#modalContent").load("templates/activity_detail.html");
			$('#main-body').load('templates/activity_related.html', function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"mine", 
						{
							search: true,
							sort: true
						}, null, hot_activity_item_Click]);
				},10);
			});
			$("#related_content").data("source", "mine");
		});
		
		this.get('#/members', function(context) {
			if ($("#main-body").length == 0) {
	        	$("#main-body").html(main_html);
	        }
	        showOne($("#members-item"));
			$("#currentPath").text("我的成员");
			activeOne($("a[href='#/members']"), "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			var cache = context.app.cache;
			if (cache.members) {
				$("#main-body").html(cache.members);
			} else {
				$.get("templates/organization_members.html", function (data) {
					cache.members = data;
					$("#main-body").html(cache.members);
				});
			}
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



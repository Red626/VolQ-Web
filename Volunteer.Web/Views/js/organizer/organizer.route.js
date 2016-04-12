$( function () {
	var main_html=$('#main-body').html();

	var app=Sammy(function() {
		this.cache = {};
		this.element_selector = $("#main-body");

		this.before({path: ["#/activity"]}, function (context) {
			var active_li = $("#main-nav a[href='"+ window.location.hash +"']").parent();
			this.active(active_li.parent(), active_li, "active");
		});
		this.before({path: 
				["#/", "#/myogns", "#/profile", "#/messages", "#/addactivity", "#/myactivities"]
			}, function () {
			this.swap("");
			slide(this.$element());
		});
		this.before({except: /\#\/activity\/.*/}, function () {
			$("#myModal").modal("hide");
		});

		this.get('#/', function(context) {
			if ($("#main-body").length == 0) {
	        	$("#main-body").html(main_html);
	        }
	        showOne($("#myorgs-item"));
			$("#currentPath").text("我的组织");
			activeOne($("a[href='#/myogns']"), "active");
			activeList($("a[href='#/myogns']"), "ul", "active");
	    	showSelectedContent($("#main-body"), $("#main-body"), slide);
	    	var cache = context.app.cache;
			if (cache.myogns) {
				$("#main-body").html(cache.myogns);
			} else {
				$.get("templates/organizer_myorgs.html", function (data) {
					cache.myogns = data;
					$("#main-body").html(cache.myogns);
				});
			}
		});
		this.get("#/myogns", function() {
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
			activeOne($("a[href='#/profile']"), "active");
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

		this.get("#/messages", function(context) {
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

		this.before({path: ["#/addactivity", "#/draft"]}, function () {
			$("a.active").removeClass("active");
		});
		this.get('#/addactivity', function() {
			showOne($("#operation-item"));
			$("#currentPath").text("创建活动");
			activeOne($("a[href='#/addactivity']"), "active");
			activeList($("a[href='#/addactivity']"), "ul", "active");
			showSelectedContent($("#main-body"), $("#main-body"), slide);
			$("#main-body").load("templates/activity_new.html", function() {
				initialise();
			});
		});

		this.get('#/draft', function() {
			showOne($("#operation-item"));
			$("#currentPath").text("创建活动");
			activeOne($("a[href='#/addactivity']"), "active");
			activeList($("a[href='#/draft']"), "ul", "active");
			$("#modalContent").load("templates/activity_detail.html");
			$('#main-body').load('templates/activity_related.html', function() {
				setTimeout(function () {
					$("#main-body").trigger("load.init", [
						"mydraft", 
						{
							search: true,
							sort: true
						}, null, hot_activity_item_Click]);
				},10);
			});
		});

		this.get('#/myactivities', function() {
			showOne($("#activities-item"));
			$("#currentPath").text("我的活动");
			activeOne($("a[href='#/myactivities']"), "active");
			activeOne($("#abouttostart"),"active");
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
		});

		this.get('#/manage', function() {
			showOne($("#manage-item"));
			$(".list .dropdown").hide();
			$("#currentPath").text("我的活动");
			$('#main-body').load('templates/activity_manage.html');
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


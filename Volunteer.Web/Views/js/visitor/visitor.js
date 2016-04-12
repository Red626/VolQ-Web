(function () {
	validate(false,true);
	//initializeLocationMap();
	//locationAddress = new BMap.Point(105,32);
    //locationmap.centerAndZoom(locationAddress,4);
	var query = getquery();
	setTimeout(function() {$(".site-menu").stickUp();}, 1000);
	var role = null;
    function showProfile (next) {
		var mapsrc = "http://api.map.baidu.com/staticimage?width=400&height=400&center=105,32&zoom=4&copyright=1";
		var markers = "&markers=";
		var markerStyles = "&markerStyles=";
		if (query) {
			amplify.request({
				resourceId: "profile", 
				data: {"id": query}, 
				success: function (data) {
					role = data.role;
	                switch(data.role)
	                {
	                    case 0://Volunteer
	                    	if($.cookie("userid") && query != $.cookie("userid"))
	                    	{
	                    		makeFriends();
	                    	}
	                    	$("#volunteer").show();
	                    	$("#volunteer-item").show();
	                        $(".name").text(data.name);
	                        $(".email").text(data.email);
	                        $(".roleName").text(translate_role(data.role));
	                        $(".affiliation").text(data.affiliation);
	                        $('.avatar').attr('src',data.avatar);
	                        $('.avatar').parent().attr('href',data.avatar);
	                        $('.description').text(data.description);
	                        if(data.coordinate != null)
	                        {
	                        	markers = markers+translate_coordinate(data.coordinate).lng+","+translate_coordinate(data.coordinate).lat
	                            markerStyles = markerStyles+"m,,green";
	                        };
	                        
	                        mapsrc=mapsrc+markers+markerStyles;
	                        $("#locationmap").attr("src",mapsrc);
	                        var $container = $('#volunteer');
							$container.masonry({
								itemSelector : '.box',
								columnWidth : 280,
								isAnimated: true,
								animationOptions: {
								    duration: 300,
								    easing: 'linear',
								    queue: false
								}
							});
							$container.imagesLoaded( function() {
								$container.masonry('reload');
							});
	                        break;
	                    case 2://Organization
	                        $("#organization").show();
	                        $("#organization-item").show();
	                        $(".name").text(data.name);
	                        $(".email").text(data.email);
	                        $(".roleName").text(translate_role(data.role));
	                        $('.avatar').attr('src',data.avatar);
	                        $('.avatar').parent().attr('href',data.avatar);
	                        $('.description').text(data.description);
	                        break;
	                    default:
	                        break;
	                }
	                next();
				},
				error: function(){
				},
			});
			$("#modalContent").load("templates/activity_detail.html");
		}
	}
	function makeFriends(){
		$("#add_firend_info").data("id", query);
		amplify.request({
			resourceId: "hasappliedtome", 
			data: {"id": query}, 
			success: function (data) {
                switch(data)
                {
                    case "0"://未申请
                    	amplify.request({
							resourceId: "ismyfriend", 
							data: {"id": query}, 
							success: function (data) {
				                switch(data)
				                {
				                    case "0"://不是好友
				                    	$("#appllyFriend").show();
				                        break;
				                    case "1"://是好友
				                        $("#breakFriend").show();
				                        break;
				                    default:
				                        break;
				                }
							},
							error: function(){
							},
						});
                        break;
                    case "1"://已申请
                        $("#acceptFriend").show();
                        $("#refuseFriend").show();
                        break;
                    default:
                        break;
                }
			},
			error: function(){
			},
		});
	};

    function getVolunteerData(){
        amplify.request({
			resourceId: "volstatistics",
			data: {"id": query}, 
			success: function(data){
				$(".levelName").text(data.levelName);
				$(".levelPicture").attr("src",data.levelPicture);
				$(".level").text(data.level);
				$(".point").text(data.point);
				$(".pointsToNextLevel").text(data.pointsToNextLevel);
				$(".signedInActivityNumber").text(data.signedInActivityNumber);
				$(".completeRate").text(100*data.completeRate.toFixed(4)+"%");
				drawCanvas('myProperty',data.compassion,data.sacrifice,data.strength,data.endurance,data.intelligence,true);
			},
			error: function(){
			},
		});
    }
	var callbacks = $.Callbacks();
	$("#appllyFriend").removeAttr("disabled");
	$("#appllyFriend").bind("click", function () {
		$("#add_firend_info").data("id", query);
		callbacks.empty();
		callbacks.add(function (id, comment) {
			amplify.request({
				resourceId: "make_friend",
				data: {"id": id, "comment": comment},
				success: function () {
					alert("申请好友成功！");
				}
			});
		});
		$("#add_firend_info").modal("show");
	});
	$("#add_firend_info #sure").bind("click", function () {
		var id = query;
		var comment = $("#add_firend_info input[name='comment']").val();
		$("#add_firend_info").modal("hide");
		callbacks.fire(id, comment);
	});
	$("#add_firend_info").bind("show.bs.modal", function () {
		$(this).find("input").val("");
	});
	$("#breakFriend").bind("click", function () {
		callbacks.empty();
		callbacks.add(function (id ,comment) {
			amplify.request({
				resourceId: "breakoff",
				data: {"id": id, "comment": comment},
				success: function () {
					$("#appllyFriend").show();
	                $("#breakFriend").hide();
	                alert("解除好友成功！");
				}
			});
		});
		$("#add_firend_info").modal("show");
	});
	$("#acceptFriend").bind("click", function () {
		callbacks.empty();
		callbacks.add(function (id, comment) {
			amplify.request({
				resourceId: "accept_friend",
				data: {"id": id, "comment": comment},
				success: function () {
					$("#breakFriend").show();
	                $("#acceptFriend").hide();
	                $("#refuseFriend").hide();
	                alert("添加好友成功！");
				}
			});
		});
		$("#add_firend_info").modal("show");
	});
	$("#refuseFriend").bind("click", function () {
		callbacks.empty();
		callbacks.add(function (id, comment) {
			amplify.request({
				resourceId: "refuse_friend",
				data: {"id": id, "comment": comment},
				success: function () {
					$("#appllyFriend").show();
					$("#acceptFriend").hide();
	                $("#refuseFriend").hide();
	                alert("拒绝好友成功！");
				}
			});
		});
		$("#add_firend_info").modal("show");
	});
	$(".myhome").bind("click", function () {
		var home = "signin.html";
		switch ($.cookie("role")) {
			case "Volunteer":
				home = "volunteer.html";
				break;
			case "Organizer":
				home = "organizer.html";
				break;
			case "Organization":
				home = "organization.html";
				break;
			default:
				break;
		}
		location.assign(home);
	});

	function showFeeds(elem) {
		elem.load("templates/feeds.html");
	}
	function showActivity(elem) {
		get_activity({"id": getquery()});
	}
	function showOgnStatic(elem) {
		elem.load("templates/organization_stastic.html");
	}
	function hot_activity_item_Click() {
		$(".hot_activity_item").attr("data-toggle","modal")
		$(".hot_activity_item").attr("data-target","#myModal")
		$(".hot_activity_item").on("click", function(){
		    initActivity($.cookie("role"),$(this).attr("id"),true,true);
		});
	}
	function get_activity(data) {
		$("#hot_activity").empty();
		amplify.request({
			resourceId: "mine",
			data: data,
			success: function(data){
				if (data.length) {
					var tmpl= $("#activity_tmpl").html();
					$("#hot_activity").fadeIn(function () {
						for (var i = data.length - 1; i >= 0; i--) {
							if(data[i].Cover == null || data[i].Cover == "")
						    {
						        data[i].Cover = "/Static/Images/Activity/default.jpg";
						    }
						    data[i].StartTime = time_change(data[i].StartTime);
						    data[i].Status = translate_activity(data[i].Status);
						    if(data[i].hasViewed)
						    {
						        data[i].ViewedImage = "image/view_pink.png";
						    }
						    else
						    {
						    	data[i].ViewedImage = "image/view_gray.png";
						    }
						    if(data[i].hasFavorited)
						    {
						        data[i].FavoritedImage = "image/favorite_pink.png";
						    }
						    else
						    {
						    	data[i].FavoritedImage = "image/favorite_gray.png";
						    }
						    if(data[i].hasSignined)
						    {
						        data[i].SigninedImage = "image/signin_pink.png";
						    }
						    else
						    {
						    	data[i].SigninedImage = "image/signin_gray.png";
						    }
						};
						var rendered = Mustache.render(tmpl, {"activities": data});
						$("#hot_activity").append(rendered).fadeIn("slow");
						hot_activity_item_Click();
					});
				}
				else {
					$("#hot_activity").empty();
					$(".filter-sort").data("pageIndex", $(".filter-sort").data("pageIndex"));
					$(".filter-sort").data("maxPage", $(".filter-sort").data("pageIndex"));
				}
			},
			error: function(){
				$("#related_content").html("<h3>添加好友后可以查看好友活动！</h3>");
			},
		});
	}
	function showAchievement(elem) {
		elem.load("templates/achievements.html");
	}

	var app = Sammy(function () {
		this.element_selector = ".container";
		var init = {};
		this.around(function (callback) {
			if (typeof init.first === "undefined") {
				showProfile(callback);
				init.first = true;
			} else {
				callback();
			}
		});

		this.helper("hide_siblings", function (elem) {
			elem.show();
			elem.siblings().hide();
		});
		this.get("#/", function () {
			this.redirect('#/profile');
		});
		this.before(function () {
			$(".list a.active").removeClass("active");
		});
		this.get("#/profile", function () {
			this.hide_siblings($(".site-body .profile"));
			$("a[href='#/profile']").addClass("active");
			if (typeof init.profile === "undefined" ) {
				if (role === 0 ) {
					getVolunteerData();
				} 
				else if (role === 2) {
					showOgnStatic($(".profile #organization"));
				}
				init.profile = true;
			}
		});
		this.get("#/feeds", function () {
			this.hide_siblings($(".site-body .feeds"));
			$("a[href='#/feeds']").addClass("active");
			$(".site-body .feeds")
			if (typeof init.feeds === "undefined") {
				showFeeds($(".site-body .feeds"));
				init.feeds = true;
			}
		});
		this.get("#/achievement", function () {
			this.hide_siblings($(".site-body .achievements"));
			$("a[href='#/achievement']").addClass("active");
			if (typeof init.achievement === "undefined" ) { 
				showAchievement($(".site-body .achievements"));
				init.achievement = true;
			}
		});
		this.get("#/activity", function () {
			this.hide_siblings($(".site-body .activity"));
			$("a[href='#/activity']").addClass("active");
			if (typeof init.activity === "undefined") {
				showActivity($(".site-body .activity"));
				init.activity = true;
			}
		});
	});
	app.run("#/profile");
})();
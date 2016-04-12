$(function () {
	function bindEvents() {
	$('.panel  .prev').click(function() {
		var index = $(".panel-content").data("pageIndex");
		if (index > 1) {
			messages.show_messages("all", {"pageIndex": index - 1});
		}
	});

	$('.panel .next').bind("click", function() {
		var index = $(".panel-content").data("pageIndex");
		messages.show_messages("all", {"pageIndex": 0});
	});
	$("#messageSelect button").bind("click", function () {
		if ($(this).hasClass("all")) {
			messages.show_messages("all", {"pageIndex": 0});
		} else if($(this).hasClass("unread")) {
			messages.show_messages("unread", {"pageIndex": 0});
		} else if ($(this).hasClass("remove")) {
			$("#current tbody input:checked").each(function () {
				var tr_elem = $(this).parents("tr:first");
				var unread = false;
				if (tr_elem.find(".title b").length) {
					unread = true;
				}
				var message_id = tr_elem.attr("id");
				amplify.request({
					resourceId: "delete",
					data: {id: message_id},
					success: function () {
						var all = parseInt($("#all_count").text());
						$("#all_count").text(all-1);
						if (unread) {
							var unread = parseInt($("#unread_count").text());
							$("#unread_count").text(unread-1);
						}
						tr_elem.remove();
					},
					error: function () {

					}
				});
			});
		}
	});

	$("#current tbody").on("click", "tr", function () {
		var message = {};
		message.messageFrom = $(this).find(".from").text();
		message.title = $(this).find(".title").text();
		message.sendtime = $(this).find(".sendtime").text();
		message.text = $(this).find(".text").text();
		$(".panel-content").hide();
		var rendered = Mustache.render(messages.detail_template, message);
		$(".detail").data("id", $(this).attr("id"));
		if ($(this).find(".title b").length) {
			var unread = parseInt($("#unread_count").text());
			$("#unread_count").text(unread-1);
		}
		amplify.request({
			resourceId: "read",
			data: {messageId: $(this).attr("id")},
			success: function () {
				$(".detail").html(rendered).fadeIn("slow");
			},
			error: function () {

			}
		});
	});
	$("#current tbody").on("click", "input[type='checkbox']", function (event) {
		event.stopPropagation();
	});
	$("#current thead input[type='checkbox']").change(function () {
		var checked = $(this).prop("checked");
		$("#current tbody tr").each(function () {
			if (checked) {
				$(this).find("input[type='checkbox']").prop("checked", true);
			} else {
				$(this).find("input[type='checkbox']").prop("checked", false);
			}
		});
	});
	$(".panel").on("click", ".detail a", function () {
		$(".detail").hide();
		$("#current tbody tr").each(function () {
			if ($(this).attr("id") === $(".detail").data("id")) {
				if ($(this).find(".title b").length) {
					var title = $(this).find(".title b").text();
					$(this).find(".title").text(title);
				}
				return ;
			}
		});
		$(".panel-content").show();
	});
	}

	var messages = {
		message_template: $("#message_tmpl").html(),
		detail_template: $(".detail").html(),
		getmessages: function (cate, data, success_cb, error_cb) {
			switch (cate) {
				case "read":
					data.hasread = true;
					break;
				case "unread":
					data.hasread = false;
					break;
				case "all":
					break;
				default:
					return;
			}
			amplify.request({
				resourceId: "mymessages",
				data: data,
				success: success_cb,
				error: error_cb
			});
		},
		init: function () {
			$(".panel-content").show();
			$(".detail").hide();
			this.show_messages("all", {"pageIndex": 1});
			bindEvents();
		},
		show_messages: function (cate, data) {
			var tmpl = this.message_template;

			this.getmessages(cate, data, function (datas) {
				$(".panel-content").data("pageIndex", data.pageIndex);
				var unread_count = 0;
				for (var i = datas.length - 1; i >= 0; i--) {
					datas[i].localTime = function () {
						return time_change(this.Time);
					};
					if (!datas[i].HasRead) {
						unread_count = unread_count + 1;
					}
				};
				$("#all_count").text(datas.length);
				$("#unread_count").text(unread_count);
				var messages_box = $("#current").find("tbody");
				var rendered = Mustache.render(tmpl, {"messages": datas});
				messages_box.html(rendered).fadeIn("slow");
			}, function () {

			});
		},

		translate_status: function (status) {
			var s=null;
			switch(status) {
				case 0:
					s='OK';
					break;
				case 1:
					s="Error";
					break;
				case 2:
					s="Offline";
					break;
				default:
					break;
			}
			return s;
		},

		getclass: function (status) {
			var css='';
			switch(status) {
				case 0:
					css="OK";
					break;
				case 1:
					css="error";
					break;
				case 2:
					css="offline";
					break
				default:
					break;
			}
			return css;
		},

		show_message_table: function (data) {
		}
	}
	$("#main-body").off("message.init").on("message.init", function () {
		messages.init();
	});
});
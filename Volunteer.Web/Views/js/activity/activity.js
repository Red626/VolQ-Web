(function () {
	validate(false,true);
	var query = getquery();
	if (query) {
		$("#modalContent").load("templates/activity_detail.html");
		setTimeout(function(){
			initActivity($.cookie("role"),query,false,false);
		},500);
	}
})();
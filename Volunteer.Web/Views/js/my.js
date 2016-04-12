jQuery.AutoComplete=function(selector){
	var elt=$(selector);
	var autoComplete,autoLi;
	var strHtml=[];
	strHtml.push('<div class="AutoComplete" id="AutoComplete">');
    strHtml.push('    <ul class="AutoComplete_ul">');
    strHtml.push('        <li class="AutoComplete_title">请选择邮箱后缀</li>');
    strHtml.push('        <li hz="@qq.com"></li>');
    strHtml.push('        <li hz="@163.com"></li>');
    strHtml.push('        <li hz="@hust.edu.cn"></li>');
    strHtml.push('        <li hz="@126.com"></li>');
    strHtml.push('        <li hz="@sohu.com"></li>');
    strHtml.push('        <li hz="@sina.com"></li>');
    strHtml.push('        <li hz="@volq.org"></li>');
    strHtml.push('    </ul>');
    strHtml.push('</div>');
    $('body').append(strHtml.join(''));
    $('#AutoComplete').css('width',elt.css('width'));

    autoComplete=$('#AutoComplete');
    autoComplete.data('elt',elt);
    autoLi=autoComplete.find('li:not(.AutoComplete_title)');
    autoLi.mouseover(function(){
    	$(this).siblings().filter('.hover').removeClass('hover');
    	$(this).addClass('hover');
    }).mouseout(function(){
    	$(this).removeClass('hover');
    }).mousedown(function(){
    	autoComplete.data('elt').val($(this).text()).change();
    	autoComplete.hide();
    });

    elt.keyup(function(e){
    	if(/13|38|40|116/.test(e.keyCode) || this.value==''){
    		return false;
    	}
    	var name=this.value;
    	if(name.indexOf('@')==-1){
    		autoComplete.hide();
    		return false;
    	}
    	autoLi.each(function(){
    		this.innerHTML=name.replace(/\@+.*/,'')+$(this).attr('hz');
    		if(this.innerHTML.indexOf(name) >= 0){
                $(this).show();
            }else{
                $(this).hide();    
            }
    	}).filter('.hover').removeClass('hover');
    	autoComplete.show().css({
            left: $(this).offset().left,
            top: $(this).offset().top + $(this).outerHeight(true) - 1,
            position: 'absolute',
            zIndex: '99999'
        });
        if(autoLi.filter(':visible').length == 0){
            autoComplete.hide();
        }else{
            autoLi.filter(':visible').eq(0).addClass('hover');            
        }
    }).keydown(function(e){
    	if(e.keyCode == 38){ //上
            autoLi.filter('.hover').prev().not('.AutoComplete_title').addClass('hover').next().removeClass('hover');
        }else if(e.keyCode == 40){ //下
            autoLi.filter('.hover').next().addClass('hover').prev().removeClass('hover');
        }else if(e.keyCode == 13){ //Enter
            autoLi.filter('.hover').mousedown();
            e.preventDefault();    //如有表单，阻止表单提交
        }
    }).focus(function(){
    	autoComplete.data('elt',$(this));
    }).blur(function(){
    	autoComplete.hide();
    });
};

jQuery.cookie=function(cname,cvalue,expiredays){
    if(typeof cname =='undefined'){
        return document.cookie;
    }
    if(typeof cvalue=='undefined'){
        if(document.cookie.length>0){
            c_start=document.cookie.indexOf(cname+'=');
            if (c_start!=1) {
                c_start=c_start+cname.length+1;
                c_end=document.cookie.indexOf(';',c_start);
                if(c_end==-1){
                    c_end=document.cookie.length;
                };
                return unescape(document.cookie.substring(c_start,c_end));
            };
        }
        else{
            return ;
        }
        return ;
    }
    else{
        if (expiredays==null) {
            document.cookie=cname+'='+cvalue;
        }
        else{
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+expiredays);
            //console.log(cname+'='+cvalue+((expiredays==null)?"":";expires="+exdate.toGMTString()));
            document.cookie=cname+'='+cvalue+((expiredays==null)?"":";expires="+exdate.toUTCString());
        };
    };
};

jQuery.clearcookie=function(){
    while(document.cookie.length>0){
        index=document.cookie.indexOf(';');
        index_split=document.cookie.substring(0,index).indexOf('=');
        cookie_name=document.cookie.substring(0,index_split);
        $.cookie(cookie_name,0,0);
    }
};
function update_time(time){
    var local_date=new Date(time);
    var year=local_date.getFullYear();
    var month=local_date.getMonth()+1;
    var date=local_date.getDate();
    var h=local_date.getHours();
    var m=local_date.getMinutes();
    return year+"/"+month+"/"+date+" "+h+":"+m;
}
function time_change(time){
    var local_date=new Date(time);
    var year=local_date.getFullYear();
    var month=local_date.getMonth()+1;
    var date=local_date.getDate();
    var day=local_date.getDay();
    var h=local_date.getHours();
    var m=local_date.getMinutes();
    var s=local_date.getSeconds();
    // change the number of day to character
    day=changeDay(day);
    // add a zero in front of numbers<10
    m=checkTime(m);
    s=checkTime(s);
    return year+"-"+month+"-"+date+day+h+":"+m+":"+s;
};
function changeDay(d)
{
    switch(d)
    {
        case 0:d=" 周日 ";break;//Sun.
        case 1:d=" 周一 ";break;//Mon.
        case 2:d=" 周二 ";break;//Tues.
        case 3:d=" 周三 ";break;//Wed.
        case 4:d=" 周四 ";break;//Thur.
        case 5:d=" 周五 ";break;//Fri.
        case 6:d=" 周六 ";break;//Sat.
        default:break;
    }
    return d;
}
function checkTime(i)
{
    if (i<10) {i="0" + i;}
    return i;
}
function logout() {
    $.post('/api/user/logout', function() {
        window.location.href="signin.html";
        //$.cookie('islogged',';path=/',0);
        //$.cookie('name',';path=/',0);
        $.cookie('token',';path=/',0);
        //$.cookie('email',';path=/',0);
        $.cookie("role",';path=/',0);
        $.cookie("userid",';path=/',0);
    }).error(function() {
        window.location.href="signin.html";
        //$.cookie('islogged',';path=/',0);
        //$.cookie('name',';path=/',0);
        $.cookie('token',';path=/',0);
        //$.cookie('email',';path=/',0);
        $.cookie("role",';path=/',0);
        $.cookie("userid",';path=/',0);
    });
};
function translate_coordinate (s) {
    var coordinate = {};
    coordinate.lng = Number(s.substring(s.indexOf('lng:')+4,s.indexOf(',')));
    coordinate.lat = Number(s.substring(s.indexOf('lat:')+4));
    return coordinate;
};
function translate_role (role) {
    var roleName="";
    switch(role){
        case 0:
            roleName="志愿者";
            break;
        case 1:
            roleName="组织者";
            break;
        case 2:
            roleName="组织机构";
            break;
        case 3:
            roleName="匿名用户";
            break;
    };
    return roleName;
};
function translate_stage (stage) {
    switch(stage){
        case "all":
            return 0;
        case "abouttostart":
            return 1;
        case "running":
            return 2;
        case "finished":
            return 3;
        default:
            return;
    }
}
function translate_activity (active_code) {
    var status="";
    switch(active_code){
        case 0:
            status="草案";
            break;
        case 1:
            status="即将开始报名";
            break;
        case 2:
            status="报名中";
            break;
        case 3:
            status="报名人数达到上限";
            break;
        case 4:
            status="准备就绪";
            break;
        case 5:
            status="签到中";
            break;
        case 6:
            status="签到中，仍可报名";
            break;
        case 7:
            status="已结束";
            break;
        case 8:
            status="已取消";
            break;
        default:
            break;
    };
    return status;
};
function translate_participate (status_code) {
    var status="";
    switch(status_code){
        case 0:
            status="已报名";
            break;
        case 1:
            status="已退出";
            break;
        case 2:
            status="已签到";
            break;
        case 3:
            status="未参加";
            break;
        case 4:
            status="未完成";
            break;
        case 5:
            status="已完成";
            break;
        case 6:
            status="错误";
            break;
        case 7:
            status="禁止参加";
            break;
        default:
            break;
    };
    return status;
};
function translate_CommentState (status_code) {
    var status="";
    switch(status_code){
        case 0:
            status="已完成";
            break;
        case 1:
            status="已报名";
            break;
        case 2:
            status="未参加";
            break;
        case 3:
            status="组织者";
            break;
        case 4:
            status="组织结构";
            break;
        default:
            status="Error!";
            break;
    };
    return status;
};

function validate(ifGoIndex,visitor){
    if(typeof $.cookie('userid')=='undefined' && ifGoIndex)
    {
        window.location.href='signin.html';
        return ;
    }
    if(typeof $.cookie('role')!='undefined'){
        role=$.cookie('role').toLowerCase();
        var role_error=false;
        $.ajax({
            type:'get',
            url:'/api/user/validate',
            //data:{'role':$.cookie('role')},
            //xhrFields: {withCredentials: true},
            success:function(data){
                $("#role").text($.cookie("role"));
                $('.logged').removeClass('hidden');
                $(".not-logged").addClass('hidden');
                var self_base_url = "/views/" + $.cookie("role").toLowerCase() + ".html";
                $(".self-menu .myhome").attr("href", self_base_url + "#/");
                $(".self-menu .mymessage").attr("href", self_base_url + "#/message");
                $(".self-menu .myprofile").attr("href", self_base_url + "#/profile");
                $('#logout').click(logout);
                if(!visitor)
                {
                    amplify.request({
                        resourceId: "profile",
                        success: function(data){
                            $('.avatar').attr('src',data.avatar);
                            $('.avatar').parent().attr('href',data.avatar);
                            $('.description').text(data.description);
                            $(".name").text(data.name);
                            $(".roleName").text(translate_role(data.role));
                        }
                    });//获得头像、签名
                    if($.cookie("role")=="Volunteer")
                    {
                        amplify.request({
                            resourceId: 'statistics',
                            success: function(data){
                                $('.levelPicture').attr("src",data.levelPicture);
                            }
                        });//获得等级
                    }
                }
                return false;
            },
            error:function(data){
                //$.cookie('name',';path=/',0);
                $.cookie('token',';path=/',0);
                $.cookie("role",';path=/',0);
                $.cookie("userid",';path=/',0);
                $('.logged').addClass('hidden');
                $('.not-logged').removeClass('hidden');
                if(ifGoIndex)
                {
                    window.location.href='signin.html';
                }
            }
        });
    }
}
function setUI(){
    //$(window).load(auto_height);
    //$(window).resize(auto_height);
    //$(window).scroll(auto_height);
    setTimeout(function() {$(".site-menu").stickUp();}, 500);
    setInterval(function() {
        var top = $(".menu-left").offset().top-$(document).scrollTop();
        $(".menu-left").height($(window).height()-top); 
    }, 10);
}
function main_click_functions(){
    $('.dropdown a').click(function(){
        if($(this).parents('div.dropdown').hasClass('open'))
        {
            $(this).parents('div.dropdown').addClass('open');
        }
        else
        {
            $(this).parents('div.dropdown').removeClass('open');
        }
    });
    $(".self-menu a").bind("click", function(event) {
        event.preventDefault();
        window.location = $(this).attr("href");
    });
}

function getquery(){
    query=document.location.href;
    index=query.indexOf('=');
    if(index==-1){
        return '';
    }
    else{
        value=query.substring(index+1,index+37);
        return value;
    }
};

REMOTE= {
    ADDR: "http://115.156.252.231:8088"
};
function initActivity(role,activityId,newPage,closePage)
{
    $(".body-right .btn").hide();
    $("#share").hide();
    $("#video").hide();
    $(".rating").removeClass("ableMark");
    amplify.request({
        resourceId: 'activity_detail',
        data: {
            "id": activityId,
        },
        success: function(activity_data){
            $('#mainId').text(activity_data.Id);
            $('#activityName').text(activity_data.Name);
            $('#abstract').text(activity_data.Abstract);
            $('#procedure').summernote().code(activity_data.Procedure).destroy();
            $('#requirement').summernote().code(activity_data.Requirement).destroy();
            $('#rating').text(activity_data.Rating.toFixed(1));
            $('#ratedNumber').text(activity_data.ratedNumber);
            $('#statusText .status').text(translate_activity(activity_data.Status));
            $('#organizationName').text(activity_data.OrganizationName);
            $(".organization-link").attr("href", "/views/visitor.html?id=" + activity_data.OrganizationId);
            $("img.summary").parent().attr("href","/views/summary.html?id="+activity_data.Id);
            $("input[name='shareLink']").val(window.location.href.substring(0,window.location.href.indexOf("/",8))+"/views/activity.html?id="+activity_data.Id);
            $('#organizationAvatar').attr('src',activity_data.OrganizationAvatar);
            $('#location').text(activity_data.Location);
            $('#point').text(activity_data.Point);

            $('#openSignInTime').data('real_date', new Date(activity_data.OpenSignInTime));
            $('#closeSignInTime').data('real_date', new Date(activity_data.CloseSignInTime));
            $('#startTime').data('real_date', new Date(activity_data.StartTime));
            $('#finishTime').data('real_date', new Date(activity_data.FinishTime));
            $('#openSignInTime').text(time_change(activity_data.OpenSignInTime));
            $('#closeSignInTime').text(time_change(activity_data.CloseSignInTime));
            $('#startTime').text(time_change(activity_data.StartTime));
            $('#finishTime').text(time_change(activity_data.FinishTime));

            if(activity_data.Tags!=null && activity_data.Tags.length>0)
            {
                $("#tags").empty();
                for(var i=activity_data.Tags.length-1;i>=0;i--)
                {
                    if(activity_data.Tags[i]!=""&& activity_data.Tags[i]!=null)
                    {
                        $("#tags").append($('<span>', {text:activity_data.Tags[i],class:'tag'}));
                    }
                }
            }
            if(activity_data.BadgeLimit.MustGranted!=null && activity_data.BadgeLimit.MustGranted.length>0)
            {
                $("#mustGranted").empty();
                for(var i=0;i<activity_data.BadgeLimit.MustGranted.length;i++)
                {
                    var item="";
                    for(var j=0;j<activity_data.BadgeLimit.MustGranted[i].length;j++)
                    {
                        item=item+" 或 "+activity_data.BadgeLimit.MustGranted[i][j];
                    }
                    $("#mustGranted").prepend($('<li>',{text:item.substring(3)}));
                }
            }
            if(activity_data.BadgeLimit.CantGranted!=null && activity_data.BadgeLimit.CantGranted.length>0)
            {
                $("#cantGranted").empty();
                for(var i=0;i<activity_data.BadgeLimit.CantGranted.length;i++)
                {
                    $("#cantGranted").prepend($('<li>',{text:activity_data.BadgeLimit.CantGranted[i]}));
                }
            }
            // 将坐标显示在地图上,并调整地图视野
            // initMap("locationmap");
            // address = new BMap.Point(translate_coordinate(activity_data.Coordinate).lng,translate_coordinate(activity_data.Coordinate).lat);
            // map.centerAndZoom(address, 7);
            // addMarker(map,address,activity_data.Location);
            var mapsrc = "http://api.map.baidu.com/staticimage?width=250&height=250&center=";
            var zoom= "&zoom=12&copyright=1";
            var markers = "&markers=";
            var markerStyles = "&markerStyles=m,,blue";
            var coordinate = translate_coordinate(activity_data.Coordinate).lng+","+translate_coordinate(activity_data.Coordinate).lat;
            mapsrc=mapsrc+coordinate+zoom+markers+coordinate+markerStyles;
            $("#locationmap").attr("src",mapsrc);
            // 显示图片视频
            $("#defaultPhoto").removeClass("hidden");
            $("#defaultPhoto").addClass("visible-xs-block");
            $("#defaultPhoto").addClass("visible-sm-block");
            if(activity_data.Photos!=null && activity_data.Photos.length>0)
            {
                $("#defaultPhoto").attr("src",activity_data.Photos[0]);
                if(activity_data.Photos.length==1)
                {
                    $("#photos").hide();
                    $("#defaultPhoto").addClass("visible-md-block");
                    $("#defaultPhoto").addClass("visible-lg-block");
                }
                else if(activity_data.Photos.length>1)
                {
                    $("#photos").empty();
                    for(var i=0;i<activity_data.Photos.length;i++)
                    {
                        $("#photos").append("<li><img style='max-height: 300px;max-width:400px;' src='"+activity_data.Photos[i]+"' alt='not found' /></li>");
                    }
                    $("#photos").zAccordion({ 
                        easing: 'easeOutBounce',
                        timeout: 2000,
                        slideWidth: 350,
                        width: 560,
                        height: 300
                    });
                }
            }
            else
            {
                $("#photos").hide();
                $("#defaultPhoto").addClass("hidden");
                $("#defaultPhoto").removeClass("visible-xs-block");
                $("#defaultPhoto").removeClass("visible-sm-block");
            }
            if(activity_data.Videos!=null && activity_data.Videos.length>0 && activity_data.Videos[0]!=null)
            {
                $("#video").show();
                $("#video").attr("href","http://v.youku.com/v_show/id_XNzIxMTYwMjIw.html");//activity_data.Videos[0]
            }
            if(newPage==true)
            {
                $("#newPage").show();
                $("#newPage").attr("href","/views/activity.html?id=" + activity_data.Id);
            }
            if(closePage==true)
            {
                $("#closePage").show();
            }
            drawCanvas('property',activity_data.HexagramProperty.Compassion,activity_data.HexagramProperty.Sacrifice,activity_data.HexagramProperty.Strength,activity_data.HexagramProperty.Endurance,activity_data.HexagramProperty.Intelligence,true);
            $('#viewedTime').text(activity_data.VolunteerViewedTime);
            $('#favoritedTime').text(activity_data.VolunteerFavoritedTime);
            $('#hasSignedInVolunteerNumber').text(activity_data.HasSignedInVolunteerNumber);
            if (activity_data.MostVolunteers === 0) {
                $("#mostVolunteers").text("无上限");
            } else {
                $('#mostVolunteers').text(activity_data.MostVolunteers);
            }
            $('#leastVolunteers').text(activity_data.LeastVolunteers);
            if(activity_data.HasSignedInVolunteerNumber<=activity_data.MostVolunteers && activity_data.HasSignedInVolunteerNumber>=activity_data.LeastVolunteers)
            {
                $("#leastVolunteers").siblings("img.ico").attr("src","image/limit_pink.png");
            }
            else
            {
                $("#leastVolunteers").siblings("img.ico").attr("src","image/limit_gray.png");
            }
            if(activity_data.Status==7)
            {
                $(".complete").show();
            }
            else
            {
                $(".complete").hide();
            }
            
            switch(role)
            {
                case "Volunteer":
                    $("#viewedTime").siblings("img.ico").attr("src","image/view_pink.png");
                    if(activity_data.hasFavorited)
                    {
                        $("#unfavoriteActivity").show();
                        $("#favoritedTime").siblings("img.ico").attr("src","image/favorite_pink.png");
                    }
                    else {
                        $("#favoriteActivity").show();
                        $("#favoritedTime").siblings("img.ico").attr("src","image/favorite_gray.png");
                    }
                    if(activity_data.Status==2 || activity_data.Status==3 || activity_data.Status==6) 
                    {
                        if(activity_data.Status!=3 && (activity_data.MyRecord==null || activity_data.MyRecord.VolunteerStatus==1)){
                            $('#joinActivity').show();
                            $("#hasSignedInVolunteerNumber").siblings("img.ico").attr("src","image/signin_gray.png");
                        }
                        else if(activity_data.MyRecord!=null && activity_data.MyRecord.VolunteerStatus==0)
                        {
                            $('#quitActivity').show();
                            $("#hasSignedInVolunteerNumber").siblings("img.ico").attr("src","image/signin_pink.png");
                        }
                    }
                    if(activity_data.MyRecord!=null)
                    {
                        $("#myStatus").show();
                        $("#myStatus .status").text(translate_participate(activity_data.MyRecord.VolunteerStatus));

                        if(activity_data.MyRecord.VolunteerStatus==5)
                        {
                            $(".mymark:lt("+Math.round(activity_data.myRate)+")").each(
                                function(){
                                    $(this).attr("src","image/mark_true.png");
                                    $(this).addClass("true");
                                }
                            );
                            $(".rating").addClass("ableMark");
                        }
                    }
                    else
                    {
                        $("#myStatus").hide();
                    }
                    $("#homePage").attr("href","/views/volunteer.html");
                    $("#homePage").attr("title","跳转到志愿者页面");
                    amplify.request({
                        resourceId: 'summaryStatus',
                        data: {
                            "id": activity_data.Id,
                        },
                        success: function(data){
                            if(data==2)
                            {
                                $("img.summary").parent().show();
                                setInterval(function(){
                                    $("img.summary").animate({
                                        opacity: "1",
                                        left: "0",
                                        height: "30",
                                        width: "76"
                                    }, "fast").slideUp("slow").slideDown("slow");
                                },2000);
                            }
                            else
                            {
                                $("img.summary").parent().hide();
                            }
                        }
                    });
                    getParticipateRecords(activity_data);
                    break;
                case "Organizer":
                    if(activity_data.Status==0) {
                        if(activity_data.OrganizerId==$.cookie('userid'))
                        {
                            $('#editActivity').show();
                            $("#newPage").hide();
                        }
                        $("#viewedTime").parent().hide();
                        $("#favoritedTime").parent().hide();
                        $("#hasSignedInVolunteerNumber").parent().hide();
                    }
                    else{
                        if(activity_data.OrganizerId==$.cookie('userid'))
                        {
                            $("#manageActivity").show();
                        }
                    }
                    $("#homePage").attr("href","/views/organizer.html");
                    $("#homePage").attr("title","跳转到组织者页面");
                    if(activity_data.Status==7 && activity_data.OrganizerId==$.cookie('userid'))
                    {
                        $("img.summary").parent().show();
                        setInterval(function(){
                            $("img.summary").animate({
                                opacity: "1",
                                left: "0",
                                height: "30",
                                width: "76"
                            }, "fast").slideUp("slow").slideDown("slow");
                        },2000);
                    }
                    else
                    {
                        $("img.summary").parent().hide();
                    }
                    getParticipateRecords(activity_data);
                    break;
                case "Organization":
                    if(activity_data.Status==0)
                    {
                        if(activity_data.OrganizationId==$.cookie('userid'))
                        {
                            $('#approveActivity').show();
                            $("#newPage").hide();
                        }
                        $("#viewedTime").parent().hide();
                        $("#favoritedTime").parent().hide();
                        $("#hasSignedInVolunteerNumber").parent().hide();
                    }
                    $("#homePage").attr("href","/views/organization.html");
                    $("#homePage").attr("title","跳转到组织机构页面");
                    amplify.request({
                        resourceId: 'summaryStatus',
                        data: {
                            "id": activity_data.Id,
                        },
                        success: function(data){
                            if(data==2)
                            {
                                $("img.summary").parent().show();
                                setInterval(function(){
                                    $("img.summary").animate({
                                        opacity: "1",
                                        left: "0",
                                        height: "30",
                                        width: "76"
                                    }, "fast").slideUp("slow").slideDown("slow");
                                },2000);
                            }
                            else
                            {
                                $("img.summary").parent().hide();
                            }
                        }
                    });
                    getParticipateRecords(activity_data);
                    break;
                default:
                    amplify.request({
                        resourceId: 'summaryStatus',
                        data: {
                            "id": activity_data.Id,
                        },
                        success: function(data){
                            if(data==2)
                            {
                                $("img.summary").parent().show();
                                setInterval(function(){
                                    $("img.summary").animate({
                                        opacity: "1",
                                        left: "0",
                                        height: "30",
                                        width: "76"
                                    }, "fast").slideUp("slow").slideDown("slow");
                                },2000);
                            }
                            else
                            {
                                $("img.summary").parent().hide();
                            }
                        }
                    });
                    $("button.makeComment").text("注册后参与评论").off().on("click",function(){
                        registerAndBack(this);
                    });
                    $("#registerAndBack").show();
                    $("#homePage").attr("href","/views/signin.html");
                    $("#homePage").attr("title","跳转VolQ首页");
                    break;
            }
        },
        error: function(data){
            
        },
    });
    amplify.request({
       resourceId: 'activityQRCode',
        data: {
            "id": activityId,
        },
        success: function(data){
            $("img.qrcode").attr("src", "data:img/png;base64," + data);
        },
        error: function()
        {

        } 
    });
    getCommentHistory(activityId,1);
    bindsActivity();
}
function getParticipateRecords(activity_data)
{
    $("#hasSignedinVolunteers").empty();
    if(activity_data.Status>1)
    {
        $("#hasSignedinVolunteers").parent().show();
        for (var i = activity_data.VolunteersRecord.length - 1; i >= 0; i--) {
            amplify.request({
                resourceId: 'volunteerstatistics',
                data: {id:activity_data.VolunteersRecord[i].VolunteerId},
                success: function(data){
                    var templ = $("#volunteer_tmpl").html();
                    var rendered = Mustache.render(templ, data);
                    $("#hasSignedinVolunteers").append(rendered);
                },
                error: function(){

                }
            });
        }
    }
}
function getCommentHistory(id,page)
{
    $("#comments").empty();
    amplify.request({
        resourceId: 'commentHistory',
        data: {
            "id": id,
            pageindex: page
        },
        success: function(data){
            for (var i = data.length - 1; i >= 0; i--) {
                data[i].Time=time_change(data[i].Time);
                data[i].Link="/views/visitor.html?id="+data[i].UserId;
                data[i].Status=translate_CommentState(data[i].UserState);
            };
            var tmpl = $("#comments_tmpl").html();
            var rendered = Mustache.render(tmpl, {"comments": data});
            $("#comments").append(rendered).fadeIn("slow");
        },
        error: function()
        {

        } 
    });
    amplify.request({
        resourceId: 'commentCount',
        data: {
            "id": id,
        },
        success: function(data){
            $("#total_page").text(Math.ceil(parseInt(data)/5));
        },
        error: function()
        {

        } 
    });
}
function initMap(mapId) {
    // 百度地图API功能:显示
    map = new BMap.Map(mapId);

    // 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: false
    });
    map.addControl(navigationControl);
    var menu = new BMap.ContextMenu();
    menu.addItem(new BMap.MenuItem('返回活动地点',function(){map.centerAndZoom(address, 15);},100));
    map.addContextMenu(menu);
    map.enableScrollWheelZoom(true);
}
function changeMark(elem) {
    if($(".rating").hasClass("ableMark"))
    {
        amplify.request({
            resourceId: "rate",
            data: {activityId: $('#mainId').text(),rate: ($(elem).prevAll(".mymark").length+1).toFixed(2)},
            success: function() {
                if(!$(elem).hasClass("true"))
                {
                    $(elem).attr("src","image/mark_true.png");
                }
                $(elem).prevAll(".mymark").each(
                    function(){
                        $(this).attr("src","image/mark_true.png");
                    }
                );
                $(elem).nextAll(".mymark").each(
                    function(){
                        $(this).attr("src","image/mark_false.png");
                    }
                );
                amplify.request({
                    resourceId: 'getRate',
                    data: {
                        "id": $('#mainId').text(),
                    },
                    success: function(data){
                        $("#rating").text("#"+data.toFixed(2));
                    },
                    error: function()
                    {
                    }
                });
            },
            error: function() {
                alert("不能多次评分!");
            }
        });
    }
    else
    {
        alert("仅供完成活动的志愿者评分!");
    }
}
function replyComment(elem) {
    $("#isCommentOnComment").text(true);
    $("#fatherCommentId").text($(elem).parent().parent().siblings(".Id").text());
    $("#validNum").prev().html("<b>回复&nbsp;</b>"+$(elem).parent().siblings("a").text());
    $("#makeComment").show();
    window.location.hash="#validNum";
}
function makeComment() {
    $("#isCommentOnComment").text(false);
    $("#makeComment").hide();
    $("#validNum").prev().html("<b>评论活动</b>");
}
function commitComment() {
    if($("textarea[name='newComment']").val().trim()!="")
    {
        amplify.request({
            resourceId: "makeComment",
            data: {id: $('#mainId').text(),content: $("textarea[name='newComment']").val(),isCommentOnComment:$("#isCommentOnComment").text(),fatherCommentId:$("#fatherCommentId").text()},
            success: function() {
                getCommentHistory($('#mainId').text(),1);
                $("textarea[name='newComment']").val("");
            },
            error: function() {
                alert("请登陆后评论！");
            }
        });
    }
}
function prevPage() {
    if(parseInt($("#current_page").text())>1)
    {
        var prev=parseInt($("#current_page").text())-1;
        getCommentHistory($('#mainId').text(),prev);
        $("#current_page").text(prev);
    }
}
function nextPage() {
    if(parseInt($("#current_page").text())<parseInt($("#total_page").text()))
    {
        var next=parseInt($("#current_page").text())+1;
        getCommentHistory($('#mainId').text(),next);
        $("#current_page").text(next);
    }
}
function createShareLink() {
    $("#share").slideToggle();
}//显示分享连链接
function copyShareLink(){
    copy_clip($("input[name='shareLink']").val());
}
function registerAndBack(){
    window.location.href="index.html#"+window.location.pathname+window.location.search;
}
function bindsActivity() {
    $("#favoriteActivity").off().on("click", function() {
        amplify.request({
            resourceId: "favorite",
            data: {activityId: $('#mainId').text()},
            success: function() {
                $("#favoriteActivity").hide();
                $("#unfavoriteActivity").show();
                $("#favoritedTime").text(parseInt($("#favoritedTime").text())+1);
                $("#favoritedTime").siblings("img.ico").attr("src","image/favorite_pink.png");
            },
            error: function() {

            }
        });
    });
    $("#unfavoriteActivity").off().on("click", function() {
        amplify.request({
            resourceId: "unfavorite",
            data: {activityId: $('#mainId').text()},
            success: function() {
                $("#unfavoriteActivity").hide();
                $("#favoriteActivity").show();
                $("#favoritedTime").text(parseInt($("#favoritedTime").text())-1);
                $("#favoritedTime").siblings("img.ico").attr("src","image/favorite_gray.png");
            },
            error: function() {

            }
        });
    });
    $("#joinActivity").off().on('click',function(){
        amplify.request({
            resourceId: 'signin_activity',
            data: 'id='+$('#mainId').text(),
            success: function(){
                if(typeof $.cookie('role')=='undefined'){
                    alert("角色不对，请重新登录");
                    setTimeout(function(){
                        window.location.href="signin.html";
                    },3000);
                }
                else{
                    $("#quitActivity").show();
                    $("#joinActivity").hide();
                    $("#hasSignedInVolunteerNumber").text(parseInt($("#hasSignedInVolunteerNumber").text())+1);
                    $("#hasSignedInVolunteerNumber").siblings("img.ico").attr("src","image/signin_pink.png");
                    if(parseInt($("#hasSignedInVolunteerNumber").text())<=parseInt($("#mostVolunteers").text()) && parseInt($("#hasSignedInVolunteerNumber").text())>=parseInt($("#leastVolunteers").text()))
                    {
                        $("#leastVolunteers").siblings("img.ico").attr("src","image/limit_pink.png");
                    }
                    else
                    {
                        $("#leastVolunteers").siblings("img.ico").attr("src","image/limit_gray.png");
                    }
                }
            },
            error: function(data){
                alert('加入不成功');
            },
        });
    });//加入一个活动
    $("#quitActivity").off().on('click',function(){
        amplify.request({
            resourceId: 'signout_activity',
            data: 'id='+$('#mainId').text(),
            success: function(){
                if(typeof $.cookie('role')=='undefined'){
                    alert("角色不对，请重新登录");
                    setTimeout(function(){
                        window.location.href="signin.html";
                    },3000);
                }
                else{
                    $("#joinActivity").show();
                    $("#quitActivity").hide();
                    $("#hasSignedInVolunteerNumber").text(parseInt($("#hasSignedInVolunteerNumber").text())-1);
                    $("#hasSignedInVolunteerNumber").siblings("img.ico").attr("src","image/signin_gray.png");
                }
                if(parseInt($("#hasSignedInVolunteerNumber").text())<=parseInt($("#mostVolunteers").text()) && parseInt($("#hasSignedInVolunteerNumber").text())>=parseInt($("#leastVolunteers").text()))
                {
                    $("#leastVolunteers").siblings("img.ico").attr("src","image/limit_pink.png");
                }
                else
                {
                    $("#leastVolunteers").siblings("img.ico").attr("src","image/limit_gray.png");
                }
            },
            error: function(){
                alert('退出不成功');
            },
        });
    });//退出一个活动
    $("#manageActivity").off().on('click',function(){
        $('#myModal').modal('hide');
        window.location.href="organizer.html#/manage?id="+$('#mainId').text();
    });//管理一个活动
    $("#editActivity").off().on('click',function(){
        $('#myModal').modal('hide');
        $('#main-body').load('templates/activity_new.html', function() {
            initialise($('#mainId').text());
        });
    });//编辑一个活动
    $("#approveActivity").off().on('click',function() {
        $('#myModal').modal('hide');
        amplify.request({
            resourceId: 'active_activity',
            data: "activityId="+$('#mainId').text(),
            success: function(){
               document.location.reload();
            },
            error:function(){
                alert("操作失败！");
            },
        });
    });//批准一个活动
    $("#photos").off().on("click", "img", function () {
        var url = location.protocol + "//" + location.host + $(this).attr("src");
        window.open($(this).attr("src"));
    });
}
// 编写自定义函数,创建标注
function addMarker(map,point,content,clear,icon){
    if(clear==0)
    {
        map.clearOverlays();
    }
    var marker = new BMap.Marker(point);
    if(typeof icon != "undefined")
    {
        var myIcon =new BMap.Icon(icon, new BMap.Size(30,30), {
            imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        marker = new BMap.Marker(point, {icon:myIcon});
    }
    map.addOverlay(marker);
    marker.addEventListener("click",function(e){
        openInfo(map,content,e)}
    );
}
function openInfo(map,content,e){
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var opts = {
            width : 300,     // 信息窗口宽度
            enableMessage:false//设置允许信息窗发送短息
           };
    var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow,point); //开启信息窗口
}
function drawCanvas(canvas,compassion,sacrifice,strength,endurance,intelligence,num) {
    try {
        if (typeof canvas === "string") {
            var ctx = document.getElementById(canvas).getContext('2d');
        } else {
            var ctx = canvas.getContext("2d");
        }
    }
    catch (e) {
        return e;
    }
    ctx.clearRect(0, 0, 250, 250);
    ctx.save();
    ctx.translate(125,125);
    ctx.fillStyle = 'rgb(255,64,129)';
    ctx.strokeStyle = 'rgb(150,150,150)';
    var max = compassion;
    var edge = 90;
    if(max<sacrifice){max=sacrifice;}
    if(max<strength){max=strength;}
    if(max<endurance){max=endurance;}
    if(max<intelligence){max=intelligence;}
    if(max==0){max=edge;}
    var length = new Array(compassion*edge/max,sacrifice*edge/max,strength*edge/max,endurance*edge/max,intelligence*edge/max);
    var property = new Array('爱心','奉献','力量','耐力','智力');
    var hexagram = new Array("x"+compassion,"x"+sacrifice,"x"+strength,"x"+endurance,"x"+intelligence);
    for (var i = 0;i < length.length;i++){
        ctx.save();
        ctx.rotate(-Math.PI*2*i/length.length);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -edge);
        ctx.lineTo(-edge*Math.sin(Math.PI*2/length.length), -edge*Math.cos(Math.PI*2/length.length));
        ctx.closePath();
        ctx.stroke();
        // 设置字体内容，以及在画布上的位置
        ctx.translate(0, -edge-20);
        ctx.rotate(Math.PI*2*i/length.length);
        ctx.font = "12px arial"; 
        ctx.textAlign = "left";
        ctx.fillText(property[i], -10, 5); 
        
        if(num===true)
        {
            ctx.font = "10px arial";
            ctx.fillText(hexagram[i], -10, 16);
        }
        ctx.restore();
    }

    for (var i = 0;i < length.length;i++){
        ctx.save();
        ctx.fillStyle = 'rgba(0,205,204,0.8)';
        ctx.rotate(-Math.PI*2*i/length.length);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length[i]);
        var to=i+1;
        if(to==length.length)
        {
            to=0;
        }
        ctx.lineTo(-length[to]*Math.sin(Math.PI*2/length.length), -length[to]*Math.cos(Math.PI*2/length.length));
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,64,129,0.8)';
        ctx.arc(0, -length[i], 2, 0, Math.PI*2, true); 
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();
};
function checkLength(obj,length){
    if(!length)
    {
        var length = 200;
    }
    var value = obj.value;
    if(value.length>length){
        obj.value=obj.value.substr(0, length);
    }else{
        document.getElementById("validNum").innerHTML = "（还可以输入"+(length - value.length)+"字）";
    }
};

function slide(elem) {
    elem.css({"left": "200px", "opacity": 0.3}).fadeIn(100);
    elem.animate({
        left: '0px',
        opacity: '1.0',
    },400);
}
function showSelectedContent(parent, child, callback) {
    parent.children().hide();
    child.show();
    callback && callback(parent);
}
function showOne(elems){
    elems.siblings().hide();
    elems.show();
}
function activeOne(elems,clas){
    elems.siblings().removeClass(clas);
    elems.addClass(clas);
}
function activeList(elem, parent, clas) {
    elem.parents(parent).find("." + clas).removeClass(clas);
    elem.addClass(clas);
}
function copy_clip(txt) {
    if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
    } else if (window.netscape) {
            try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                    alert("您的浏览器限制您进行剪贴板操作，请手动复制！");
                    return false;
            }
            var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                    return;
            var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                    return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                    return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
    }
}
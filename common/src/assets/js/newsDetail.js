(function () {
    var idReg=/id=(\d+)/;
    var getId=idReg.exec(location.search);
    getId=getId&&getId[1];
    var typeReg=/type=(\d+)/;
    var getType=typeReg.exec(location.search);
    getType=getType&&getType[1];
    var newsDetail={
        init:function () {
            this.mainCotent();
            this.hotCommend();
        },
        mainCotent:function () {
            $.ajax({
                url:utils.api+'news/show',
                type:'GET',
                data:{id:getId},
                success:function (res) {
                    var publishTime,
                        dateTime,
                        ext,
                        content;
                    if(res){
                        if(res.code===2000&&res.data){
                            var data=res.data;

                            dateTime =new utils.baseTime(data.lasttime*1000);
                            publishTime= dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
                            ext=new utils.code();
                            content=ext.unescape(data.content);
                            document.title=data.title;
                            $('#newsDetailsTitle').text(data.title);
                            $('#newsSource').text(data.source);
                            $('#newsAuthor').text(data.author);
                            $('#newsPubishTime').text(publishTime);
                            $('#mainContentNews').html(content);
                        }
                    }
                }
            })
        },
        hotCommend:function () {
            $.ajax({
                url:utils.api+'news/hotlists',
                type:'GET',
                data:{type:getType,number:6},
                success:function (res) {
                    var data,
                        firstStr='',
                        otherStr='',
                        totalStr='';
                    if(res){
                        if(res.code===2000&&res.data){
                            data=res.data;
                            var link,imgUrl;
                            for (var i = 0; i < data.length; i++) {
                                var item = data[i];
                                link=utils.toDetailPage+'?id='+item.id;
                                imgUrl=utils.base+'upload/'+item.image;
                                if(i===0){
                                    firstStr='<a href="'+link+'" target="_blank"><div class="u-pic-text">'+ item.title+'</div><div class="u-text-withPic"><img src="'+imgUrl+'" alt="" class="u-recomPic"><div class="u-desc">'+ item.title+'</div></div></a>';
                                }else{
                                    otherStr+='<li><a href="'+link+'">'+item.title+'</a></li>'
                                }
                            }
                            totalStr='<div class="u-banner-pic-title">'+ firstStr+'</div>'+'<ul class="m-t2">'+otherStr+'</ul>';
                            $('#hotRecommend').html(totalStr);
                        }
                    }
                }
            })



        }

    };
    newsDetail.init();
})();




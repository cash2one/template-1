var newsCenterData = null;
var indexFile = {
    init: function () {
      //  this.navMenu();
        utils.navMenu();
        this.initNews();
        this.hotGuideNews();
    },
    toDetailPage:'./page/wzry/newsDetail.html',
    initNews: function () {
        var that = this;
        var newsCenter01 = $('#newsCenter_01'),
            newsCenter02 = $('#newsCenter_02'),
            newsCenter03 = $('#newsCenter_03'),
            newsCenter04 = $('#newsCenter_04'),
            lasestNews = $('#latestNews');
        $.ajax({
            url: utils.api + 'news/appshow',
            type: 'GET',
            success: function (res) {
                if (res) {
                    if (res.code === 2000) {
                        newsCenterData = res.data;
                        console.log(newsCenterData);
                        that.carousel(newsCenterData.hot);
                        that.latestNewsInfo(newsCenterData.news, lasestNews);
                        that.centerNews(newsCenterData["王者荣耀"], newsCenter01,2);
                        that.centerNews(newsCenterData["英雄联盟"], newsCenter02,3);
                        that.centerNews(newsCenterData["DOTA2"], newsCenter03,4);
                        that.centerNews(newsCenterData["炉石传说"], newsCenter04,5);
                    }
                }
            }
        })
    },
    centerNews: function (data, jqdom,type) {
        if (!data) {
            return;
        }
        var $newsCenter = jqdom;
        var str = '', text, link;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            text = utils.subLength(item.title, 18);
           // link = utils.base  + item.detailUrl+'?id='+item.id;
            link=indexFile.toDetailPage+'?id='+item.id+'&type='+type;
            if (i === 0) {
                text = utils.subLength(item.title, 20);
                str += '<li class="u-news-header"><h3 class="u-blue-titlte"><a class="u-n2" href="' + link + '" target="_blank">' + text + '</a></h3></li>'
            } else {
                str += '<li class="m-st"><a href="' + link + '" target="_blank">' + text + '</a></li>';
            }
        }
        $newsCenter.append(str);
    },
    carousel: function (data) {
        var carouselTag = document.getElementById('carouselTag');
        var carouselItem = document.getElementById('carouselItem');
        if (carouselTag === null && carouselItem === null) {
            return
        }
        var str = '', crserial = '', carolitem, imgurl;
        for (var i=0;i<data.length;i++) {
            carolitem = data[i];
            imgurl = utils.base + 'upload/' + carolitem.image;
            if (i === 0) {
                crserial = '<li data-target="#index_carousel" data-slide-to="' + i + '" class="active"></li> ';
                str = '<div class="item active"><img alt="" src="' + imgurl + '"><div class="u-carousel-title"><p>' + carolitem.title + '</p></div></div>'
            } else {
                crserial += '<li data-target="#index_carousel" data-slide-to="' + i + '" class=""></li> ';
                str += '<div class="item"><img alt="" src="' + imgurl + '"><div class="u-carousel-title"><p>' + carolitem.title + '</p></div></div>'
            }
        }
        carouselTag.innerHTML = crserial;
        carouselItem.innerHTML = str;

    },
    latestNewsInfo: function (data, $dom) {
        if (!data) {
            return
        }
        var htmlstr = this.latestFor(data);
        $dom.append(htmlstr);
        var moveListnews = function () {
            var count = 0;
            return function () {
                count = count - 210;
                if (count === -210 * 4) {
                    count = -210;
                    $dom.css({'top': 0});
                }
                $dom.animate({'top': count}, 500);
            }
        };
        setInterval(moveListnews(), 3*1000);
    },
    latestFor: function (data) {
        var item, text, link, arr = [], str1, str2;
        for (var i = 0; i < data.length; i++) {
            item = data[i];
            text = item.title;
          //  link = utils.base + 'upload/' + item.detailUrl;
            link=indexFile.toDetailPage+'?id='+item.id;
            arr[i] = '<li><a href="' + link + '" target="_blank">' + text + '</a></li>';
        }
        str1 = arr.join('');
        str2 = arr.slice(0, 7).join('');
        return str1 + str2;
    },
    hotGuideNews:function () {
        var $hotGuideList=$('#hotGuideList'),
            GuideForType=$('#GuideForType'),
            GuideForTime=$('#GuideForTime');
        var getTimeValue='',getTypeValue='';
        var renderDiv=function (data) {
            var str='', item,text,link;
            for (var i = 0; i < data.length; i++) {
                item = data[i];
                text=item.title;
                link= utils.base + 'upload/' + item.detailUrl;
                str+='<li><a href="'+link+'" target="_blank">'+text+'</a></li>'
            }
            return str;
        };
        /* 缓存*/
        var reqSend=(function () {
          var cache={};
           return function (value1,value2) {
               var TimeValue=value1||'',
                   TypeValue=value2||'',
                   item='base'+TimeValue+TypeValue;
               if(!cache[item]){
                   $.ajax({
                       url:utils.api+'news/raiders',
                       type:'GET',
                       data:{'time':TimeValue,'type':TypeValue},
                       success:function (res) {
                           if(res){
                               if(res.code===2000){
                                 //  if(res.data.length===0){return}
                                   cache[item]=res.data;
                                   $hotGuideList.html(renderDiv(cache[item]))
                               }
                           }
                       }
                   });
               }else{
                   $hotGuideList.html(renderDiv(cache[item]))
               }
           }
        })();
       reqSend();
       GuideForType.on('change',function () {
            getTypeValue=$(this).val();
           reqSend(getTimeValue,getTypeValue);
        });
        GuideForTime.on('change',function () {
            getTimeValue=$(this).val();
            reqSend(getTimeValue,getTypeValue);
        })



    }
};
indexFile.init();
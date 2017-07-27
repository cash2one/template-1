var webconfig = {
    baseUrl: utils.base+'/',
    countTime: function (time) {
        var now = new Date(),
            timeleft = now - time * 1000,
            toMinutes = timeleft / (1000 * 60),
            toHours = timeleft / (1000 * 60 * 60),
            releaseTime = toMinutes / (24 * 60);
        if (releaseTime >= 1) {
            return releaseTime.toFixed() + '天前'
        } else if (releaseTime < 1) {
            if (toMinutes >= 60) {
                return toHours.toFixed() + '小时前'
            } else {
                return toMinutes.toFixed() + '分钟前'
            }
        }
    },
};
var vm = new Vue({
    el: '#index_carousel',
    data: {
        carousel: {},
        carimgUrl: webconfig.baseUrl + 'upload/',
    }
});
var indexFile = {
    init: function () {
        this.carousel();
        this.hotnews();
    },
    carousel: function () {
        var carouselTag = document.getElementById('carouselTag');
        var carouselItem = document.getElementById('carouselItem');
        if (carouselTag === null && carouselItem === null) {
            return
        }
        ajax({
            url: webconfig.baseUrl + '/api/news/lists',
            type: 'GET',
            success: function (res) {
                var str = '', crserial = '', carolitem, imgurl;
                if (res) {
                    if (res.code === 2000) {
                        vm.$data.carousel = res;
                        /*    for (var i = 0; i < res.data.length; i++) {
                                carolitem = res.data[i];
                                imgurl = webconfig.baseUrl + 'upload/' + carolitem.image;
                                if (i === 0) {
                                    crserial = '<li data-target="#index_carousel" data-slide-to="' + i + '" class="active"></li> ';
                                    str = '<div class="item active"><img alt="" src="' + imgurl + '"><div class="carousel-caption"><p>' + carolitem.title + '</p></div></div>'
                                } else {
                                    crserial += '<li data-target="#index_carousel" data-slide-to="' + i + '" class=""></li> ';
                                    str += '<div class="item"><img alt="" src="' + imgurl + '"><div class="carousel-caption"><p>' + carolitem.title + '</p></div></div>'
                                }
                            }
                            carouselTag.innerHTML = crserial;
                            carouselItem.innerHTML = str;*/
                    }
                }
            }
        })
    },
    hotnews: function () {
        var hotnewsTitle = document.getElementById('hotnewsTitle'),
            hotnewsUL = document.getElementById('hotnewsUL');
        ajax({
            url: webconfig.baseUrl + 'api/news/lists?number=4',
            type: 'GET',
            success: function (res) {
                var titleStr = '', newliStr = '', newslitem, imgurl, timeLeft;
                var newslink = '';
                if (res) {
                    if (res.code === 2000) {
                        for (var i = 0; i < res.data.length; i++) {
                            newslitem = res.data[i];
                            imgurl = webconfig.baseUrl + 'upload/' + newslitem.image;
                            timeLeft = webconfig.countTime(newslitem.lasttime);
                            if (i === 0) {
                                titleStr = '<a href=""><img src="' + imgurl + '" alt=""><p>' + newslitem.title + '</p></a>'
                            } else {
                                newliStr += '<li><a href="#" target="_blank"><img src="' + imgurl + '" alt="" class="f-fl"><div class="m-hot-news-text f-fr"><p class="u-pat-text">' + newslitem.title + '</p><p class="u-pat-time">' + timeLeft + '</p></div></a></li>'
                            }
                        }
                        hotnewsTitle.innerHTML = titleStr;
                        hotnewsUL.innerHTML = newliStr;
                    }
                }
            }
        })
    }
};
indexFile.init();



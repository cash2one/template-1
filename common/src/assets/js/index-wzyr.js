(function () {
    var idReg = /id=(\d+)/;
    var getId = idReg.exec(location.search);
    getId = getId && getId[1];
    var typeReg = /type=(\d+)/;
    var getType = typeReg.exec(location.search);
    getType = getType && getType[1];
    var indexFileTwo = {
        init: function () {
            this.hotToday();
            this.hotCommend();
        },
        hotToday: function () {
            $.ajax({
                url: utils.api + 'news/arealist',
                data: {'cid': 2},
                type: 'GET',
                success: function (res) {
                    if (res) {
                        if (res.code === 2000 && res.data) {
                            var data = res.data;
                            var str = '', item, type, tagType = '', text, time, dateTime, publishTime, link, id;
                            var todayHotpic = document.getElementById('todayHotpic');
                            if (todayHotpic === null) {
                                return
                            }
                            for (var i = 0; i < data.length; i++) {
                                item = data[i];
                                type = item.type;
                                switch (type) {
                                    case 'strategy':
                                        tagType = '攻略';
                                        break;
                                    case 'pic':
                                        tagType = '图片';
                                        break;
                                    case 'video':
                                        tagType = '视频';
                                        break;
                                    case 'article':
                                        tagType = '文章';
                                        break;
                                }
                                text = item.title;
                                time = item['lasttime'];
                                dateTime = new utils.baseTime(time * 1000);
                                publishTime = dateTime.year + '-' + dateTime.months + '-' + dateTime.day;
                                id = item.id;
                                link = utils.wzryToDetailPage + '?' + 'id=' + id + '&type=2';
                                str += '<li><span class="u-cm-class">' + tagType + '</span> <a class="u-cm-main" href="' + link + '" target="_blank">' + text + '</a> <span class="u-cm-date">' + publishTime + '</span></li>'
                            }
                            todayHotpic.innerHTML = str;
                        }
                    }

                },
                error: function () {

                }
            })

        },
        hotCommend: function () {
            var indexRecommendOne = $('#indexRecommendOne'),
                indexRecommendTwo = $('#indexRecommendTwo');
            $.ajax({
                url: utils.api + 'news/hotlists',
                type: 'GET',
                data: {type: 2, number: 6},
                success: function (res) {
                    var data,
                        firstStr = '',
                        otherStr = '';
                    if (res) {
                        if (res.code === 2000 && res.data) {
                            data = res.data;
                            var link, imgUrl, title, descripttion;
                            for (var i = 0; i < data.length; i++) {
                                var item = data[i];
                                link = utils.wzryToDetailPage + '?id=' + item.id;
                                imgUrl = utils.base + 'upload/' + item.image;
                                title = item.title;
                                descripttion = item.title;
                                if (i === 0) {
                                    firstStr = '<div class="m-i2 media-left media-middle"><a href="' + link + '"><img class="media-object" src="' + imgUrl + '" alt=""></a></div><div class="m-i3"><p class="u-t">' + title + '</p><p class="u-c">' + descripttion + '</p></div>';
                                } else {
                                    otherStr += '<li><a href="' + link + '">' + title + '</a></li>';
                                }
                            }
                            indexRecommendOne.html(firstStr);
                            indexRecommendTwo.html(otherStr);
                        }
                    }
                },
                error: function () {

                }
            })

        }

    };
    indexFileTwo.init();
})();
const websiteIP='http://192.168.1.12:83/' /*'http://39.108.58.75:83/'*/;
var utils = {
    base: websiteIP,
    api: websiteIP+'api/',
    indexToDetailPage:'/page/wzry/newsDetail.html',
    wzryToDetailPage:'/page/wzry/newsDetail.html',
    init: function () {
        this.isLogin();
    },
    userinfo:null,
    code:function () {
        var forkeys=function(obj) {
            if (!obj instanceof Object) return [];
            if (Object.keys) return Object.keys(obj);
            var keys = [];
            for (var key in obj) {
                keys.push(key);
            }
            return keys;
        };
        var invert = function(obj) {
            var result = {};
            var keys = forkeys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                result[obj[keys[i]]] = keys[i];
            }
            return result;
        };
        var escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };
        var unescapeMap = invert(escapeMap);
        var createEscaper = function(map) {
            var escaper = function(match) {
                return map[match];
            };
            var source = '(?:' + forkeys(map).join('|') + ')';
            var testRegexp =new RegExp(source);
            var replaceRegexp =new RegExp(source, 'g');
            return function(string) {
                string = string == null ? '' : '' + string;
                return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
            };
        };
        this.escape = createEscaper(escapeMap);
        this.unescape = createEscaper(unescapeMap);
    },
    htmlDecode:function () {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
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
    subLength:function (str,Len) {
        if(str.length===0){
            return ''
        }
        return str.length>Len?str.substring(0,Len)+'...':str;
    },
    regExpFormat: function (value,regExp,msg) {
        if (!regExp.test(value)) {
            return msg;
        }
    },
    isMinLength: function (value, limit, msg) {
        if (value.length < limit) {
            return msg;
        }
    },
    isNotEmpty: function (value, msg) {
        if (value === '') {
            return msg;
        }
    },
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
    isLogin:function ()  {
        var doc=document;
        var token=localStorage.getItem('token');
        var cornet=localStorage.getItem('cornet');
        if(token){
            $.ajax({
                url: utils.api + 'user/getinfo',
                type: 'GET',
                data: {'token': token, 'cornet': cornet},
                async:false,
                success: function (res) {
                    if (res) {
                        if(res.code===2000){
                            utils.userinfo=res.data;
                          /*  if(localStorage.pic){
                                indexAvatar.src=localStorage.pic
                            }
                            if(indexNickname){
                                if(localStorage.nickname){
                                    indexNickname.innerText=localStorage.nickname;
                                }else{
                                    indexNickname.innerText=localStorage.cornet;
                                }
                            }
                            hadLogin.style.display='block';*/
                        }else{
                           /* beforeLogin.style.display='block';*/
                        }
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }else{
            /*beforeLogin.style.display='block';*/
        }




    },
    navMenu: function () {
        $.ajax({
            url: utils.api + 'index/topmenu',
            type: 'GET',
            success: function (res) {
                var str = '',info,Len;
                var $navMenu = $('#navMenu');
                if (res) {
                    if (res.code === 2000) {
                        info = res.info;
                        Len=info.length;
                        for (var i = 0; i <Len; i++) {
                            var item = info[i];
                            if (i === 0) {
                                str += '<li><a href="' + item.url + '" class="f-select">' + item.cname + '</a></li><li class="line">|</li>';
                            }else if(i===Len-1){
                                str += '<li><a href="' + item.url + '">' + item.cname + '</a></li>';
                            }else {
                                str += '<li><a href="' + item.url + '">' + item.cname + '</a></li><li class="line">|</li>';
                            }
                        }
                        $navMenu.html(str);

                    }
                }

            },
            error: function () {

            }
        })
    },
    clearNull: function (value) {
        return value == null ? '' : value;
    },
    baseTime: function (value) {
        var date;
        if(value===undefined){
            date=new Date()
        }else{
            date = new Date(value);
        }
        var tempMonth = date.getMonth() + 1,
            tempDay = date.getDate(),
            tempHours = date.getHours(),
            tempMinutes = date.getMinutes(),
            tempSecond = date.getSeconds();
        this.year =''+date.getFullYear();
        this.months= tempMonth < 10 ? '0' + tempMonth : '' + tempMonth;
        this.day = tempDay < 10 ? '0' + tempDay : '' + tempDay;
        this.hours = tempHours < 10 ? '0' + tempHours : tempHours;
        this.minutes = tempMinutes < 10 ? '0' + tempMinutes : tempMinutes;
        this.seconds = tempSecond < 10 ? '0' + tempSecond : tempSecond;
    }
};
utils.init();
var exchangeType=function () {
    var forkeys=function(obj) {
        if (!obj instanceof Object) return [];
        if (Object.keys) return Object.keys(obj);
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }


        return keys;
    };
    var invert = function(obj) {
        var result = {};
        var keys = forkeys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = invert(escapeMap);
    var createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        };
        var source = '(?:' + forkeys(map).join('|') + ')';
        var testRegexp =new RegExp(source);
        var replaceRegexp =new RegExp(source, 'g');
        return function(string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    this.escape = createEscaper(escapeMap);
    this.unescape = createEscaper(unescapeMap);
};


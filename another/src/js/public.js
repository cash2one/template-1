var ajax = function (options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = ajax.formatParams(options.data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var responseText = xhr.responseText;
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                if (typeof xhr.responseText === 'string') {
                    responseText = JSON.parse(xhr.responseText);
                }
                options.success && options.success(responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        options.beforeSend && options.beforeSend();
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        options.beforeSend && options.beforeSend();
        xhr.send(params);


    }
};
ajax.formatParams = function (data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
};
HTMLElement.prototype.toshow=function () {
    this.style.display='block';
};
HTMLElement.prototype.tohide=function () {
    this.style.display='none';
};
HTMLElement.prototype.on=function (type,fn) {
    this.addEventListener(type,fn)
};
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}

var commonConfig = {
    Tabs: function () {
        this.toggleOuterTabs('.m-matches-title');
        this.toggleInnerTabId('matchesTabAll');
        this.toggleInnerTabId('matchedTabSecond');
        this.toggleInnerTabId('matchedTabThird');
    },
    setClassExp: function (className) {
        return new RegExp("\\s*" + className + "\\s*");
    },
    drowDownMenu: function () {
        $('.dropdown-menu').on('click', 'a', function () {
            var _this = $(this),
                temp = $(this).text(),
                target = _this.parents('.dropdown-menu');
            target.prev().children('.m-info-list-text').text(temp);
        });
    },
    toggleOuterTabs: function (element, conEL) {
        var dom = document.querySelector(element + ' ' + 'ul');
        if (dom === null) {
            return;
        }
        var containElement = conEL || '.m-matches-container';
        var children = dom.children,
            containers = document.querySelectorAll(containElement),
            className = 'u-title-active',
            classExp = this.setClassExp(className);
        dom.on('click', function (e) {
            var tem = e.target,
                tempchild, tempcon;
            if (tem.tagName === 'LI') {
                for (var i = 0; i < children.length; i++) {
                    tempchild = children[i];
                    tempcon = containers[i];
                    if (tem === tempchild) {
                        if (tempchild.className.indexOf(className) < 0) {
                            tempchild.className += ' ' + className;
                        }
                        tempcon.style.display = 'block';
                    } else {
                        tempchild.className = tempchild.className.replace(classExp, '');
                        tempcon.style.display = 'none';
                    }
                }
            }
        })
    },
    toggleInnerTabId: function (parentId) {
        var el = document.getElementById(parentId);
        if (el === null) {
            return;
        }
        var el_ul = el.querySelector('ul'),
            liArr = el.querySelectorAll('.m-matches-container-title li'),
            className = 'u-child-active',
            classExp = this.setClassExp(className);
        el_ul.on('click', function (e) {
            var tem = e.target,
                liArrItem;
            if (tem.tagName === 'LI') {
                for (var i = 0; i < liArr.length; i++) {
                    liArrItem = liArr[i];
                    if (e.target === liArrItem) {
                        if (liArrItem.className.indexOf(className) < 0) {
                            liArrItem.className += ' ' + className;
                        }
                    } else {
                        liArrItem.className = liArrItem.className.replace(classExp, '');
                    }
                }
            }
        })
    },
    toggleLi: function (parentId, className) {
        var getUL = document.getElementById(parentId);
        var classExp = this.setClassExp(className);
        var getLi = getUL.getElementsByTagName('li');
        getUL.on('click', function (e) {
            var objTarget = e.target,
                getLiItem;
            if (objTarget.tagName === 'LI') {
                for (var i = 0; i < getLi.length; i++) {
                    getLiItem = getLi[i];
                    if (objTarget === getLiItem) {
                        if (getLiItem.className.indexOf(className) < 0) {
                            getLiItem.className += ' ' + className;
                        }
                    } else {
                        getLiItem.className = getLiItem.className.replace(classExp, '');
                    }
                }
            }
        })
    }
};
commonConfig.drowDownMenu();
var utils = {
    base: 'http://39.108.58.75:81',
    url: 'http://39.108.58.75:81/api',
    init: function () {
        this.isLogin();
        this.logout();
        this.headerDrop();
    },
    getStorage: function (value) {
        return localStorage.getItem(value);
    },
    delStorage: function () {
       delete localStorage.token;
       delete localStorage.cornet;
    },
    isLogin:function ()  {
        var doc=document;
        var loginStatus=localStorage.getItem('token'),
             hadLogin=doc.getElementById('hadLogin'),
             beforeLogin=doc.getElementById('beforeLogin'),
             indexAvatar=doc.getElementById('indexAvatar'),
            indexNickname=doc.getElementById('indexNickname'),
            listNickname=doc.getElementById('listNickname');
        if(loginStatus){
            if(localStorage.pic){
                indexAvatar.src=localStorage.pic
            }
            if(indexNickname){
                if(localStorage.nickname){
                    indexNickname.innerText=localStorage.nickname;
                }else{
                    indexNickname.innerText=localStorage.cornet;
                }
            }
            hadLogin.style.display='block';
        }else{
            beforeLogin.style.display='block';
        }

    },
    clearNull: function (value) {
        return value == null ? '' : value;
    },
    baseTime: function (value) {
        var date = new Date(value),
            tempMonth = date.getMonth() + 1,
            tempDay = date.getDate(),
            tempHours = date.getHours(),
            tempMinutes = date.getMinutes(),
            tempSecond = date.getSeconds();
        this.year = date.getFullYear();
        this.month = tempMonth < 10 ? '0' + tempMonth : '' + tempMonth;
        this.day = tempDay < 10 ? '0' + tempDay : '' + tempDay;
        this.hours = tempHours < 10 ? '0' + tempHours : tempHours;
        this.minutes = tempMinutes < 10 ? '0' + tempMinutes : tempMinutes;
        this.seconds = tempSecond < 10 ? '0' + tempSecond : tempSecond;
    },
    setWarnTips: function (value, status) {
        var div = null;
        var temStatus;
        var doc=document;
        switch (status) {
            case 1:
                temStatus = 'u-tips-red';
                break;
            case 2:
                temStatus = 'u-tips-green';
                break;
            default:
                temStatus = 'u-tips-green';
        }
        return function () {
            if (!div) {
                div = 1;
                var box = doc.createElement('div');
                box.id = "tipsBox";
                box.className = "tips-box" + ' ' + temStatus;
                box.innerHTML = '<i>x</i><span></span>';
                var overLay = doc.createElement('div');
                overLay.id = 'overlay';
                overLay.className = 'overlay';
                doc.body.appendChild(box);
                doc.body.appendChild(overLay);
            }
            var tipsBox = doc.getElementById('tipsBox'),
                overlay = doc.getElementById('overlay');
            var tipSpan = tipsBox.getElementsByTagName('span')[0];
            tipSpan.innerText = value;
            var closeX = tipsBox.getElementsByTagName('i')[0];
            overlay.style.display = 'block';
            tipsBox.style.display = 'block';
            var hideDom = function () {
                overlay.style.display = 'none';
                tipsBox.style.display = 'none';
            };
            closeX.onclick = hideDom;
            overlay.onclick = hideDom;
        }
    },
    headerDrop:function () {
        var ticketInfo=document.getElementById('ticket-info');
        var infoMenu=document.getElementById('indexinfoMenu');
        ticketInfo.on('mouseover',function () {
            infoMenu.toshow()
        });
        ticketInfo.on('mouseleave',function () {
            infoMenu.tohide()
        });
    },
    logout: function () {
        var doc=document;
        var logoutBtn = doc.getElementById('logoutBtn');
        if (logoutBtn === null) {
            return
        }
        logoutBtn.on('click', function () {
            var getcornet = utils.getStorage('cornet');
            var gettoken = utils.getStorage('token');
            $.ajax({
                url: utils.url + '/logout',
                type: 'GET',
                data: {"token": gettoken, "cornet": getcornet},
                success: function (res) {
                    if (res) {
                        switch (res.code) {
                            case 2000:
                                utils.delStorage();
                                location.href='./index.html';
                                break;
                            case 2001:
                                console.log('退出失败');
                                break;
                            default:
                                console.log(res.code);
                                console.log('退出失败');

                        }
                    }
                }
            })

        })


    }
};
utils.init();

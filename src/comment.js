var search = location.search;
var reg = /id=(\d+)/;
var getId = reg.exec(search);
getId = getId && getId[1];
var typeReg = /type=(\d+)/;
var getType = typeReg.exec(location.search);
getType = getType && getType[1];
function commentIptFocus(_this) {
    var showIpt = $(_this),
        showIptParent = showIpt.parent(),
        showIptTopParent = showIptParent.parent(),
        commentActDiv = showIptTopParent.find('.comment-box-act'),
        parentSiblings = showIptTopParent.siblings('.comment-box-parent');
    var textAreaToFocus = commentActDiv.find('.u-comment-input');
    showIptParent.hide();
    $(_this).blur();
    commentActDiv.show();
    textAreaToFocus.focus();
    //     $('#commentTextArea').focus();

}
function commentTextareaBlur(_this) {
    var textArea = $(_this),
        textareaParent = textArea.parent(),
        textareaTopParent = textareaParent.parent();
    if (textArea.val() === '') {
        textareaParent.hide();
        textareaTopParent.find('.comment-box-layout').show();
    } else {

    }
}

var findChild = function (obj) {
    var strTemp = '',topOverNickname,bc='';
    if (obj instanceof Array) {
        for (var i = 0; i < obj.length; i++) {
            var item = obj[i];
            topOverNickname = item.nickname;
            strTemp += comment.genHtml(item, null, true, topOverNickname);
            bc=strTemp + findChild(item['_child']);
           // totalCount++
        }
        return bc;

    }else{
        return '';
    }
};
var renderData = function (alldata) {
    var nickName, dateTime, timeStr, content, publishTime, pid, id, ucornet;
    var str1 = '',
        str2 = '',
        childDiv = '';
    for (var i = 0; i < alldata.length; i++) {
        var item = alldata[i];
        publishTime = item['c_time'] * 1000;
        dateTime = new utils.baseTime(publishTime);
        nickName = item.nickname;
        content = item.content;
        id = item.id;
        pid = item.pid;
        ucornet = item.cornet;
        timeStr = dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
        if (item['_child']) {
            childDiv += findChild(item['_child']);
            str2 += comment.genHtml(item, childDiv);
        } else {
            str1 += comment.genHtml(item);
        }
    }
    return str1 + str2;
};
var comment = {
    init: function () {
        this.rendList();
        this.btnEvent();
        //this.uiLayout();
    },
    token: localStorage.getItem('token'),
    cornet: localStorage.getItem('cornet'),
    phone:localStorage.getItem('phone'),
    reportData: null,
    errorUrl:'/login.html',
    redirect:function (url) {
       location.href=url;
    },
    redirectError:function () {
        location.href=comment.errorUrl;
    },
    uiLayout: function () {
        var showIpt = $('.u-comment-box-show'),
            showIptParent = $('.comment-box-layout'),
            commentActDiv = $('.comment-box-act');
        showIpt.on('focus', function () {
            showIptParent.hide();
            commentActDiv.show();
        })
    },
    btnEvent: function () {
        $.fn.changeArrow = function (classname1, classname2) {
            $(this).addClass(classname1).removeClass(classname2);
        };
        var doc = document;
        var commitBtn = doc.getElementById('commitBtn'),
            commentTextArea = doc.getElementById('commentTextArea'),
            deployCommentArea = $('#deployCommentArea'),
            deployHotArea = $('#deployHotArea');
        commitBtn.addEventListener('click', function () {
            var dateTime = new utils.baseTime();
            var commentValue = commentTextArea.value;
            var sendData, token = localStorage.getItem('token'),
                cornet = localStorage.getItem('cornet'),
                nickName = localStorage.getItem('nickname'),
                phoneNum = localStorage.getItem('phone'),
                commentAuthor = nickName ? nickName : phoneNum;
            if (commentTextArea.value === '') {
                return false;
            }
            sendData = {
                'type': 1,
                'pid': 0,
                'contents': commentValue,
                'sid': getId,
                'token': token,
                'cornet': cornet
            };
            $.ajax({
                url: utils.api + 'comment/addcomment',
                type: 'POST',
                data: sendData,
                success: function (res) {
                    if (res) {
                        if (res.code === 2000) {
                            comment.rendList();
                            /*var publishTime, str = '';
                            publishTime = dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
                            str = '<div class="m-c3-list"><div class="m-f1"><img class="u-user-img" src="/assets/image/comment-user-avatar.png"></div><div class="m-f2"><div class="u-comment-userInfo"><a href="javascript:void(0)" class="u-user-name">' + commentAuthor + '</a><span class="u-p-time">' + publishTime + '</span></div><p class="u-comment" data-cornet="100020">' + commentValue + '</p><div class="m-btn-group"><a href="javascript:void(0);" class="u-reply-btn">回复</a><a href="javascript:void(0);" class="u-reply-fold u-arrow-down">回复(<span>0</span>)</a><a href="javascript:void(0);" class="u-support">支持</a><a href="javascript:;" class="u-prosecute">举报</a></div><div class="u-reply-text-zone" id=""><textarea class="u-com-textarea-inner" id="" placeholder="请输入评论内容" maxlength="350"></textarea><button class="u-comment-btn">回复</button></div></div></div>';
                            deployCommentArea.prepend(str);
                            commentTextArea.value = '';*/
                        }else{
                            alert('发表失败');
                            comment.redirectError();
                        }
                    }
                }
            });
        });
        $('#submitReport').on('click', function () { //提交举报;
            var getTextArea = $('#reportTextArea');
            $.ajax({
                url: utils.api + 'comment/addreport',
                type: 'POST',
                data: comment.reportData,
                success: function (res) {
                    if (res) {
                        if (res.code === 2000) {
                            alert('举报成功');
                            $('#myModal').hide();
                        } else if (res.code === 7001) {
                            alert('你已经举报过该用户');
                        }else{
                            comment.redirectError();
                        }
                    }
                }
            })
        });
        $.fn.replyshow_hide = function () {
            var parent = $(this).parents('.comment-box-parent');
            parent.hide();
            parent.find('.comment-box-act').hide();
            parent.find('.comment-box-layout').show();
        };
        $.fn.md_class_add_remove = function (classname1, classname2, flag) {
            if (flag) {
                $(this).addClass(classname2).removeClass(classname1);
            } else {
                $(this).addClass(classname1).removeClass(classname2);
            }
        };

        var uReplybtnshow = function () {
            var _this = $(this);
            var isShowcontent = +_this.attr('data-show');
            var topParent = _this.parents('.m-f2');
            var goalParent = _this.parents('.m-c3-list');
            var commentContent = topParent.find('.comment-box-parent');
            commentContent.show();
            goalParent.siblings('.m-c3-list').find('.comment-box-parent').hide();
        };
        var uCommentCommitReplyBtn = function () {
            
            var topParent = $(this).parents('.comment-box-act');
            var mtopParent = $(this).parents('.m-f2');
            var userInfoNickname = mtopParent.children('.u-comment-userInfo');
            var atUserNickname=userInfoNickname.find('.u-user-name').text();
            var replyFold=  mtopParent.find('.u-reply-fold'),
                 replyFoldSpan=replyFold.children('span'),
                 replyFoldCount=+replyFoldSpan.text();
            var that = $(this);
            var contentsTextArea = topParent.find('.u-comment-input'),
                type = getType,
                pid = mtopParent.find('.u-comment').attr('data-id'),
                sid = getId;
            var contentsTxt = contentsTextArea.val();
            var sendData = {
                "type": 1,
                "pid": pid,
                "contents": contentsTxt,
                "sid": sid,
                "token": comment.token,
                "cornet": comment.cornet
            };

            var childAllDiv = $(this).parents('.m-c3-list').children('.childAllDiv');
            var genContainer = $(this).parents('.m-c3-list').children('.comment-genContainer');
            if (contentsTextArea.val() === '') {
                return false;
            }
            $.ajax({
                url: utils.api + 'comment/addcomment',
                type: 'POST',
                data: sendData,
                success: function (res) {
                    if (res) {
                        if (res.code === 2000) {
                            comment.rendList();
                      /*      var tempTxt = comment.addWritehtml(contentsTxt, atUserNickname);
                            if (childAllDiv.length !== 0) {
                                childAllDiv.prepend(tempTxt);
                            } else {
                                genContainer.prepend(tempTxt);
                            }*/
                            /*that.replyshow_hide();
                            replyFold.click();
                            replyFoldSpan.text(++replyFoldCount);
                            contentsTextArea.val('');*/
                        }else{
                            comment.redirectError();
                        }
                    }
                },
                error: function (error) {

                }

            })
        };
        var uReplyFold = function () {
            var count = $(this).attr('data-show');
            var parent = $(this).parents('.m-c3-list'),
                expandDiv = parent.children('.comment-genContainer');
            if (+count === 0) {
                $(this).attr('data-show', 1);
                expandDiv.show();
                $(this).md_class_add_remove('u-arrow-up', 'u-arrow-down');
            } else {
                $(this).attr('data-show', 0);
                expandDiv.hide();
                $(this).md_class_add_remove('u-arrow-up', 'u-arrow-down', 1);
            }
        };
        deployCommentArea.on('click', '.u-reply-btn-show', uReplybtnshow);
        deployCommentArea.on('click', '.u-comment-commit-replyBtn', uCommentCommitReplyBtn);
        deployCommentArea.on('click', '.u-reply-fold ', uReplyFold);
        /*热门评论*/
        deployHotArea.on('click', '.u-reply-btn-show', uReplybtnshow);
        deployHotArea.on('click', '.u-comment-commit-replyBtn', uCommentCommitReplyBtn);
        deployHotArea.on('click', '.u-reply-fold ', uReplyFold);
        /*热门评论*/
    },
    addWritehtml: function (contentEL, atUsername) {
        var isChildDiv = '';
        var getName = localStorage.getItem('nickName');
        var getPhone = localStorage.getItem('phone');
        getPhone = utils.repalceStar(getPhone);
        var nickName, dateTime, timeStr, content, publishTime, pid, id, ucornet, like, report, str, nicknameDiv='';
        publishTime = +new Date();
        dateTime = new utils.baseTime(publishTime);
        nickName = getName /*? getName : getPhone*/;
        content = contentEL;
        id = '';
        pid = '';
        like = 0;
        report = 0;
        timeStr = dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
        if (atUsername) {
            nickName = '@' + nickName;
            atUsername = atUsername + '//';
            nicknameDiv = '<span><span class="u-comment-at-user">' + atUsername + '<span><a href="#" class="u-user-name">' + nickName + '</a></span>';
        } else {
            nicknameDiv = '<a href="javascript:void(0);" class="u-user-name">' + nickName + '</a>';
        }
        str =
            '<div class="m-c3-list">' +
            '<div class="m-f1">' +
            '<img class="u-user-img" src="/assets/image/avatar/header1.png">' +
            '</div>' +
            '<div class="m-f2">' +
            '<div class="u-comment-userInfo">' +
            /* '<a href="javascript:void(0);" class="u-user-name">' + nickName + '</a>' + */
            nicknameDiv +
            '<span class="u-p-time">' + timeStr + '</span>' +
            '</div>' +
            '<p class="u-comment" data-pid="' + pid + '" data-nickname="' + nickName + '"  data-id="' + id + '">' + content + '</p>' +
               '<div class="m-btn-group">' +
               '<a href="javascript:;" class="u-reply-btn  u-reply-btn-show" data-show="0">回复</a>' +
               '<a href="javascript:;" class="u-reply-fold u-arrow-down">回复(<span>' + 0 + '</span>)</a>' +
               '<a href="javascript:;" class="u-support" data-click="0" onclick="comment.support(this)">支持(<span class="like-count">' + like + '</span>)</a>' +
               '<a href="javascript:;" class="u-prosecute" onclick="comment.report(this)"  data-toggle="modal" data-target="#myModal">举报(<span>' + report + '</span>)</a>' +
               '</div>' +
            '<div class="comment-box-parent" style="display: none">' +
            '<div class="comment-box-layout">' +
            '<input type="text" class="u-comment-box-show" onfocus="commentIptFocus(this)" placeholder="请输入评论内容">' +
            '<button class="u-comment-box-btn" >回复</button>' +
            '</div>' +
            '<div class="comment-box-act" style="display: none" >' +
            '<textarea class="u-comment-input" placeholder="请输入评论内容" onblur="commentTextareaBlur(this)" maxlength="350" id="commentTextArea"></textarea>' +
            '<div class="comment-btn-zone">' +
            '<button class="u-comment-commit-btn u-comment-commit-replyBtn">回复</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="u-reply-text-zone" >' +
            '<textarea class="u-com-textarea-inner" placeholder="请输入评论内容" maxlength="350"></textarea>' +
            '<button class="u-comment-btn">回复</button>' +
            '</div>' +
            '</div>' +
            isChildDiv +
            '</div>';
        return str;

    },
    genHtml: function (item, childDom, fromRecursion, topOverNickname) {
        var isChildDiv = '', str;
        var nickName, dateTime, timeStr, content, publishTime, pid, id, ucornet, like, report,
            replyNumdom = '', nicknameDiv,
            itemLength = 0;
        publishTime = item['c_time'] * 1000;
        dateTime = new utils.baseTime(publishTime);
        content = item.content;
        id = item.id;
        nickName = item.nickname;
        pid = item.pid;
        like = item.like;
        report = item.report;
        ucornet = item.cornet;
        timeStr = dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
        if (childDom) {
            itemLength = item['_child'].length;
            isChildDiv = '<div class="m-f3 childAllDiv comment-genContainer">' + childDom + '</div>';
        } else {
            isChildDiv = '<div class="m-f3 comment-genContainer"></div>';

        }
        topOverNickname = topOverNickname || '';

        if (fromRecursion) {
            if (topOverNickname) {
                nickName = '@' + nickName;
                topOverNickname = topOverNickname + '//';
                nicknameDiv = '<span><span class="u-comment-at-user">' + topOverNickname + '<span><a href="#" class="u-user-name">' + nickName + '</a></span>';
            }else{
                nicknameDiv = '<span><span class="u-comment-at-user"><span><a href="#" class="u-user-name">' + nickName + '</a></span>';
            }
        } else {
            replyNumdom = '<a href="javascript:;" class="u-reply-fold u-arrow-down" data-show="0">回复(<span>' + itemLength + '</span>)</a>';
            nicknameDiv = '<span><span class="u-comment-at">' + topOverNickname + '<span><a href="#" class="u-user-name">' + nickName + '</a></span>';
        }

        if (itemLength === 0) {
            replyNumdom = '<a href="javascript:;" class="u-reply-fold u-reply-fold-zero" data-show="0">回复(<span>' + itemLength + '</span>)</a>';
        }


        str =
            '<div class="m-c3-list">' +
            '<div class="m-f1">' +
            '<img class="u-user-img" src="/assets/image/avatar/header1.png">' +
            '</div>' +
            '<div class="m-f2">' +
            '<div class="u-comment-userInfo">' +
            /*'<a href="#" class="u-user-name">' + nickName + '</a>' +*/
            /* nicknameDiv= '<span><span class="u-comment-at">'+topOverNickname+'<span><a href="#" class="u-user-name">' + nickName + '</a></span>'+*/
            nicknameDiv +
            '<span class="u-p-time">' + timeStr + '</span>' +
            '</div>' +
            '<p class="u-comment" data-pid="' + pid + '"  data-id="' + id + '">' + content + '</p>' +
            '<div class="m-btn-group">' +
            '<a href="javascript:;" class="u-reply-btn  u-reply-btn-show" data-show="0">回复</a>' + '|' +
            replyNumdom +
            /*   '<a href="javascript:;" class="u-reply-fold u-arrow-down" data-show="0">回复(<span>' + itemLength + '</span>)</a>' +*/
            '<a href="javascript:;" class="u-support" data-click="0" onclick="comment.support(this)">支持(<span class="like-count">' + like + '</span>)</a>' +
            '<a href="javascript:;" class="u-prosecute" onclick="comment.report(this)"  data-toggle="modal" data-target="#myModal">举报(<span>' + report + '</span>)</a>' +
            '</div>' +
            '<div class="comment-box-parent" style="display: none">' +
            '<div class="comment-box-layout">' +
            '<input type="text" class="u-comment-box-show" onfocus="commentIptFocus(this)" placeholder="请输入评论内容">' +
            '<button class="u-comment-box-btn" >回复</button>' +
            '</div>' +
            '<div class="comment-box-act" style="display: none" >' +
            '<textarea class="u-comment-input" placeholder="请输入评论内容" onblur="commentTextareaBlur(this)" maxlength="350" id="commentTextArea"></textarea>' +
            '<div class="comment-btn-zone">' +
            '<button class="u-comment-commit-btn u-comment-commit-replyBtn">回复</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="u-reply-text-zone" >' +
            '<textarea class="u-com-textarea-inner" placeholder="请输入评论内容" maxlength="350"></textarea>' +
            '<button class="u-comment-btn">回复</button>' +
            '</div>' +
            '</div>' +
            isChildDiv +
            '</div>';
        return str;
    },
    rendList: function () {
  /*
        var arr = [1, 2, 3, 4, 5, 6], comstr = '';
        var toggleHide = function (textzoneId) {
            var count = 0;
            return function () {
                count++;
                if (count % 2 === 0) {
                    $('#' + textzoneId).hide();
                } else {
                    $('#' + textzoneId).show();
                }
            }
        };*/
        $.ajax({
            url: utils.api + 'comment/commentlist',
            type: 'GET',
            data: {
                'id': getId,
                'type': 1,
            },
            success: function (res) {
                var deployCommentArea = $('#deployCommentArea');
                var deployHotArea = $('#deployHotArea');
                var alldata, hotdata;

                if (res) {
                    if (res.code === 2000 && res.data) {
                        alldata = res.data.allcomment;
                        hotdata = res.data.hotcomment;
                        deployCommentArea.html(renderData(alldata));
                        deployHotArea.html(renderData(hotdata));
                    }
                }
            },
            error: function () {

            }
        });
    },
    support: function (_this) {
        var clickCount = $(_this).attr('data-click');
        var topParent = $(_this).parents('.m-f2');
        var content = topParent.find('.u-comment'),
            contentId = content.attr('data-id');
        var likeCountEl = $(_this).find('.like-count');
        var getCount = +likeCountEl.text();
        var that = $(_this);
        var token = comment.token;
        if (+clickCount !== 1) {
            $.ajax({
                url: utils.api + 'comment/addlike',
                type: 'POST',
                data: {
                    "id": contentId,
                    "token": comment.token,
                    "cornet": comment.cornet
                },
                success: function (res) {
                    if (res) {
                        if (res.code === 2000 && res.data) {
                            $(_this).attr('data-click', 1);
                            $(_this).css('color', '#999');
                            getCount++;
                            likeCountEl.html(getCount);
                        } else if (res.code === 7002) {
                            alert('你已赞过该评论');
                            $(_this).attr('data-click', 1);
                            $(_this).css('color', '#999');
                        }else{
                            alert('点赞失败');
                        }
                    }
                },
                error: function () {

                }
            })


        }
    },
    report: function (_this) {
        var topParent = $(_this).parents('.m-f2');
        var content = topParent.find('.u-comment'),
            contentId = content.attr('data-id'),
            contentTxt = content.text();
        var getType = $('input[name="reportType"]:checked').attr('data-type');
        comment.reportData = {
            "id": contentId,
            "type": getType,
            "contents": contentTxt,
            "token": comment.token,
            "cornet": comment.cornet
        }
    }
};

comment.init();


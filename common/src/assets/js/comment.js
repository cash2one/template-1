
    var search=location.search;
    var reg=/id=(\d+)/;
    var getId=reg.exec(search);
         getId=getId&&getId[1];
    var typeReg=/type=(\d+)/;
    var getType=typeReg.exec(location.search);
    getType=getType&&getType[1];
    function commentIptFocus(_this) {
        var showIpt=$(_this),
            showIptParent=showIpt.parent(),
            showIptTopParent=showIptParent.parent(),
            commentActDiv=showIptTopParent.find('.comment-box-act'),
            parentSiblings=showIptTopParent.siblings('.comment-box-parent');
          var  textAreaToFocus=commentActDiv.find('.u-comment-input');
            showIptParent.hide();
            $(_this).blur();
            commentActDiv.show();
            textAreaToFocus.focus();
      //     $('#commentTextArea').focus();

    }
    function commentTextareaBlur(_this) {
        var textArea=$(_this),
            textareaParent=textArea.parent(),
            textareaTopParent=textareaParent.parent();
        if(textArea.val()===''){
            textareaParent.hide();
            textareaTopParent.find('.comment-box-layout').show();
        }else{

        }
    }
    function replyUserSend(_this) {

       var token = localStorage.getItem('token'),
            cornet = localStorage.getItem('cornet');
       var sendData;
       var hiddenIpt=$(_this).parent().find('input[type=hidden]');
       var commentValue=$(_this).parent().parent().find('.u-comment-input');
       var pid=hiddenIpt.attr('data-pid');
       var ucornet=hiddenIpt.attr('data-cornet');
       var getData=hiddenIpt.attr('data-id');
        sendData = {
            'type': getType,
            'pid': pid,
            'contents': commentValue.val(),
            'sid': getId,
            'token': token,
            'cornet': cornet,
            'ucornet':ucornet
        };
         $.ajax({
             url: utils.api + 'comment/addcomment',
             type: 'POST',
             data: sendData,
             success: function (res) {
                 if (res) {
                     if (res.code === 2000) {
                         var publishTime, str = '';
                         publishTime = dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
                         str ='';
                         commentTextArea.value = '';
                     }
                 }
             }
         });






    }
    var clickCount=0;
    function Replyshow(_this) {
        clickCount++;
        var ipt=$(_this);
        var topParent=ipt.parents('.m-f2').prev();
        if(clickCount%2===0){
            topParent.show();
        }else{
            topParent.hide();
        }

    }





    var comment = {
        init: function () {
            this.rendHtml();
            this.btnEvent();
            //this.uiLayout();
        },
        uiLayout:function () {
            var showIpt=$('.u-comment-box-show'),
                showIptParent=$('.comment-box-layout'),
                commentActDiv=$('.comment-box-act');
            showIpt.on('focus',function () {
                showIptParent.hide();
                commentActDiv.show();
            })
        },
        btnEvent: function () {
            $.fn.changeArrow=function (classname1,classname2) {
                $(this).addClass(classname1).removeClass(classname2);
            };
            var doc = document;
            var commitBtn = doc.getElementById('commitBtn'),
                commentTextArea = doc.getElementById('commentTextArea'),
                deployCommentArea = $('#deployCommentArea');
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
                    'type': getType,
                    'pid': 1,
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
                                var publishTime, str = '';
                                publishTime = dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
                                str = '<div class="m-c3-list"><div class="m-f1"><img class="u-user-img" src="./../../assets/image/comment-user-avatar.png"></div><div class="m-f2"><div class="u-comment-userInfo"><a href="#" class="u-user-name">' + commentAuthor + '</a><span class="u-p-time">' + publishTime + '</span></div><p class="u-comment" data-cornet="100020">' + commentValue + '</p><div class="m-btn-group"><a href="javascript:void(0);" class="u-reply-btn">回复</a><a href="javascript:void(0);" class="u-reply-fold u-arrow-down">回复(<span>0</span>)</a><a href="javascript:void(0);" class="u-support">支持</a><a href="javascript:void(0);" class="u-prosecute">举报</a></div><div class="u-reply-text-zone" id=""><textarea class="u-com-textarea-inner" id="" placeholder="请输入评论内容" maxlength="350"></textarea><button class="u-comment-btn">回复</button></div></div></div>';
                                deployCommentArea.prepend(str);
                                commentTextArea.value = '';
                            }
                        }
                    }
                });
            });





        },
        rendHtml:function () {
            var  deployCommentArea = $('#deployCommentArea');
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
            };
            $.ajax({
                url: utils.api + 'comment/commentlist',
                type: 'GET',
                data: {
                    'id':4/*getId*/,
                    'type':1/*getType*/
                },
                success: function (res) {
                    var alldata,second,onestr='';
                    var nickName,dateTime,timeStr,content,publishTime,pid,id,ucornet;
                    var replyBtnId,textzoneId,areaId;
                    var secondArea='',secondStr='';
                    var tempArr=[];
                    if(res){
                        if(res.code===2000&&res.data){
                            alldata=res.data.allcomment;
                            var str1='',
                                 str2='',
                                 childDiv='';
                            var findChild=function (obj,key) {
                                var nickName,dateTime,timeStr,content,publishTime,pid,id,ucornet;
                                var strTemp='',replyBtn;
                                if( obj[key] instanceof Array){
                                    for(var i=0;i<obj[key] .length;i++){
                                      var item=obj[key][i];
                                      publishTime=item['c_time']*1000;
                                     dateTime=new utils.baseTime(publishTime);
                                     nickName=item.nickname;
                                     content=item.content;
                                     id=item.id;
                                     pid=item.pid;
                                     ucornet=item.cornet;
                                     timeStr= dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
                                   replyBtn='<div class="comment-box-parent" style="display: none"><div class="comment-box-layout"><input type="text" class="u-comment-box-show" onfocus="commentIptFocus(this)" placeholder="请输入评论内容"> <button class="u-comment-box-btn">回复</button></div><div class="comment-box-act" style="display:none"><textarea class="u-comment-input" placeholder="请输入评论内容" onblur="commentTextareaBlur(this)" maxlength="350"></textarea><div class="comment-btn-zone"><input type="hidden" data-pid="'+pid+'" data-id="'+id+'" data-cornet="'+ ucornet+'"> <button class="u-comment-commit-btn" onclick="replyUserSend(this)">回复</button></div></div></div>';
                                  strTemp+='<div class="m-c3-list" id="'+id+'" style="padding-left:90px;"><div class="m-f1"><img class="u-user-img" src="./../../image/raw_1497322938.jpeg"></div><div class="m-f2"><div class="u-comment-userInfo"><a href="#" class="u-user-name">'+ nickName +'</a> <span class="u-p-time">'+timeStr+'</span></div><p class="u-comment" data-pid="'+ pid +'">'+content+'</p><div class="m-btn-group"><a href="javascript:void(0);" class="u-reply-btn" onclick="replyUserSend(this)">回复</a> <a href="javascript:void(0);" class="u-reply-fold u-arrow-down">回复(<span>'+0+'</span>)</a> <a href="javascript:void(0);" class="u-support">支持</a> <a href="javascript:void(0);" class="u-prosecute">举报</a><div class="u-reply-text-zone" id="' + textzoneId + '"><textarea class="u-com-textarea-inner" id="' + areaId + '" placeholder="请输入评论内容" maxlength="350"></textarea><button class="u-comment-btn">回复</button></div></div></div>'+replyBtn+'</div>';
                                    }
                                   return strTemp+findChild(obj[key] ,key);
                                }else{
                                  return '';
                                }
                            };
                            for (var i = 0; i < alldata.length; i++) {
                                var item = alldata[i];
                                publishTime=item['c_time']*1000;
                                dateTime=new utils.baseTime(publishTime);
                                nickName=item.nickname;
                                content=item.content;
                                id=item.id;
                                pid=item.pid;
                                ucornet=item.cornet;
                                timeStr= dateTime.year + '-' + dateTime.months + '-' + dateTime.day + ' ' + dateTime.hours + ':' + dateTime.minutes + ':' + dateTime.seconds;
                                if(item['_child']){
                                    childDiv= findChild(item,'_child');
                                    str2+='<div class="m-c3-list"><div class="m-f1"><img class="u-user-img" src="./../../image/raw_1497322938.jpeg"></div><div class="m-f2"><div class="u-comment-userInfo"><a href="#" class="u-user-name">'+ nickName +'</a> <span class="u-p-time">'+timeStr+'</span></div><p class="u-comment" data-pid="'+ pid +'">'+content+'</p><div class="m-btn-group"><a href="javascript:void(0);" class="u-reply-btn">回复</a> <a href="javascript:void(0);" class="u-reply-fold u-arrow-down">回复(<span>'+0+'</span>)</a> <a href="javascript:void(0);" class="u-support">支持</a> <a href="javascript:void(0);" class="u-prosecute">举报</a><div class="u-reply-text-zone" id="' + textzoneId + '"><textarea class="u-com-textarea-inner" id="' + areaId + '" placeholder="请输入评论内容" maxlength="350"></textarea><button class="u-comment-btn">回复</button></div></div></div></div>'+childDiv;
                                }else{
                                    str1+='<div class="m-c3-list"><div class="m-f1"><img class="u-user-img" src="./../../image/raw_1497322938.jpeg"></div><div class="m-f2"><div class="u-comment-userInfo"><a href="#" class="u-user-name">'+ nickName +'</a> <span class="u-p-time">'+timeStr+'</span></div><p class="u-comment" data-pid="'+ pid +'">'+content+'</p><div class="m-btn-group"><a href="javascript:void(0);" class="u-reply-btn">回复</a> <a href="javascript:void(0);" class="u-reply-fold u-arrow-down">回复(<span>'+0+'</span>)</a> <a href="javascript:void(0);" class="u-support">支持</a> <a href="javascript:void(0);" class="u-prosecute">举报</a><div class="u-reply-text-zone" id="' + textzoneId + '"><textarea class="u-com-textarea-inner" id="' + areaId + '" placeholder="请输入评论内容" maxlength="350"></textarea><input type="hidden" data-pid="'+pid+'" data-id="'+id+'" data-cornet="'+ ucornet+'"> <button class="u-comment-btn">回复</button></div></div></div></div>';
                                }
                            }
                            deployCommentArea.append(str1+str2);





                        }
                    }
                },
                error: function () {

                }


            });


            /*  for (var i = 0; i < arr.length; i++) {
                  var item = arr[i],
                      replyBtnId = 'solid' + item,
                      textzoneId = 'zone' + item,
                      areaId = 'area' + item;
                  comstr = '<div class="m-c3-list"><div class="m-f1"><img class="u-user-img" src="./../../image/raw_1497322938.jpeg"></div><div class="m-f2"><div class="u-comment-userInfo"><a href="#" class="u-user-name">Bench</a> <span class="u-p-time">2017-08-09</span></div><p class="u-comment">奇迹和传奇两大忆童年的游戏在今天终于走到了一起</p><div class="m-btn-group"><a href="javascript:void(0);" class="u-reply-btn" id="' + replyBtnId + '" data-cornet="' + item + '">回复</a> <span class="supportTo">支持</span> <span>举报</span></div><div class="u-reply-text-zone" id="' + textzoneId + '"><textarea class="u-com-textarea-inner" id="' + areaId + '" placeholder="请输入评论内容" maxlength="350"></textarea><button class="u-comment-btn">回复</button></div></div></div>';
                  deployCommentArea.append(comstr);
                  //  $('#'+replyBtnId).on('click',toggleHide(textzoneId))
              }*/

            $('#deployCommentArea').on('click', '.u-reply-btn', function () {
                var currentId = this.id;
                currentId = currentId.replace('solid', '');
                var zoneArr = document.querySelectorAll('.u-reply-text-zone'),
                    zoneItemId;
                for (var i = 0; i < zoneArr.length; i++) {
                    var item = zoneArr[i];
                    zoneItemId = item.id.replace('zone', '');
                    if (zoneItemId === currentId) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        },

    };
    comment.init();

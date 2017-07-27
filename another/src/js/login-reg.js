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
  /*  arr.push(("v=" + Math.random()).replace(".", ""));*/
    return arr.join("&");
};
var state = {
    url:'http://39.108.58.75:81/api',
    numberExp:/^\d+$/,
    phoneExp: /^1[3|5|6|7|8]\d{9}/,
    strNumExp:/^[A-za-z]+\d*$/,
    accountFormat: function (value, msg1,msg2) {
        if(state.numberExp.test(value)){
            if (!state.phoneExp.test(value)) {
                return msg1
            }
        }else{
            if(!state.strNumExp.test(value)){
                return msg2
            }
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
    isSame:function (value1,value2,msg) {
        if(value1!==value2){
            return msg;
        }
    },
    warnTips: function (message,tag) {
        var tipsBox = document.getElementById('tipsBox'),
            overLay = document.getElementById('overlay');
        var tipsSpan=tipsBox.getElementsByTagName('span')[0],
            secondsTxt=3;
        if(tag){
            tipsBox.style.background='rgba(2, 138, 45, 0.9)';
            tipsSpan.innerText=message+secondsTxt+' 秒跳转';
         var Timer=setInterval(function () {
                secondsTxt--;
                tipsSpan.innerText=message+secondsTxt+' 秒跳转';
            },1000)
        }else{
            tipsSpan.innerText=message;
        }
        tipsBox.style.display = 'block';
        overLay.style.display = 'block';

    }

};

var util = {
    setLoginStorage:function (token,data) {
        localStorage.setItem('token',token);
        for(var key in data){
            localStorage.setItem(key,data[key]);
        }

    },
    getStorage:function (value) {
         return localStorage.getItem(value)
    },
    init: function () {
        util.Register();
        util.Login();
        util.publicEvent();

    },
    publicEvent: function () {
        var tipsBox = document.getElementById('tipsBox'),
            overLay = document.getElementById('overlay');
        var closeX=tipsBox.getElementsByTagName('i')[0];
        var hideDom=function () {
            overLay.style.display = 'none';
            tipsBox.style.display = 'none';
        };
            closeX.onclick=hideDom;
            overLay.onclick =hideDom;
    },
    Valid: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                return arr[i]
            }
        }
    },
    Register: function () {
        var doc = document;
        var regBtn = doc.getElementById('regBtn');
        if (regBtn === null) {
            return
        }
        regBtn.addEventListener('click', function () {
            var phonenum = doc.getElementById('regPhone'),
                password = doc.getElementById('regPwd'),
                repassword = doc.getElementById('regComfirmPwd');
            var phonenumValue = phonenum.value,
                passwordValue = password.value,
                repasswordValue = repassword.value,
                arr = [], message,sendData;
            arr.push(state.isNotEmpty(phonenumValue, '用户名不能为空'));
            arr.push(state.isMinLength(phonenumValue, 6, '用户名字数不小于6位'));
            arr.push(state.accountFormat(phonenumValue, '手机号码格式不正确','非手机用户名必须以字母开头'));
            arr.push(state.isNotEmpty(passwordValue, '密码不能空'));
            arr.push(state.isMinLength(passwordValue, 6, '密码字数不小于6位'));
            arr.push(state.isNotEmpty(repasswordValue, '确认密码不能空'));
            arr.push(state.isMinLength(repasswordValue, 6, '确认密码字数不小于6位'));
            arr.push(state.isSame(passwordValue, repasswordValue, '前后密码不一致'));
            message = util.Valid(arr);
            if (message) {
                state.warnTips(message);
                return false;
            } else {
                sendData={"phone": phonenumValue.trim(), "password": passwordValue, "repassword": repasswordValue};
                if(state.numberExp.test(phonenumValue)){
                    sendData['type']=1;
                }else{
                    sendData['type']=2;
                }
                ajax({
                    beforeSend:function () {

                    },
                    url: state.url+'/reg',
                    type: 'POST',
                    data: sendData,
                    success: function (res) {
                        if(res){
                            if(res.code===2000){
                                state.warnTips('注册成功',1);
                                setTimeout(function () {
                                    location.href='./login.html';
                                },3000)
                            }else{
                                state.warnTips('注册失败');
                                console.log(res.code);
                            }
                        }

                    },
                    error: function (error) {
                        console.log(error)
                    }

                })
            }

        })
    },
    Login: function () {
        var doc = document;
        var loginBtn = doc.getElementById('loginBtn'),
             sendData={},
             platform;
        var phonenum = doc.getElementById('loginPhone'),
            password = doc.getElementById('loginPwd'),
            tick=doc.getElementById('remember-tick');
        var getRem=localStorage.getItem('isRememberPhone');

        if (loginBtn === null) {
            return
        }
        if(getRem){
            phonenum.value=getRem;
            tick.checked=true;
        }
        loginBtn.addEventListener('click', function () {
            var phonenumValue = phonenum.value,
                passwordValue = password.value;
            var arr = [], message;
            var isRememberAccount=tick.checked;
            arr.push(state.isNotEmpty(phonenumValue, '帐号不能空'));
            arr.push(state.isMinLength(phonenumValue, 6, '帐号字数不小于6位'));
            arr.push(state.isNotEmpty(passwordValue, '密码不能空'));
            arr.push(state.isMinLength(passwordValue, 6, '密码字数不小于6位'));
            message = util.Valid(arr);
            if (message) {
                state.warnTips(message);
                return false;
            }
            sendData={"username": phonenumValue, "password": passwordValue};
            if(state.numberExp.test(phonenumValue)){
                sendData['type']=1;
            }else{
                sendData['type']=2;
            }
            ajax({
                url: state.url+'/login',
                type: 'POST',
                dataType:'json',
                data:sendData ,
                success: function (res) {
                   if(res){
                       if(res.code===2000){
                           var isToken= util.getStorage('token');
                           if(!isToken){
                               util.setLoginStorage(res.token,res.data);
                           }
                           if(isRememberAccount){
                             localStorage.setItem('isRememberPhone',phonenumValue);
                           }else{
                               delete localStorage.isRememberPhone;
                           }
                           location.href='./index.html';
                       }else{
                           state.warnTips('登录失败');
                           console.log(res.code);
                       }
                   }

                },
                error: function (error) {
                    console.log(error)
                }

            })
        })
    }
};
util.init();






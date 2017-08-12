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
var Validator = function () {
    this.cache = [];
};
Validator.prototype.add = function (item) {
    this.cache.push(item);
};
var state = {
    url: 'http://192.168.1.12:83/' + 'api/',
    smsApi: 'http://39.108.58.75:8080/api/',
    numberExp: /^\d+$/,
    phoneExp: /^1[3|5|6|7|8]\d{9}$/,
    strNumExp: /^[A-z]+\d+[A-z]*|\d+[A-z]+[\d]*$/,
    accountFormat: function (value, msg1) {
        if (!state.phoneExp.test(value)) {
            return msg1;
        }
        /* if (state.numberExp.test(value)) {

         } else {
             if (!state.strNumExp.test(value)) {
                 return msg2
             }
         }*/
    },
    isNumberFormat: function (value, msg) {
        if (!state.numberExp.test(value)) {
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
    isSame: function (value1, value2, msg) {
        if (value1 !== value2) {
            return msg;
        }
    },
    warnTips: function (message, tag) {
        $('#alertPopup').show();
        $('#alertMessage').text(message);
        if (tag) {
            $('#alertPopup').addClass('alert-success').removeClass('alert-warning');
            tempTimer = setTimeout(function () {
                $('#alertPopup').hide();
            }, 5000)
        } else {
            $('#alertPopup').addClass('alert-warning').removeClass('alert-success');
        }
        $('#alertClose').off('click').on('click', function () {
            $('#alertPopup').hide();
        });
    }

};

var util = {
        setLoginStorage: function (token, data) {
            localStorage.setItem('token', token);
            for (var key in data) {
                localStorage.setItem(key, data[key]);
            }
        },
        getStorage: function (value) {
            return localStorage.getItem(value)
        },
        init: function () {
            util.Register();
            util.Login();
            //   util.publicEvent();
        },
        publicEvent: function () {
            var tipsBox = document.getElementById('tipsBox'),
                overLay = document.getElementById('overlay');
            var closeX = tipsBox.getElementsByTagName('i')[0];
            var hideDom = function () {
                overLay.style.display = 'none';
                tipsBox.style.display = 'none';
            };
            closeX.onclick = hideDom;
            overLay.onclick = hideDom;
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
            var phonenum = doc.getElementById('regPhone'),
                password = doc.getElementById('regPwd'),
                repassword = doc.getElementById('regComfirmPwd'),
                validCodeIpt = doc.getElementById('validCode-Ipt');
            var alertPopup = doc.getElementById('alertPopup'),
                agreeProtrol = doc.getElementById('agreeProtrol');
            var hideTips = function () {
                alertPopup.style.display = 'none';
            };
            this.regSendMsm(60);
            agreeProtrol.addEventListener('click', function () {
                var isCheck = this.checked;
                if (isCheck) {
                    regBtn.removeAttribute('disabled');
                } else {
                    regBtn.setAttribute('disabled', 'true')
                }
            });
            phonenum.addEventListener('focus', hideTips);
            password.addEventListener('focus', hideTips);
            repassword.addEventListener('focus', hideTips);
            regBtn.addEventListener('click', function () {
                phonenum.value = phonenum.value.trim();
                var phonenumValue = phonenum.value,
                    passwordValue = password.value,
                    repasswordValue = repassword.value,
                    validCodeIptValue = validCodeIpt.value,
                    message, sendData;
                var valitor = new Validator();
                valitor.add(state.isNotEmpty(phonenumValue, '用户名不能为空'));
                valitor.add(state.isMinLength(phonenumValue, 11, '手机号码长度为11位'));
                valitor.add(state.accountFormat(phonenumValue, '手机号码格式不正确'));
                valitor.add(state.isNotEmpty(validCodeIptValue, '验证码不能为空'));
                valitor.add(state.isMinLength(validCodeIptValue, 4, '验证码长度为4位'));
                valitor.add(state.isNumberFormat(validCodeIptValue, '验证码格式不正确'));
                valitor.add(state.isNotEmpty(passwordValue, '密码不能空'));
                valitor.add(state.isMinLength(passwordValue, 6, '密码字数不小于6位'));
                valitor.add(state.isNotEmpty(repasswordValue, '确认密码不能空'));
                valitor.add(state.isMinLength(repasswordValue, 6, '确认密码字数不小于6位'));
                valitor.add(state.isSame(passwordValue, repasswordValue, '前后密码不一致'));
                message = util.Valid(valitor.cache);
                if (message) {
                    state.warnTips(message);
                    return false;
                }
                sendData = {"username": phonenumValue, "password": passwordValue, "password_confirmation": repasswordValue};
                if (phonenumValue.length === 0) {
                    sendData['type'] = ''
                }
                if (state.numberExp.test(phonenumValue)) {
                    sendData['type'] = 1;
                }
                /*else {
                               sendData['type'] = 2;
                           }*/
                $.ajax({
                    beforeSend: function () {

                    },
                    url: state.url + 'reg',
                    type: 'POST',
                    data: sendData,
                    dataType: 'json',
                    success: function (res) {
                        if (res) {
                            if (res.code === 2000) {
                                state.warnTips('注册成功', 1);
                                util.regToLogin(phonenumValue, passwordValue)
                                /*  setTimeout(function () {
                                      location.href = './login.html';
                                  }, 3000)*/
                            } else if (res.code === 4000) {
                                state.warnTips('注册信息不完整');
                                console.log(res.code);
                            } else if (res.code === 5011) {
                                state.warnTips('同一个IP，每隔3分钟后才能注册');
                            } else {
                                state.warnTips('注册失败');
                            }
                        }

                    },
                    error: function (error) {
                        console.log(error)
                    }
                })


            })
        },
        Login: function () {
            var doc = document;
            var loginBtn = doc.getElementById('loginBtn'),
                sendData = {};
            var phonenum = doc.getElementById('loginPhone'),
                password = doc.getElementById('loginPwd'),
                tick = doc.getElementById('remember-tick');
            var getRem = localStorage.getItem('isRememberPhone');

            if (loginBtn === null) {
                return
            }
            if (getRem) {
                phonenum.value = getRem;
                tick.checked = true;
            }
            $('#loginPhone,#loginPwd').off('focus').on('focus', function () {
                $('#alertPopup').hide();
            });
            loginBtn.addEventListener('click', function () {
                phonenum.value = phonenum.value.trim();
                var phonenumValue = phonenum.value,
                    passwordValue = password.value,
                    message/*,
                isRememberAccount = tick.checked*/;
                var valitor = new Validator();
                valitor.add(state.isNotEmpty(phonenumValue, '帐号不能空'));
                valitor.add(state.isMinLength(phonenumValue, 6, '帐号字数不小于6位'));
                valitor.add(state.accountFormat(phonenumValue, '手机号码格式不正确', '帐号格式不正确'));
                valitor.add(state.isNotEmpty(passwordValue, '密码不能空'));
                valitor.add(state.isMinLength(passwordValue, 6, '密码字数不小于6位'));
                message = util.Valid(valitor.cache);
                if (message) {
                    state.warnTips(message);
                    return false;
                }
                sendData = {
                    "username": phonenumValue,
                    "password": passwordValue,
                    "device": phonenumValue,
                    "device_info": "windows"
                };
                if (phonenumValue.length === 0) {
                    sendData['type'] = '';
                } else if (state.numberExp.test(phonenumValue)) {
                    sendData['type'] = 1;
                } else {
                    sendData['type'] = 2;
                }
                $.ajax({
                    url: state.url + 'login',
                    type: 'POST',
                    dataType: 'json',
                    data: sendData,
                    success: function (res) {
                        if (res) {
                            if (res.code === 2000) {
                                var isToken = util.getStorage('token');
                                util.setLoginStorage(res.token, res.data);
                                /*if (isRememberAccount) {
                                    localStorage.setItem('isRememberUser', phonenumValue);
                                } else {
                                    delete localStorage.isRememberUser;
                                }*/
                                location.href = './index.html';
                            }
                            else if (res.code === 4000) {
                                state.warnTips('登录信息不完整');
                            }
                            else if (res.code === 6000) {
                                state.warnTips('用户名或密码不正确');
                            } else {
                                state.warnTips('登录失败');
                            }
                        }

                    },
                    error: function (error) {
                        console.log(error)
                    }

                })
            })
        },
        regSendMsm: function (seconds) {
            var interVal = 1000;
            var validCodeIpt = document.getElementById('validCode-Ipt'),
                getValidCodeBtn = document.getElementById('getValidCode-Btn'),
                phoneNum = document.getElementById('regPhone');
            var initBtnTxt = getValidCodeBtn.innerText;
            var Timer, sendTime;
            var countTimeTxt = function (dataCount, interVal) {
                var btnStatusTxt = '秒后重发';
                getValidCodeBtn.innerText = dataCount + btnStatusTxt;
                sendTime = setInterval(function () {
                    --dataCount;
                    getValidCodeBtn.innerText = dataCount + btnStatusTxt;
                    if (dataCount === 0) {
                        clearInterval(sendTime);
                        getValidCodeBtn.innerText = initBtnTxt;
                    }
                }, interVal);
            };
            var changeSatus = function (boolean) {
                if (boolean) {
                    getValidCodeBtn.setAttribute('disabled', boolean + '');
                    countTimeTxt(seconds, interVal);
                } else {
                    getValidCodeBtn.removeAttribute('disabled');
                }
                return boolean;
            };
            var getCodeCount = function () {
                var isSend = false;
                return function () {
                    var valitor = new Validator(), message;
                    valitor.add(state.isNotEmpty(phoneNum.value, '用户名不能为空'));
                    valitor.add(state.isMinLength(phoneNum.value, 6, '用户名字数不小于6位'));
                    valitor.add(state.accountFormat(phoneNum.value, '手机号码格式不正确'));
                    message = util.Valid(valitor.cache);
                    if (message) {
                        state.warnTips(message);
                        return false;
                    }
                    if (!isSend) {
                        isSend = changeSatus(true);
                        Timer = setTimeout(function () {
                            isSend = changeSatus(false);
                        }, seconds * interVal);
                        $.ajax({
                            url: state.smsApi + 'sms',
                            type: 'GET',
                            data: {'phone': phoneNum.value},
                            success: function (res) {
                                if (res) {
                                    if (res.code === 2000) {
                                        state.warnTips('验证码已发送到你手机', 1);

                                    }
                                }
                            }
                        })

                    }
                }
            };
            getValidCodeBtn.addEventListener('click', getCodeCount());

        },
        regToLogin: function (phonenumValue, passwordValue) {
            var sendData = {
                "username": phonenumValue,
                "password": passwordValue,
                "device": phonenumValue,
                "device_info": "windows",
                "type": 1
            };
            $.ajax({
                url: state.url + 'login',
                type: 'POST',
                dataType: 'json',
                data: sendData,
                success: function (res) {
                    if (res) {
                        if (res.code === 2000) {
                            util.setLoginStorage(res.token, res.data);
                            console.log('登录成功');
                            /* if (isRememberAccount) {
                                 localStorage.setItem('isRememberUser', phonenumValue);
                             } else {
                                 delete localStorage.isRememberUser;
                             }*/
                            /*location.href = './index.html';*/
                        }/*
                    else if (res.code === 4000) {
                        state.warnTips('登录信息不完整');
                    }
                    else if (res.code === 6000) {
                        state.warnTips('用户名或密码不正确');
                    }*/ else {
                            state.warnTips('登录失败');
                        }
                    }

                },
                error: function (error) {
                    console.log(error)
                }

            })

        }
    }
;
util.init();






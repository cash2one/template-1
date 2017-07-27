var token = utils.getStorage('token');
var cornet = utils.getStorage('cornet');
var doc = document;
var personSetting = {
    init: function () {
        this.getBaseInfo();
        this.setAvatar();
        this.setAdress();
        this.saveBaseInfo();
        this.bindEvent();
    },
    proCache: null,
    setClassExp: function (className) {
        return new RegExp("\\s*" + className + "\\s*");
    },
    bindEvent: function () {
        var phoneNumIpt = doc.getElementById('phoneNumIpt');
        var passwordIpt = doc.getElementById('passwordIpt');
        var modifyBtn = doc.querySelector('modifyBtn');
        var modifyPhone = doc.getElementById('modifyPhone');
        var modifyPassword = doc.getElementById('modifyPassword');

        function modifyText(text1, text2, className, dom) {
            var dataCount = 0;
            var classExpET = new RegExp('\\s*' + className + '\\s*');
            return function () {
                dataCount++;
                if (dataCount % 2 === 0) {
                    dom.setAttribute('disabled', 'true');
                    dom.className += ' ' + 'u-border-none';
                    this.innerText = text1;
                } else {
                    dom.removeAttribute('disabled');
                    dom.className = dom.className.replace(classExpET, '');
                    this.innerText = text2;
                }
            }
        }

        modifyPhone.addEventListener('click', modifyText('修改', '锁定', 'u-border-none', phoneNumIpt));
        modifyPassword.addEventListener('click', modifyText('修改', '锁定', 'u-border-none', passwordIpt));
    },
    eachProvinceData: function (data) {
        var str = '';
        var proGroup = data.provincesList;
        for (var i = 0; i < proGroup.length; i++) {
            str += '<li><a href="#" >' + proGroup[i].Name + '</a></li>'
        }
        return str;
    },
    getCityLib: function (drowProvince) {
        if (!personSetting.proCache) {
            $.ajax({
                url: '../src/js/allprovinces.json',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        personSetting.proCache = data;
                        drowProvince.innerHTML = personSetting.eachProvinceData(data);
                    }
                }
            })
        } else {
            drowProvince.innerHTML = personSetting.eachProvinceData(personSetting.proCache);
        }
    },
    getCity: function (defaulProvince, drowCity, targetText, defaultCity) {
        var strData, proGroup = personSetting.proCache.provincesList, str = '';
        var deText = targetText || defaulProvince.innerText;
        for (var i = 0; i < proGroup.length; i++) {
            strData = proGroup[i];
            if (strData.Name === deText) {
                for (var j = 0; j < strData.Citys.length; j++) {
                    if (j === 0) {
                        if (defaultCity) {
                            defaultCity.innerText = strData.Citys[0].Name;
                        }
                    }
                    str += '<li><a href="#" >' + strData.Citys[j].Name + '</a></li>'
                }
                drowCity.innerHTML = str;
                break;
            }
        }

    },
    getBaseInfo: function () {

        var phoneNumIpt = doc.getElementById('phoneNumIpt');
        var nickName = doc.getElementById('nickName');
        var avatarImgTag = doc.getElementById('avatarImgTag');
        $.ajax({
            url: utils.url + '/user/getinfo',
            type: 'GET',
            data: {'token': token, 'cornet': cornet},
            success: function (res) {
                var imgurl;
                if (res) {
                    if (res.data) {
                        if (res.data.pic) {
                            imgurl = utils.base + 'upload/' + res.data.pic;
                            avatarImgTag.setAttribute('src', imgurl);
                        }
                        personSetting.setChecked(res.data.sex);
                        nickName.value = utils.clearNull(res.data.nickname);
                        phoneNumIpt.value = res.data.phone;
                        personSetting.duleAress(res.data.address);
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    setAvatar: function () {
        var setbtn = doc.getElementById('setAvatarBtn'),
            fileInput = doc.getElementById('fileAvatar'),
            img = doc.getElementById('avatarImg');
        var fileHidden = doc.getElementById('fileHidden');
        var form = doc.getElementById('form1');

        setbtn.addEventListener('click', function () {
            fileInput.click();
        });
        fileInput.addEventListener('change', function () {
            var fileInputT = doc.getElementById('fileAvatar');

            /*   var imgPath = window.URL.createObjectURL(fileInputT.files[0]);
               var avatarImgTag = doc.getElementById('avatarImgTag');
               avatarImgTag.src = imgPath;*/
        });
        upLoadFile.onclick = function () {
            var fileInputT = doc.getElementById('fileAvatar');
            var avatarImgTag = doc.getElementById('avatarImgTag');
            $("#avatarForm").ajaxSubmit({
                type: "POST",
                dataType: "json",
                url: utils.url + '/user/headpic',
                data: {"cornet": cornet, "token": token, "image": "pic"},
                success: function (res) {
                    if (res) {
                        if (res.code === 2000) {
                            avatarImgTag.setAttribute('src', utils.base + res.data.path);
                        }
                    }
                },
                error: function (error) {
                    console.log(error);
                },
                async: true

            });
        }
    },
    setAdress: function () {
        var drowProvince = doc.getElementById('drop-province'),
            drowCity = doc.getElementById('drop-city'),
            defaulProvince = doc.getElementById('defaulProvince'),
            defaultCity = doc.getElementById('defaultCity'),
            selectCity = doc.getElementById('selectCity');

        personSetting.getCityLib(drowProvince);
        drowProvince.on('click', function () {
            var target = event.target;
            if (target.tagName === 'A') {
                personSetting.getCity(defaultCity, drowCity, target.innerText, defaultCity)
            }
        });
        selectCity.on('click', function () {
            personSetting.getCity(defaulProvince, drowCity)
        });



        drowProvince.on('mousewheel',function (e) {
            e = e || window.event;
            console.log(e.wheelDelta);
            this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
            e.preventDefault()
        });


    },
    duleAress: function (value) {
        if (value === '') {
            return
        }
        var itemArr = value.split('-');
        var detailAdress = doc.getElementById('detailAdress'),
            defaulProvince = doc.getElementById('defaulProvince'),
            defaultCity = doc.getElementById('defaultCity');
        defaulProvince.innerText = itemArr[0];
        defaultCity.innerText = itemArr[1];
        detailAdress.value = itemArr[2] ? itemArr[2] : '';

    },
    getChecked: function (className) {
        var arrRadio = doc.querySelectorAll(className),
            radioItem;
        for (var i = 0; i < arrRadio.length; i++) {
            radioItem = arrRadio[i];
            if (radioItem.checked) {
                return radioItem;
            }
        }
    },
    setChecked: function (value) {
    var arrRadio = doc.querySelectorAll('.u-per-label input'),
        radioItem;
    for (var i = 0; i < arrRadio.length; i++) {
        radioItem = arrRadio[i];
        switch (value) {
            case 1:
                arrRadio[0].setAttribute('checked', 'true');
                break;
            case 2:
                arrRadio[1].setAttribute('checked', 'true');
                break;
            case 0:
                arrRadio[2].setAttribute('checked', 'true');
                break;
        }

    }

},
    saveBaseInfo: function () {
        var saveBtn = doc.getElementById('saveBtn');
        saveBtn.addEventListener('click', function () {
            var nickName = doc.getElementById('nickName'),
                phoneNumIpt = doc.getElementById('phoneNumIpt');
            var getSex = this.getChecked('.u-per-label input[type="radio"]').getAttribute('data-sex');
            var pic = doc.getElementById('avatarImgTag');
            var address = [], addressData;
            var defaulProvince = doc.getElementById('defaulProvince');
            var defaultCity = doc.getElementById('defaultCity');
            var detailAdress = doc.getElementById('detailAdress');
            var infoNickname = doc.getElementById('infoNickname');
            address.push(defaulProvince.innerText);
            address.push(defaultCity.innerText);
            if (detailAdress.innerText !== '') {
                address.push(detailAdress.innerText);
            }
            addressData = address.join('-');
            var sendData = {
                'token': token,
                'cornet': cornet,
                'address': addressData,
                'phone': phoneNumIpt.value,
                'nickname': nickName.value,
                'sex': getSex
            };
            $.ajax({
                url: utils.url + '/user/editinfo',
                type: 'POST',
                data: sendData,
                success: function (res) {
                    if (res) {
                        if (res.code === 2000) {
                            for (var key in sendData) {
                                if (key !== 'token' && key !== 'cornet') {
                                    localStorage.setItem(key, sendData[key])
                                }
                            }
                            infoNickname.innerText = localStorage.nickname;
                            alert('保存成功')
                        } else {
                            alert('保存失败')
                        }
                    }
                },
                error: function (error) {
                    var msg = JSON.parse(error.responseText);
                    //调用模态框
                    console.log(msg);
                }

            })


        })


    }

};
personSetting.init();






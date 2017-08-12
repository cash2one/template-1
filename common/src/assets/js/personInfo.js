(function () {

    if (window.jQuery) {
        $.fn.change_color = function (classname) {
            $(this).addClass(classname).siblings().removeClass(classname)
        };
        $.fn.show_hideOthers = function (classname) {
            $(this).show().siblings(classname).hide()
        }
    } else {
        return;
    }
    var personInfo = {
        init: function () {
            this.layoverUI();
            this.baseInfo();
        },
        setChecked: function (value) {
            var arrRadio = document.querySelectorAll('.u-per-label input');
            switch (value) {
                case 1:
                    arrRadio[0].checked=true;
                    break;
                case 2:
                    arrRadio[1].checked=true;
                    break;
                case 3:
                    arrRadio[2].checked=true;
                    break;
            }
        },
        layoverUI: function () {
            var $selectMenu = $('#selectMenu'),
                $baseInfo = $('#baseInfo'),
                $modifyPhoneInfo = $('#modifyPhoneInfo'),
                $modifyPassword = $('#modifyPassword'),
                $personInteresting = $('#personInteresting'),
                $messageCenter = $('#messageCenter'),
                $changeAvatarBtn = $('#changeAvatarBtn'),
                $modifyInfoButton = $('#modifyInfoButton'),
                $beforeEditingStatus = $('#beforeEditingStatus'),
                $inEditingStatus = $('#inEditingStatus'),
                $avatarDiv = $('#avatarDiv'),
                $saveInfoBtn = $('#saveInfoBtn'),
                $returnBack = $('#returnBack');
            $returnBack.on('click', function () {
                $modifyInfoButton.show();
                $beforeEditingStatus.show();
                $inEditingStatus.hide();
            });
            $changeAvatarBtn.on('click', function () {
                $avatarDiv.show();
            });
            $modifyInfoButton.on('click', function () {
                $(this).hide();
                $beforeEditingStatus.hide();
                $inEditingStatus.show();
            });
            $changeAvatarBtn.on('click', function () {
                $avatarDiv.show_hideOthers('.plate-right')
            });
            $selectMenu.on('click', 'li', function () {
                $(this).change_color('f-select');
                var index = $(this).index();
                switch (index) {
                    case 0:
                        $baseInfo.show_hideOthers('.plate-right');
                        break;
                    case 1:
                        $modifyPhoneInfo.show_hideOthers('.plate-right');
                        break;
                    case 2:
                        $modifyPassword.show_hideOthers('.plate-right');
                        break;
                    case 3:
                        $messageCenter.show_hideOthers('.plate-right');
                        break;
                }
            })

        },
        baseInfo: function () {
            if (!utils.userinfo) {
                return
            }

            var $showUserId = $('#showUserId'),
                $showNickname = $('#showNickname'),
                $sexInfo = $('#sexInfo'),
                $showBirthday = $('#showBirthday'),
                $showEdu = $('#showEdu'),
                $showVocation = $('#showVocation'),
                $showAreaZone = $('#showAreaZone'),
                $onlineTime = $('#onlineTime'),
                $showRegTime = $('#showRegTime'),
                $lastLoginTime = $('#lastLoginTime'),
                $viewUserId=$('#viewUserId'),
                $nickNameIpt=$('#nickNameIpt');
            var info = utils.userinfo;
            var tosex = '',birthday, tempTimeA,tempTimeB,regtimeStr,logintimeStr,onlinetimeStr;
            switch (+info.sex) {
                case 1:
                    tosex = '男';
                    break;
                case 2:
                    tosex = '女';
                    break;
                case 3:
                    tosex = '保密';
                    break;

            }
            if(info.birthdate===0){
                birthday=''
            }
            $showUserId.text(info.cornet);$viewUserId.text(info.cornet);
            $showNickname.text(info.nickname);$nickNameIpt.val(info.nickname);

            $sexInfo.text(tosex);personInfo.setChecked(tosex);

            $showBirthday.text(birthday);
            $showEdu.text(info.education);
            $showVocation.text(info.industry);
            $showAreaZone.text(info.address);
            tempTimeA=new utils.baseTime(info.reg_time*1000);
            tempTimeB=new utils.baseTime(info.c_time*1000);
            regtimeStr=tempTimeA.year+'-'+tempTimeA.months+'-'+tempTimeA.day;
            logintimeStr=tempTimeB.year+'-'+tempTimeB.months+'-'+tempTimeB.day;
            onlinetimeStr=(info.online_time/(60*60)).toFixed(2)+'小时';
            $onlineTime.text(onlinetimeStr);
            $showRegTime.text(regtimeStr);
            $lastLoginTime.text(logintimeStr);
        }
    };
    personInfo.init()

})();
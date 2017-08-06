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
    toggleOuterTabs: function (element,conEL) {
        var el = document.querySelector(element + ' ' + 'ul');
        if (el === null) {
            return;
        }
        var containElement=conEL || '.m-matches-container';
        var children = el.children,
            containers = document.querySelectorAll(containElement),
            className = 'u-title-active',
            classExp = this.setClassExp(className);
        el.addEventListener('click', function (e) {
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
        el_ul.addEventListener('click', function (e) {
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
        getUL.addEventListener('click', function (e) {
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

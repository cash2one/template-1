var webconfig = {
    init: function () {
    /*    this.OutTabs('.m-matches-title');
        this.toggleTabId('matchesAll');
        this.toggleTabId('matchedTabSecond');
        this.toggleTabId('matchedTabThree');*/
    },
    OutTabs: function (element) {
        var el = document.querySelector(element + ' ' + 'ul');
        if (el === null) {
            return;
        }
        var children = el.children;
        var containers = document.querySelectorAll('.m-matches-container');
        el.addEventListener('click', function (e) {
            var tem = e.target,
                tempchild, tempcon;
            if (tem.tagName === 'LI') {
                for (var i = 0; i < children.length; i++) {
                    tempchild = children[i];
                    tempcon = containers[i];
                    if (tem === tempchild) {
                        tempchild.className = 'u-title-active';
                        tempcon.style.display = 'block';
                    } else {
                        tempchild.className = '';
                        tempcon.style.display = 'none';
                    }
                }
            }
        })
    },
    toggleTabId: function (parentId) {
        var el = document.getElementById(parentId);
        if (el === null) {
            return;
        }
        var el_ul = el.querySelector('ul');
        var liArr = el.querySelectorAll('.m-matches-container-title li');
        el_ul.addEventListener('click', function (e) {
            var tem = e.target;
            if (tem.tagName === 'LI') {
                for (var i = 0; i < liArr.length; i++) {
                    if (e.target === liArr[i]) {
                        liArr[i].className = 'u-child-active';
                    } else {
                        liArr[i].className = '';
                    }
                }
            }
        })
    }
};
var indexdata = {};







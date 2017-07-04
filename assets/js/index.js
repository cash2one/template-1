var webconfig={
    toggleTabs:function (element,classname,container) {
        var tab=document.querySelector(element),
             tabli=tab.children,
             content,index=0;
        if(container===1){
            index=1;
            content= document.getElementsByClassName('m-matches-container');
        }
        tab.addEventListener('click',function (e) {
            var tem=e.target;
            if (tem.tagName === 'LI') {
                for(var i=0;i<tabli.length;i++ ){
                    if(e.target==tabli[i]){
                        tabli[i].className=classname;
                       if(index){
                           content[i].style.display='block';
                       }
                    }else{
                        tab.children[i].className='';
                        if(index){
                            content[i].style.display='none';
                        }

                    }
                }
            }
        });
    }
};
$('.dropdown-menu').on('click','a',function () {
    var _this=$(this),
        temp=$(this).text(),
        target=_this.parents('.dropdown-menu');
    target.prev().children('.m-info-list-text').text(temp);
});

/*webconfig.toggleTabs('.m-matches-container-title ul','u-child-active');
webconfig.toggleTabs('.m-matches-title ul','u-title-active',1);*/



   (function () {
        var filterLI1=$('#hero_filter li').eq(0);
        var filterLI2=$('#hero_filter li').eq(1);
        var selectArr= $('#db_ListsBox a');
        var eventFilter=function (index,_this) {
            var temp=$(_this).text(),
                all='全部';
            var select=$('#hero_filter li').eq(index).find('.select').text();
            $(_this).addClass('select').siblings().removeClass('select');
            for(var i=0;i<selectArr.length;i++){
                var catlog= selectArr[i].getAttribute('catlog');
                if(select===all){
                    if(catlog.indexOf(temp)>=0){
                        selectArr[i].style.display='block';
                    }else if(temp===select){
                        selectArr.show();
                    }else{
                        selectArr[i].style.display='none';
                    }

                }else if(temp===all){
                    if(catlog.indexOf(select)>=0){
                        selectArr[i].style.display='block';
                    }else{
                        selectArr[i].style.display='none';
                    }
                }
                else{
                    if(catlog.indexOf(temp)>=0&&catlog.indexOf(select)>=0){
                        selectArr[i].style.display='block';
                    }else{
                        selectArr[i].style.display='none';
                    }
                }
            }

        };
        filterLI1.on('click','p',function () {
            eventFilter(1,this);
        });
        filterLI2.on('click','p',function () {
            eventFilter(0,this);
        })
    })();
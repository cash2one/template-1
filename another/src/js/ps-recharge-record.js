var rechargeRec={
    
    getInfo:function () {
        var doc=document;
        var recordList=doc.getElementById('recordList'),
            token=utils.getStorage('token'),
            cornet=utils.getStorage('cornet');
        var str='';
        $.ajax({
            url: utils.url+'/user/rechargelist',
            type: 'GET',
            dataType: 'json',
            data:{'token':token,'cornet':cornet},
            success:function (res) {
                var mdata;
                var timeT,timeStr='',payType='';
                if(res){
                    if(res.code===2000){
                        mdata=res.data;
                        for(var i=0;i<mdata.length;i++){
                            timeT=new utils.baseTime(mdata[i].addtime*1000);
                            timeStr=''+timeT.year+'/'+timeT.month+'/'+timeT.day+' '+ timeT.hours+':'+timeT.minutes;
                            switch (mdata[i].payment){
                                case 'alipay':
                                    payType='支付宝';
                                    break;
                                case 'wechat':
                                    payType='微信';
                                    break;
                            }
                          str+='<tr><td><p>'+timeStr+'</p></td><td>'+ mdata[i].number+'</td><td>'+ payType+'</td></tr>'
                        }
                        recordList.innerHTML=str;
                    }
                }



                
            },
            error:function (error) {
                console.log(error);
            }
        })


    }
    
};
rechargeRec.getInfo()
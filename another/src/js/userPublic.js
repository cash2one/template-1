var userPublic={
     init:function () {
         this.render();
         this.tabsChange();
     },
     tabsChange:function () {
         var search=location.search,
              str=/tabs=(\d)/,
              getTabNum=str.exec(search)&&str.exec(search)[1];
         var menuLi=document.querySelectorAll('.u-tabs-menu li');
              switch (+getTabNum){
                  case 1:
                      menuLi[0].className='u-menu-active';
                      break;
                  case 2:
                      menuLi[1].className='u-menu-active';
                      break;
                  case 3:
                      menuLi[2].className='u-menu-active';
                      break;
                  case 4:
                      menuLi[3].className='u-menu-active';
                      break;
                  case 5:
                      menuLi[4].className='u-menu-active';
                      break;
              }

     },
     render:function () {
      var doc=document;
          var infoHeadImg=doc.getElementById('infoHeadImg'),
              infoNickname=doc.getElementById('infoNickname'),
              infoLevel=doc.getElementById('infoLevel'),
              cornetId=doc.getElementById('cornetId'),
              goldCounts=doc.getElementById('goldCounts');
          var getToken=localStorage.getItem('token');
          if(!getToken){
              location.href='./index.html';
              return ;
          }
          if(infoHeadImg===null){
              return;
          }
          if(utils.getStorage('pic')){
              infoHeadImg.src=utils.getStorage('pic');
          }
         infoNickname.innerText=utils.getStorage('nickname');
         infoLevel.innerText=utils.getStorage('vip_lv');
         cornetId.innerText=utils.getStorage('cornet');
         goldCounts.innerText=utils.getStorage('gold');
     }
};
userPublic.init();
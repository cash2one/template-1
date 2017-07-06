$('.dropdown-menu').on('click','a',function () {
    var _this=$(this),
        temp=$(this).text(),
        target=_this.parents('.dropdown-menu');
    target.prev().children('.m-info-list-text').text(temp);
});

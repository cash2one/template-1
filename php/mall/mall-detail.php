<!DOCTYPE html>
<html>
<head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <title>Index</title>
    <?php include('header/headtag.php') ?>
</head>
<body>
<?php include ('header/header.php') ?>
<div class="g-wrap f-oh">
    <div class="g-mall-left f-fl">
        <div class="m-mall-user-info">
            <div class="m-mall-user-info-header f-oh">
                <div class="m-mall-user-avatar f-fl">
                    <img src="../assets/img/carousel/855695.jpg" alt="">
                </div>
                <div class="m-mall-info-block f-fr">
                    <div class="m-mall-info-nickname">某某玩家</div>
                    <div class="m-mall-info-property f-oh">
                        <div class="u-mall-diamond f-fl">
                            <i></i>
                            <span>100</span>
                        </div>
                        <div class="u-mall-gold f-fl">
                            <i></i>
                            <span>100</span>
                        </div>
                        <a href="#" class="u-btn-recharge f-fr"  >充值</a>
                    </div>
                </div>
            </div>
            <div class="m-mall-user-record">
                <a href="#" class="u-recharge-record">
                    <i class="u-icon-recharge"></i>
                    <span>充值记录</span>
                </a>
                <a href="#" class="u-exchange-record">
                    <i class="u-icon-exchange"></i>
                    <span>兑换记录</span>
                </a>
            </div>
            <div class="m-mall-search">
                <input type="text" title="" class="u-mall-search-input" placeholder="请输入关键字搜索"/>
                <button type="button" class="m-mall-search-btn"></button>
            </div>
            <div class="m-mall-search-type">
                <div class="m-mall-title">
                    选择物品类型
                </div>
                <ul class="m-mall-choose-type">
                    <li>全部</li>
                    <li>实物</li>
                    <li>充值缴费</li>
                </ul>
            </div>
            <div class="m-mall-search-type">
                <div class="m-mall-title">
                    选择物品价格区间
                </div>
                <ul class="m-mall-price-type">
                    <li>0-1000</li>
                    <li>1000-5000</li>
                    <li>5000-10000</li>
                    <li>10000以上</li>
                </ul>
            </div>
        </div>

    </div>
    <div class="g-mall-right f-fr">
        <div class="g-mall-details">
            <div class="m-list-common-title">
                <i></i>
                <h4>商品详情</h4>
            </div>
            <div class="m-mall-details-info f-oh">
                <img src="" alt="" class="u-mall-details-pic f-fl">
                <div class="m-mall-details-text f-fl">
                    <h4>雪鹰之琴</h4>
                    <p>价格：<span class="u-color-price" >10000</span>金币</p>
                    <div class="u-mall-counts">
                        <span>数量：</span>
                        <button type="button" class="btn-default u-minus-out">
                            <span class="glyphicon-minus u-mall-minus" ></span>
                        </button>
                        <input type="text" title="" class="u-amount-input" value="1" >
                        <button type="button" class="btn-default u-minus-out">
                            <span class="glyphicon-plus u-mall-plus" ></span>
                        </button>
                    </div>
                    <button type="button" class="btn btn-primary u-btn-exchange" >
                        确认兑换
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include ('footer/footer.php') ?>
<div class="private-depart">
</div>
</body>
</html>
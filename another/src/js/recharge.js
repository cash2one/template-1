(function () {
    var doc = document;
    var payMoney = doc.getElementById('payMoney'),
        goldAmount = doc.getElementById('goldAmount'),
        amountOpts = doc.getElementById('amountOpts'),
        otherAmount = doc.getElementById('otherAmount'),
        otherAmountIpt = doc.getElementById('otherAmountIpt'),
        goldCounts = doc.getElementById('goldCounts'),
        goldLeft = doc.getElementById('goldLeft'),
        recAccount = doc.getElementById('recAccount'),
        charmValue = doc.getElementById('charmValue');
    var getToken = localStorage.getItem('token');
    var getCornet = localStorage.getItem('cornet');
    var recharge = {
        init: function () {
            this.otherInput();
            this.showAmount();
            this.sendInfo();
        },
        goldPercent: utils.getStorage('gold_ratio'),
        charmPercent: utils.getStorage('charm_ratio'),
        exchangeGold: function (value) {
            return value * recharge.goldPercent;
        },
        exchangeCharm: function (value) {
            return value * recharge.charmPercent
        },
        otherInput: function () {
            otherAmount.on('click', function () {
                otherAmountIpt.style.display = 'block';
                otherAmountIpt.focus();
            });
            otherAmountIpt.on('blur', function () {
                otherAmountIpt.style.display = 'none';
            });
            otherAmountIpt.on('keyup', function () {
                if (this.value && this.value > 0) {
                    otherAmount.innerText = this.value;
                } else {
                    otherAmount.innerText = '1';
                }
                payMoney.innerText = otherAmount.innerText;
                goldAmount.innerText = payMoney.innerText * recharge.goldPercent;
                charmValue.innerText = payMoney.innerText * recharge.charmPercent;
            });
            otherAmountIpt.on('input', function () {
                this.value = this.value.replace(/^0+|[^\d]+/, '')
            });
        },
        showAmount: function () {
            var gold = utils.getStorage('gold'),
                phone = utils.getStorage('phone');
            goldLeft.innerText = gold;
            recAccount.innerText = phone;
            charmValue.innerText = payMoney.innerText * recharge.charmPercent;
            goldAmount.innerText = payMoney.innerText * recharge.goldPercent;
            amountOpts.on('click', function () {
                var target = event.target;
                if (target.tagName === 'LI' && target.id !== 'otherAmount') {
                    payMoney.innerText = target.innerText;
                    goldAmount.innerText = payMoney.innerText * recharge.goldPercent;
                    charmValue.innerText = payMoney.innerText * recharge.charmPercent;
                }
            });
        },
        sendInfo: function () {
            var rechargeBtn = doc.getElementById('rechargeBtn');
            var successTips = utils.setWarnTips('充值成功');
            var failTips = utils.setWarnTips('充值失败', 1);
            rechargeBtn.on('click', function () {
                var getPay = doc.querySelector('#payMethods .u-selected ');
                var getPayType = getPay.getAttribute('data-paytype');
                var getAmount = amountOpts.querySelector('.u-selected');
                var getAmountValue = +getAmount.innerText;
                $.ajax({
                    url: utils.url + '/user/recharge',
                    type: 'POST',
                    data: {'token': getToken, 'cornet': getCornet, 'type': getPayType, 'number': getAmountValue},
                    success: function (res) {
                        if (res) {
                            if (res.code === 2000) {
                                localStorage.gold = (+localStorage.gold) + recharge.exchangeGold(getAmountValue);
                                localStorage.charm = (+localStorage.charm) + recharge.exchangeCharm(getAmountValue);
                                goldLeft.innerText = localStorage.gold;
                                goldCounts.innerText = localStorage.gold;
                                successTips();
                            } else {
                                failTips();
                            }
                        }
                    },
                    error: function (error) {

                    }

                })
            })


        }
    };
    recharge.init();
})();
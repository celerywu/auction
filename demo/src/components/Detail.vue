<template>
  <div class="">
    <div class="head">
      <img src="https://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000690105195_2_800x800.jpg" alt="商品url" class="head-img">
      <div class="head-foot">
        <span class="head-foot-status"><span>{{countdown}}</span>秒后结束</span> <span class="auction-status">{{auctionStatus}}</span>
      </div>
    </div>
    <div class="headinfo">
      <h3 class="headinfo-title">Apple iPhone 8 Plus 64GB 深空灰色 移动联通电信4G手机</h3>
      <div class="headinfo-desc">15层匠心工艺打造的3D曲面极光玻璃，在不同光线下折射出炫美变化的极光。机器和工艺师的双重光学检测，让光赋予了颜色新的活力。</div>
      <div class="headinfo-price">
        <span class="headinfo-now">当前价(GXS)：</span>
        <span class="headinfo-nowpay">{{currentPrice}}</span>
      </div>
      <div class="headinfo-paybox">已出价 <span class="headinfo-paybox-number">{{priceNum}}</span> 次</div></div>
    <div class="record">
      <div class="record-head">
        <div class="record-head-title">出价记录</div>
        <div class="record-head-desc"></div>
      </div>
      <ul class="record-ul">
        <li class="record-li" v-for="item in record">
          <div class="record-li-name">{{item.name}}</div>
          <!--<div class="record-li-status">{{item.status}}</div>-->
          <div class="record-li-time">{{item.time}}</div>
          <!--<div class="record-li-prize">{{item.prize}}</div>-->
        </li>
        </ul>
    </div>
    <div class="foot"  v-show="dialogShow">
      <div class="foot-left">账户余额(GXS) {{currentGSX}}</div>
      <div class="foot-right" @click.prevent="submit()">参与竞拍</div>
    </div>
    <div class="paylog-wrap" v-show="paylogShow">
      <div class="mask"></div>
      <div class="paylog">
        <span class="paylog-close"@click="hidePaylogShow()" >关闭</span>
        <div class="paylog-title">填写竞拍价</div>
        <div class="paylog-time">
          <span>{{countdown}}</span>秒后结束 <span class="auction-status">{{auctionStatus}}</span>
        </div>
        <div class="paylog-operate">
          <div class="paylog-operate-box">
            <div class="paylog-operate-miuns"  @click.prevent="miuns()">
                <span>-</span>
            </div>
            <div class="paylog-operate-input">
              <input type="text" class="paylog-operate-input" v-model.numbe="currentAuctionGSX" placeholder="">
            </div>
            <div class="paylog-operate-pluse" @click.prevent="pluse()"><span>+</span></div>

          </div>
          <div class="paylog-operate-desc">您当前可参与竞拍公信币{{currentGSX}}</div></div>
        <div class="paylog-submit">
          <div class="paylog-submit-btn" @click.prevent="submit()">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      countdown:59,
      tempCountdown:59,
      auctionStatus:'正在进行中',
      priceNum:0, // 已出价次数
      currentPrice:0, //当前价格 单位元
      currentAuctionGSX:0, //当前竞拍价
      currentGSX:1, //用户剩余的公信币
      paylogShow:false,
      dialogShow:true,
      isStart:false,//是否有人拍过
      record:[{
        name:'',
        status:'',
        time:'',
        prize:''
      }]
    }
  },
  mounted: function () {
    var _this = this;
    this.$nextTick(() =>{
          var int = setInterval(function () {
          if (_this._data.countdown == 0) {
            //不可以再竞拍
//            _this._data.auctionStatus = '竞拍结束'
//            _this._data.dialogShow = false
//            $(".paylog-submit-btn").text("已流拍")
//            $(".paylog-submit-btn").addClass("disabled")
//            clearInterval(int)
            _this._data.auctionStatus = '竞拍结束'
            if(!_this._data.isStart){
              $(".foot-right").text("已流拍")
            }
            $(".head-foot-status").html("活动已结束")
            $(".foot-right").addClass("disabled")
            clearInterval(int)
          }else{
            _this._data.countdown --;
          }
        },1000)
    })
  },
  methods:{
    miuns() {
      var _this = this
      if(_this._data.currentAuctionGSX <= _this._data.currentPrice){
        return false
      }
      if(_this._data.currentAuctionGSX > 0){
        _this._data.currentAuctionGSX = (_this._data.currentAuctionGSX * 100 - 0.1 *100)/100
        _this._data.currentGSX = (_this._data.currentGSX * 100 + 0.1 *100)/100
      }

    },
    pluse() {
      var _this = this
      if(_this._data.currentGSX > 0){
        _this._data.currentAuctionGSX = (_this._data.currentAuctionGSX * 100 + 0.1 *100)/100
        _this._data.currentGSX = (_this._data.currentGSX * 100 - 0.1 *100)/100
      }
    },
    paylogShowFun(){
        this._data.paylogShow = !this._data.paylogShow
    },
    hidePaylogShow(){
      this._data.paylogShow = false
    },
    getNowFormatDate(){
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
    },
    submit(){
      if($(".foot-right").hasClass("disabled")){
          return
      }
//        if(!$(".foot-right").hasClass("disabled")){
//          if( this._data.currentAuctionGSX > 0){
//            this._data.currentPrice = this._data.currentAuctionGSX
//            this._data.paylogShow = false
//            this._data.countdown = 59
//            this._data.priceNum ++
//          }
        if( this._data.currentGSX > 0){
            this._data.isStart = true
            this._data.countdown = this._data.tempCountdown
            this._data.priceNum ++
            this._data.currentPrice = (this._data.currentPrice *100 + 0.05*100)/100
            this._data.currentGSX = (this._data.currentGSX * 100 - 0.1 *100)/100
            if(this._data.currentGSX == 0){
              $(".foot-left").text("当前账户公信币余额不足")
//              $(".foot-left").addClass("disabled")
              $(".foot-right").addClass("disabled")
            }
            console.log(this._data.currentGSX)
          }
//        }
//      if(this._data.record.length<=3){
      var rec = {
        name:'用户',
        status:'出局',
        time:this.getNowFormatDate(),
        prize:this._data.currentPrice
      }
        this._data.record.unshift(rec)
//        this._data.record[0].status = '成交'
      }
    }
//  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  ul,li{
    margin: 0;
    padding: 0;
  }
  .head{
    position: relative;
    min-height: 4rem;
    font-size: 0;
    line-height: 0;
    .head-img{
      vertical-align: top;
      width: 100%;
      /*height: auto;*/
      height: 4rem;
    }
    .head-foot{
      position: absolute;
      width: 100%;
      height: .7rem;
      left: 0;
      bottom: 0;
      font-size: .32rem;
      line-height: .72rem;
      color: #fff;
      background-color: #2c8bff;
      text-align: left;
      .head-foot-status{
        margin-right: .34rem;
        padding-left: .35rem;
      }
      .auction-status{
        margin: .1rem;
        margin-left: .18rem;
        font-size: .22rem;
        line-height: 1;
        color: #fff;
        border: 1px solid #fff; /* no*/
        border-radius: .05rem;
        padding: .05rem .08rem;
      }
    }
    /*.head-foot:before {*/
      /*content: "";*/
      /*position: absolute;*/
      /*width: .34rem;*/
      /*height: 100%;*/
      /*left: .32rem;*/
      /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAnFBMV…4CMuf5cHh2MkC53fFOTkwTy3mTvpzT/bbwvGK7T8/G7f/2XCviBiTCTwAAAABJRU5ErkJggg==) 50% no-repeat;*/
      /*background-size: .34rem;*/
    /*}*/
  }
  .headinfo{
    padding: .22rem .32rem .31rem;
    background-color: #fff;
    .headinfo-title{
      font-size: .32rem;
      line-height: .44rem;
      color: #333;
      text-align: left;
    }
    .headinfo-desc{
      padding-bottom: .19rem;
      font-size: .24rem;
      line-height: .34rem;
      color: #999;
      text-align: left;
    }
    .headinfo-price{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: baseline;
      -ms-flex-align: baseline;
      align-items: baseline;
      .headinfo-now{
        font-size: .24rem;
        line-height: .24rem;
        color: #2c8bff;
      }
      .headinfo-nowpay{
        margin-right: .2rem;
        font-size: .54rem;
        line-height: 1;
        color: #2c8bff;
        vertical-align: bottom;
      }
    }
    .headinfo-paybox{
      padding-top: .22rem;
      font-size: .24rem;
      line-height: 1;
      color: #666;
      text-align: left;
      .headinfo-paybox-number{
        font-size: .26rem;
      }
    }
  }
  .record{
    margin-top: .2rem;
    background-color: #fff;
    text-align: left;
    .record-head{
      position: relative;
      height: .7rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcBAMAAACNPbLgAAAAG1BMV…ICqhwdTMHkMSoyCAkACQiPqYlBQwFIYJODAurxUEMXNeQB7jtDP9rl9YcAAAAASUVORK5CYII=) .32rem .24rem no-repeat;
      background-size: .26rem .28rem;
      .record-head-title {
        padding: .04rem .32rem 0 .3rem;
        font-size: .3rem;
        line-height: .66rem;
        color: #333;
      }
      .record-head-desc{
        position: absolute;
        top: .28rem;
        right: .32rem;
        font-size: .24rem;
        line-height: 1;
        color: #999;
      }
    }
    .record-ul{
      height: 2rem;
      overflow: auto;
      .record-li.winer{
        color: #7d63e2;
      }
      .record-li{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 0 .32rem;
        font-size: .24rem;
        color: #666;
        line-height: .6rem;
        white-space: nowrap;
        .record-li-name{
          -webkit-box-flex: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          width: 2.7rem;
        }
        .record-li-status{
          width: .6rem;
        }
        .record-li-time{
          width: 2rem;
        }
        .record-li-prize{
          -webkit-box-flex: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          width: 1.8rem;
          text-align: right;
        }
      }
    }

  }
  .foot{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: .9rem;
    z-index: 20;
    line-height: .9rem;
    background-color: #fff;
    -webkit-box-shadow: 0 0 0.14rem -0.02rem #b3b5b6;
    box-shadow: 0 0 0.14rem -0.02rem #b3b5b6;
    .foot-left{
      height: 100%;
      width: 50%;
      /*-webkit-box-flex: 1;*/
      /*-ms-flex-positive: 1;*/
      /*flex-grow: 1;*/
      font-size: .28rem;
      color:#fff;
      background-color: #2c8bff;

    }
    .foot-left.disabled{
      background-color: #aaa;
    }
    .foot-right{
      height: 100%;
      width: 50%;
      font-size: .28rem;
      color:#fff;
      background-color: #2c8bff;
    }
    .foot-right.disabled{
      background-color: #aaa;
    }
    .foot-btn{
      height: 100%;
      width: 3.32rem;
      font-size: .34rem;
      color: #fff;
      text-align: center;
      background-image: -webkit-gradient(linear,right top,left top,from(#b739f3),to(#6950fb));
      background-image: linear-gradient(-90deg,#b739f3,#6950fb);
    }
  }
  .paylog-wrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 21;
    .paylog{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 6.34rem;
      width: 100%;
      background-color: #fff;
      .paylog-close{
        position: absolute;
        right: 0;
        height: .92rem;
        width: .92rem;
        font-size: 0.28rem;
      }
      .paylog-title{
        padding-top: .34rem;
        font-size: .34rem;
        line-height: 1;
        text-align: center;
        color: #333;
      }
      .paylog-time{
        font-size: 0.28rem;
        padding: 0.36rem;
        text-align: left;
        .auction-status{
          border: 1px solid #999;
          padding: 0.05rem;
          border-radius: 0.1rem;
        }
      }
      .paylog-info{
        font-size: .22rem;
        color: #999;
        text-align: left;
        .paylog-infobox{
          .paylog-infobox-label{
            font-size: .22rem;
            color: #999;
          }
          .paylog-infobox-number{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-top: .14rem;
            font-size: .42rem;
            color: #333;
            vertical-align: bottom;
          }
          .paylog-infobox-number{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-top: .14rem;
            font-size: .42rem;
            color: #333;
            vertical-align: bottom;
          }
        }
      }
      .paylog-operate{
        padding-left: 0.36rem;
        .paylog-operate-label{
          padding-bottom: .16rem;
          font-size: .24rem;
          line-height: 1;
          color: #999;
        }
        .paylog-operate-box{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          position: relative;
          height: 1rem;
          margin-top: 0.3rem;
          .paylog-operate-miuns{
            width: 20%;
            border:1px solid #999;
            border-right:none;
            color: #999;
            span{
              position: relative;
              top: -0.2rem;
            }
          }
          .paylog-operate-input{
            width: 40%;
            input{
              width: 100%;
              display: block;
              font-size: .58rem;
              line-height: 1;
              padding-top: .16rem;
              padding-bottom: .14rem;
              color: #6a4ffb;
              border: 1px solid #999;
              outline: none;
            }


          }
          .paylog-operate-pluse{
            width: 20%;
            border:1px solid #999;
            border-left:none;
            color: #999;
            span{
              position: relative;
              top: -0.2rem;
            }
          }
        }
        .paylog-operate-desc{
          font-size: .32rem;
          color: #999;
          line-height: .58rem;
          text-align: left;
          padding: 0.3rem 0;
        }
      }
      .paylog-submit{
        padding: 0.36rem;
        .paylog-submit-btn{
          border-radius: .04rem;
          font-size: .34rem;
          line-height: .88rem;
          text-align: center;
          color: #fff;
          background-image: -webkit-gradient(linear,right top,left top,from(#b739f3),to(#6950fb));
          background-image: linear-gradient(-90deg,#b739f3,#6950fb);
        }
        .paylog-submit-btn.disabled{
          background-color: #aaa;
          background-image: none;
        }
        .paylog-submit-desc{
          text-align: center;
          font-size: .22rem;
          line-height: .62rem;
          color: #999;
        }
      }
    }

  }
</style>

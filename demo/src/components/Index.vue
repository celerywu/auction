<template>
  <div class="">
    <div class="header">
      <div>限时拍卖</div>
      <a href="javascript:;" @click="showRules()">拍卖规则</a>
      <a href="javascript:;"></a>
    </div>
    <div class="main">
      <div class="list">
        <div class="item" v-for="good in goods">
          <!--<div class="item-inner" v-if="good.status == '0'">-->
            <div>
              <img  v-bind:src="good.img" class="goods">
            </div>
            <div class="right">
              <div class="goods-name">{{good.title}}</div>
              <div class="current-icon-title">{{good.pricetxt}}</div>
              <div class="current-icon-num">{{good.price}}</div>
              <div class="bottom">
                <div class="left">
                  <div class="normal-time">{{good.time}}</div>
                  <div>参与次数 {{good.number}}</div></div>
                <div>
                  <a href="javascript:;" class="button to-begin" v-if="good.status == '0'" @click="goToDetail">{{good.btn}}</a>
                  <a href="javascript:;" class="button to-begin end" v-if="good.status == '1'">{{good.btn}}</a>
                </div>
              </div>
            </div>
          </div>
        <!--</div>-->
      </div>
    </div>
    <div class="dialog-mask" @click.prevent="hideDialog()" v-show="dialogShow"></div>
    <div class="dialog-container" v-show="dialogShow">
      <div class="content"><header>竞拍规则</header>
        <div class="text">
          <p class="paragraph">1.倒计时拍卖，计时结束前，若没有用户重新出价，则该商品由当前出价者获得，若有用户重新出价，则进入下一轮倒计时。</p>
          <p data-v-3b38ba47="" class="paragraph">2.用户每次竞拍，需要支付参与费0.1GXS，商品价格将从当前出价增加0.05GXS。用户一旦出价，将不可撤销。即使用户出局，参与费也不予退还。</p>
          <p class="light-font paragraph">3.当用户账户余额不足支付参与费时，用户无法参与竞拍出价。如发现用户存在利用漏洞、恶意攻击或欺诈行为，平台有权视情况中止/终止竞拍活动。</p>
          <p class="paragraph">4.用户竞拍成功后需完成订单信息，并支付最终出价费用，如30日内未提交则视为自动放弃。平台不对因用户收货地址填写错误导致的商品误寄、遗失或任何其它后果承担责任。</p>
        </div>
        <footer><button @click.prevent="hideDialog()">我知道了</button></footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
        goods:[
          {status:'0',img:'https://img10.360buyimg.com/n7/jfs/t8107/37/1359438185/72159/a6129e26/59b857f8N977f476c.jpg',title:'Apple iPhone 8 Plus 64GB 深空灰色 移动联通电信4G手机',pricetxt:'起拍价(公信币)',price:'0.0',time:'已开始',number:'0',btn:'立即竞拍'},
          {status:'1',img:'https://img13.360buyimg.com/n7/jfs/t14032/135/547674925/142419/b66ec84e/5a0e731cN60e0dfc2.jpg',title:'海尔模卡 （MOOKA）U55Q81J 55英寸 4K曲面安卓智能UHD高清LED液晶电视',pricetxt:'当前竞价(公信币)',price:'0.0',time:'04月04日20:00开始',number:'0',btn:'即将开始'},
          {status:'1',img:'https://img12.360buyimg.com/n7/jfs/t15271/132/2608326233/1012421/83c8ca50/5aabcd36N49f362ee.jpg',title:'《树林》客厅装饰画挂画中式油画玄关餐厅卧室办公室礼品',pricetxt:'成交价(公信币)',price:'5.0',time:'已结束',number:'23',btn:'已结束'}
        ],
      dialogShow:false
    }
  },

  methods:{
    showRules() {
      this.dialogShow = true
    },
    hideDialog() {
      this.dialogShow = false
    },
    goToDetail(){
      this.$router.push({path:'Detail'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  a{
    text-decoration: none;
  }
  .header{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 .32rem;
    margin-top: .2rem;
    height: .8rem;
    div{
      font-weight: 700;
      font-size: .32rem;
      color: #333;
    }
    a:first-of-type {
      margin: .1rem;
      margin-left: .18rem;
      font-size: .22rem;
      line-height: 1;
      color: #ea8f36;
      border: 1px solid #ea8f36; /* no*/
      border-radius: .05rem;
      padding: .05rem .08rem;
    }
    a:last-of-type {
      position: absolute;
      right: .6rem;
      height: .8rem;
      line-height: .82rem;
      font-size: .26rem;
      color: #7d63e2;
    }
  }
  .main{
    .list{
      .item{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        position: relative;
        overflow: hidden;
        height: 3.22rem;
        padding: .27rem .32rem .23rem;
        .item-inner{
          display: flex;
        }
        .goods{
          height: 2.72rem;
          width: 2.8rem;
          margin-right: .26rem;
        }
        .right{
          width: 3.8rem;
          .goods-name{
            font-size: .3rem;
            color: #333;
            line-height: 1.5;
            margin-top: -.06rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-align: left;
          }
          .current-icon-title{
            font-size: .22rem;
            color: #2c8bff;
            margin-top: .18rem;
            line-height: 1;
            text-align: left;
          }
          .current-icon-title.end{
            color: #6666;
          }
          .current-icon-num{
            font-size: .42rem;
            color: #2c8bff;
            text-align: left;
          }
          .current-icon-nu.end{
            color: #6666;
          }
          .bottom{
            position: absolute;
            bottom: 0.8rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-size: .22rem;
            color: #666;
            line-height: 1;
            height: .6rem;
            .left{
              width: 2.3rem;
              text-align: left;
              .normal-time{
                margin-bottom: .1rem;
              }
            }
            a.button{
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              font-size: .28rem;
              background-color: #2c8bff;
              border-radius: .04rem;
              width: 1.5rem;
              height: .6rem;
              color: #fff;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
            }
            a.button.end {
              background: #aaa;
            }
          }
        }
      }
    }
  }
  .dialog-mask{
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: .4
  }
  .dialog-container{
    background-color: #fff;
    background-image: url(//i.epay.126.net/m/at/static/img/dialog-bg.f2bd8ab.png);
    background-repeat: no-repeat;
    background-position: center .22rem;
    background-size: 5.6rem 3.2rem;
    position: fixed;
    z-index: 100000;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 6.3rem;
    .content {
      width: 5.48rem;
      margin: 0 auto .4rem;
      text-align: left;
      header {
        height: 1.08rem;
        font-size: .36rem;
        font-weight: 700;
        line-height: 1;
        color: #333;
        text-align: center;
        padding-top: .4rem;
        border-bottom-width: .02rem;
        border-bottom-style: dashed;
        border-bottom-color: #7d63e2;
      }
      .text{
        margin-top: .13rem;
        font-size: .26rem;
        color: #333;
        line-height: 2;
        .paragraph{
          margin-left: .1rem;
          text-indent: -.1rem;
          .light-font {
            color: #7d63e2;
          }
        }
      }
      footer button{
        margin-top: .4rem;
        background-color: #2c8bff;
        border-radius: .08rem;
        height: .88rem;
        width: 100%;
        font-size: .34rem;
        color: #fff;
        border: none;
      }
    }
  }
</style>

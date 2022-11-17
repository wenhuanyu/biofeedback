// 对抗游戏  孵蛋赛
<template>
    <div class="container">
        <div class="planeImg">
            <div class="azu" ref="azu">

            </div>
            <div class="bzu" ref="bzu">

            </div>
        </div>
        <div style="position: fixed;top:165px;">
            <div v-for="item in biscuits" :class="started" v-if="item.group=='A'">
                <div style="width: 15%;margin-left: 15px;">
                    <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <div v-if="item.is_self == 0" :class="item.status==0?'dd':'df'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="position: fixed;top:165px;right: 50px;">
            <div v-for="item in biscuits" :class="started" v-if="item.group=='B'">
                <div style="width: 15%;margin-left: 15px;">
                    <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <div v-if="item.is_self == 0" :class="item.status==0?'dd':'dr'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="position: fixed;top: 0;left: 400px;">
            <img src="../assets/games/54/A.png">
        </div>
        <div style="position: fixed;top: 0;right: 400px;">
            <img src="../assets/games/54/B.png">
        </div>
    </div>
</template>

<script>
export default {
    name: 'game_62',
    components: {
    },
    data() {
        let that = this;
        return {
            biscuits:'',
            started: '',
            player : {
                play    : function (speed) {
                    that.play(speed);
                },
                stop    : function (speed) {
                    that.pause(speed)
                    // that.started = 'stop';
                },
                pause   : function (speed) {
                    that.pause(speed)
                    // that.started = 'paused';
                },
                inverted: function () {
                }
            }
        }
    },
    created() {
        this.timer = setInterval(() => {
            this.donghua()
        },15000)
    },
    methods: {
        play(speed) {
            this.biscuits = speed
            if(this.biscuits !=='') {
                this.started = 'started';
            }
        },
        pause(speed) {
            this.biscuits = speed
        },
        donghua() {
            let sun = 0;
            let sum = 0;
            console.log('this.biscuits',this.biscuits)
            if (this.biscuits !=='') {
                this.biscuits.map( item => {
                    if (item.group == 'A') {
                        sun = sun + Number(item.value)
                    }
                    if (item.group == 'B') {
                        sum = sum + Number(item.value)
                    }
                    if(sun>sum) {
                        let img = document.createElement("img")
                        img.src = require("../assets/games/62/jd.png")
                        img.style.height = '30px'
                        img.style.width = '40px'
                        img.style.marginTop = '-10px'
                        img.style.marginLeft = '-10px'
                        this.$refs.azu.appendChild(img)
                        return;
                    }
                    if(sum>sun) {
                        let img = document.createElement("img")
                        img.src = require("../assets/games/62/jd.png")
                        img.style.height = '30px'
                        img.style.width = '40px'
                        img.style.marginTop = '-10px'
                        img.style.marginLeft = '-10px'
                        this.$refs.bzu.appendChild(img)
                        return;
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
}
.planeImg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: url("../assets/games/62/bj.png") no-repeat center center / 100% 100%;
}
.azu {
    position: fixed;
    top: 780px;
    left: 400px;
    width: 280px;
    height: 60px;
    display: flex;
    flex-wrap: wrap;
}
.bzu {
    position: fixed;
    top: 800px;
    right: 380px;
    width: 280px;
    height: 60px;
    display: flex;
    flex-wrap: wrap;
}
.df {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #175FFA 0%, #0135A7 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 45px;
    margin-bottom: 10px;
}
.dr {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #F9902E 0%, #E24B08 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 45px;
    margin-bottom: 10px;
}
.de {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #FA1A17 0%, #A70101 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 45px;
    margin-bottom: 10px;
}
.dd {
    width: 68px;
    height: 68px;
    background: #999999;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 45px;
    margin-bottom: 10px;
}
.d1 {
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
}
.d2 {
    font-size: 12px;
    font-weight: 500;
    color: #41D8FF;
}
</style>


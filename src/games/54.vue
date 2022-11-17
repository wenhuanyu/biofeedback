// 对抗游戏  拔河
<template>
    <div class="container">
        <div class="windmillBackground">
            <div style="margin-top: 580px;" :style="{marginLeft:marginLeft}">
                <img src="../assets/games/54/bh.gif">
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

    </div>
</template>

<script>
export default {
    name: 'game_54',
    components: {
    },
    data() {
        let that = this;
        return {
            biscuits:'',
            started: '',
            marginLeft:'',
            b:565,
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
        this.marginLeft = 565 + 'px'
    },
    methods: {
        play(speed) {
            this.biscuits = speed
            this.donghua()
        },
        pause(speed) {
            this.biscuits = speed
        },
        donghua() {
            let sun = 0;
            let sum = 0;
            if (this.biscuits !== '') {
                this.biscuits.map(item => {
                    if(item.group=='A') {
                        sun = sun + Number(item.value)
                    }
                    if(item.group=='B') {
                        sum = sum + Number(item.value)
                    }
                })
                if (sun > sum) {
                    this.marginLeft = this.b+'px'
                    this.b = this.b - 5
                    if (this.b <= 430) {
                        this.b = this.b - 0
                        return;;
                    }
                    return;
                }
                if(sun < sum){
                    this.marginLeft = this.b +'px'
                    this.b = this.b + 5
                    if(this.b >= 720) {
                        this.b = this.b + 0
                    }
                    return;
                }
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
.windmillBackground {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: url("../assets/games/54/bhbj.png") no-repeat center center / 100% 100%;
}
.hezi {
    width: 100%;
    margin-left: 30px;
    margin-top: 200px;
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


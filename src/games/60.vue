// 对抗游戏  龙舟赛
<template>
    <div class="container">
        <div class="planeImg">
            <ul :class="started">
                <li><img src="../assets/games/60/1.png"></li>
                <li><img src="../assets/games/60/2.png"></li>
                <li><img src="../assets/games/60/3.png"></li>
            </ul>
        </div>
        <div style="position: fixed;bottom: 120px;" :style="{right:right}">
            <img src="../assets/games/60/lz1.gif">
        </div>
        <div style="position: fixed;bottom: 420px;" :style="{right:right_}">
            <img src="../assets/games/60/lz2.gif">
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
    name: 'game_60',
    components: {
    },
    data() {
        let that = this;
        return {
            biscuits:'',
            started: '',
            right:'',
            right_:'',
            b:20,
            a:20,
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
        this.right = 20 +'px'
        this.right_ = 20 +'px'
    },
    methods: {
        play(speed) {
            this.biscuits = speed
            if(this.biscuits !=='') {
                this.started = 'started';
                this.donghua()
            }
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
                if(sun>sum) {
                    this.right_ = this.b +'px'
                    this.b = this.b + 5
                    return;
                }
                if(sum>sun) {
                    this.right = this.a +'px'
                    this.a = this.a + 5
                    return;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes play {
    from {
        margin-left: -3840px;
    }
    to {
        margin-left: 0;
    }
}
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
}
.planeImg {
    ul {
        width: 5760px;
        height: 100%;
        li {
            width: 1920px;
            height: 100%;
            float: left;
            list-style: none;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &.started {
            animation: play 60s linear infinite;
        }
        &.paused {
            animation: play 60s linear infinite;
            animation-play-state: paused;
        }
        &.stop {
            animation: none;
        }
    }
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


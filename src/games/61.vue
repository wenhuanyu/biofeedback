// 对抗游戏  登山赛
<template>
    <div class="container">
        <div class="planeImg">
            <div style="display:flex;" class="ren">
                <div class="left" :class="started">
                    <img src="../assets/games/61/nan.gif">
                    <img src="../assets/games/61/nan.gif">
<!--                    <img src="../assets/games/61/nan.gif">-->
                    <img src="../assets/games/61/nan.gif">
<!--                    <img src="../assets/games/61/nan.gif">-->
                </div>
                <div class="right" :class="started">
                    <img src="../assets/games/61/nv.gif">
                    <img src="../assets/games/61/nv.gif" >
                    <img src="../assets/games/61/nv.gif" >
<!--                    <img src="../assets/games/61/nv.gif">-->
<!--                    <img src="../assets/games/61/nv.gif">-->
                </div>
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
    name: 'game_61',
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
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes play{
    0% {
        transform: translateX(0) translateY(0);
    }
    25% {
        transform: translateX(200px) translateY(-200px);
    }
    50% {
        transform: translateX(300px) translateY(-300px);
    }
    75% {
        transform: translateX(400px) translateY(-350px);
    }
    100% {
        transform: translateX(500px) translateY(-450px);
    }
}
@keyframes play_{
    0% {
        transform: translateX(0) translateY(0);
    }
    25% {
        transform: translateX(-200px) translateY(-200px);
    }
    50% {
        transform: translateX(-300px) translateY(-300px);
    }
    75% {
        transform: translateX(-400px) translateY(-350px);
    }
    100% {
        transform: translateX(-500px) translateY(-450px);
    }
}
.ren {
    width: 200px;
    img {
        margin-left: -120px;
    }
    .right {
        display: flex;
        position: fixed;
        top: 660px;
        right: 280px;
        &.started {
            animation: play_  60s linear infinite;
        }
        &.paused {
            animation: play_  60s linear infinite;
            animation-play-state: paused;
        }
        &.stop {
            animation: none;
        }
    }
    .left {
        display: flex;
        position: fixed;
        top: 630px;
        left: 430px;
        &.started {
            animation: play  60s linear infinite;
        }
        &.paused {
            animation: play  60s linear infinite;
            animation-play-state: paused;
        }
        &.stop {
            animation: none;
        }
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
.planeImg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: url("../assets/games/61/ds.jpg") no-repeat center center / 100% 100%;
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


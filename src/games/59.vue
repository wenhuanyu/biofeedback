// 多人游戏  赛马
<template>
    <div class="container">
        <div class="background">
            <ul :class="started">
                <li><img src="../assets/games/59/1.png"></li>
                <li><img src="../assets/games/59/2.png"></li>
                <li><img src="../assets/games/59/3.png"></li>
            </ul>
        </div>
        <div class="hezi">
            <div v-for="(item,index) in biscuits.slice(0,10)" style="margin-top: -170px;">
                <div style="width: 15%;" :style="{marginLeft:item.num + 'px'}">
                    <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'">
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <div v-if="item.is_self == 0" :class="item.status==0?'dd':'df'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <img src="../assets/games/59/sm1.gif" style="width: 100px;height: 80px;">
                </div>
            </div>
        </div>
        <div class="hezi_">
            <div v-for="(item,index) in biscuits.slice(10,20)" style="margin-top: -170px;">
                <div style="width: 15%;" :style="{marginLeft:item.num + 'px'}">
                    <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'">
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <div v-if="item.is_self == 0" :class="item.status==0?'dd':'df'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <img src="../assets/games/59/sm2.gif" style="width: 100px;height: 80px;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'game_59',
    components: {
    },
    data() {
        let that = this;
        return {
            biscuits:[],
            started: '',
            old:'',
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
    watch:{
        biscuits:{
            handler(newValue,oldValue) {
                this.old = newValue
            }
        }
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
            if (this.biscuits !== '' && this.old !== '') {
                this.biscuits.map(item => {
                    this.old.map(a => {
                        if (item.id === a.id) {
                            if(!a.num){
                                if (item.value > 90) {
                                    item.num = 10
                                } else if(item.value <=90 && item.value > 80) {
                                    item.num = 9
                                } else if(item.value <=80 && item.value > 70) {
                                    item.num = 8
                                } else if(item.value <=70 && item.value > 60) {
                                    item.num = 7
                                } else if(item.value <=60 && item.value > 50) {
                                    item.num = 6
                                } else if(item.value <=50 && item.value > 40) {
                                    item.num = 5
                                } else if(item.value <=40 && item.value > 30) {
                                    item.num = 4
                                } else if(item.value <=30 && item.value > 20) {
                                    item.num = 3
                                } else if(item.value <=20 && item.value > 10) {
                                    item.num = 2
                                } else if(item.value <=10) {
                                    item.num = 1
                                }
                            } else {
                                if (item.value > 90) {
                                    item.num = a.num + 10
                                } else if(item.value <=90 && item.value > 80) {
                                    item.num = a.num + 9
                                } else if(item.value <=80 && item.value > 70) {
                                    item.num = a.num + 8
                                } else if(item.value <=70 && item.value > 60) {
                                    item.num = a.num + 7
                                } else if(item.value <=60 && item.value > 50) {
                                    item.num = a.num + 6
                                } else if(item.value <=50 && item.value > 40) {
                                    item.num = a.num + 5
                                } else if(item.value <=40 && item.value > 30) {
                                    item.num = a.num + 4
                                } else if(item.value <=30 && item.value > 20) {
                                    item.num = a.num + 3
                                } else if(item.value <=20 && item.value > 10) {
                                    item.num = a.num + 2
                                } else if(item.value <=10) {
                                    item.num = a.num + 1
                                }
                            }
                        }
                    })
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes play {
    from {
        margin-left: 0;
    }
    to {
        margin-left:-3840px;
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
.background {
    ul {
        width: 5760px;
        height: 100%;
        li {
            width: 1920px;
            height: 100%;
            float:left;
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
    height: 520px;
    position: fixed;
    top: 480px;
    left: 25px;
    width: 150px;
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
}
.hezi_ {
    height: 520px;
    position: fixed;
    top: 480px;
    left: 120px;
    width: 150px;
    margin-top: 70px;
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
    margin-left: -20px;
}
.dd {
    width: 68px;
    height: 68px;
    background: #999999;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: -20px;
}
.de {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #FA1A17 0%, #A70101 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: -20px;
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

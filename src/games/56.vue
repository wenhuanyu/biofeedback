// 多人游戏  牛牛冲天
<template>
    <div class="container">
        <div class="balloonImg" >
            <ul :class="started">
                <li><img src="../assets/games/56/6.png"></li>
                <li><img src="../assets/games/56/5.png"></li>
                <li><img src="../assets/games/56/4.png"></li>
                <li><img src="../assets/games/56/3.png"></li>
                <li><img src="../assets/games/56/2.png"></li>
                <li><img src="../assets/games/56/1.png"></li>
            </ul>
        </div>
        <div class="hezi" style="position: absolute">
            <div v-for="item in biscuits">
                <div style="width: 5%;margin-left: -80px;position: relative" :style="{bottom:item.num + 'px'}">
                    <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'">
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <div v-if="item.is_self == 0" :class="item.status==0?'dd':'df'" >
                        <div class="d1">{{item.name}}</div>
                        <div class="d2">数值：{{item.value}}</div>
                    </div>
                    <img  src="../assets/games/56/nn.gif">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'game_56',
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
                },
                pause   : function (speed) {
                    that.pause(speed)
                },
                inverted: function () {
                }
            }
        }
    },
    computed: {
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
            if (this.biscuits !=='' && this.old !=='') {
                let start_value =this.$store.state.user.game.start_value
                let end_value =this.$store.state.user.game.end_value
                this.old.map(a => {
                    this.biscuits.map(item => {
                        if (item.id == a.id ) {
                            if(item.value > start_value && item.value <= end_value) {
                                if(!a.num){
                                    if (item.value > 60) {
                                        item.num = 6
                                    } else if(item.value <=60 && item.value > 50) {
                                        item.num = 5
                                    } else if(item.value <=50 && item.value > 40) {
                                        item.num = 4
                                    } else if(item.value <=40 && item.value > 30) {
                                        item.num = 3
                                    } else if(item.value <=30 && item.value > 20) {
                                        item.num = 2
                                    } else if(item.value <=20 && item.value > 10) {
                                        item.num = 1
                                    } else if(item.value <=10) {
                                        item.num = 0
                                    }
                                } else {
                                    if (item.value > 60) {
                                        item.num = a.num + 6
                                    } else if(item.value <=60 && item.value > 50) {
                                        item.num = a.num + 5
                                    } else if(item.value <=50 && item.value > 40) {
                                        item.num = a.num + 4
                                    } else if(item.value <=40 && item.value > 30) {
                                        item.num = a.num + 3
                                    } else if(item.value <=30 && item.value > 20) {
                                        item.num = a.num + 2
                                    } else if(item.value <=20 && item.value > 10) {
                                        item.num = a.num + 1
                                    } else if(item.value <=10) {
                                        item.num = a.num + 0
                                    }
                                }
                            } else {
                                a.num = 0
                                item.num = 0
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
        margin-top:-5400px;
    }
    to {
        margin-top:0;
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
.balloonImg {
    ul {
        width: 100%;
        height: 6480px;
        li {
            width: 100%;
            height: 1080px;
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
    position: fixed;
    width: 100%;
    height: 200px;
    margin-top: 750px;
    margin-left: 200px;
    display: flex;
}
.df {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #175FFA 0%, #0135A7 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 30px;
}
.dd {
    width: 68px;
    height: 68px;
    background: #999999;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 30px;
}
.de {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #FA1A17 0%, #A70101 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    margin-left: 30px;
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

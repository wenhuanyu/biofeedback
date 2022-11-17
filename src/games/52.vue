// 多人游戏  吃饼干
<template>
    <div class="container">
        <div class="windmillBackground">
            <div class="hezi">
                <div v-for="(item,i) in biscuits" :key="i" class="d3">
                    <div style="width: 15%;margin-left: 22px;position: relative;">
                        <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'">
                            <div class="d1">{{item.name}}</div>
                            <div class="d2">数值：{{item.value}}</div>
                        </div>
                        <div v-if="item.is_self == 0" :class="item.status==0?'dd':'df'" >
                            <div class="d1">{{item.name}}</div>
                            <div class="d2">数值：{{item.value}}</div>
                        </div>
                        <div :ref="'show'+item.id" style="width: 70px;position: relative;">
                            <img src="../assets/games/52/bg.png" style="z-index: 1; position: absolute;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game_52',
        components: {
        },
    data() {
        let that = this;
        return {
            biscuits:[],
            old:[],
            started: '',
            b:10,
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
            if (this.biscuits !=='' && this.old !=='') {
                this.biscuits.map(item => {
                    this.old.map(a => {
                        if (item.id === a.id) {
                            if (!a.num) {
                                item.num = 1
                            } else {
                                if (item.value > 70) {
                                    item.num = a.num + 10
                                    let img = document.createElement("img")
                                    img.src = require("../assets/games/52/bg.png")
                                    img.style.position = 'absolute'
                                    img.style.top = '-'+item.num +'px'
                                    img.style.zIndex = this.b
                                    this.$refs['show'+item.id][0].appendChild(img)
                                    console.log('>75',item.num)
                                } else {
                                    item.num = a.num
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
    background: url("../assets/games/52/bgbj.png") no-repeat center center / 100% 100%;
}
.hezi {
    width: 1800px;
    height: 500px;
    margin: 220px auto;
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
    //margin-left: 45px;
    position: absolute;
    top: 70px;
}
.dd {
    width: 68px;
    height: 68px;
    background: #999999;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    position: absolute;
    top: 70px;
}
.de {
    width: 68px;
    height: 68px;
    background: linear-gradient(180deg, #FA1A17 0%, #A70101 100%);
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    position: absolute;
    top: 70px;
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
.d3 {
    display: flex;
    flex-direction: column-reverse;
}
</style>


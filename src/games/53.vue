// 多人游戏  静坐
<template>
    <div class="container">
        <div class="windmillBackground">
            <div class="hezi">
                <div v-for="item in biscuits" :class="started">
                    <div style="width: 15%;margin-left: 15px;">
                        <div v-if="item.is_self == 1" :class="item.status==0?'dd':'de'">
                            <div class="d1">{{item.name}}</div>
                            <div class="d2">数值：{{item.value}}</div>
                        </div>
                        <div v-if="item.is_self == 0" :class="item.status==0?'dd':'df'" >
                            <div class="d1">{{item.name}}</div>
                            <div class="d2">数值：{{item.value}}</div>
                        </div>
                        <img v-show="item.status==1 &&  (item.value > start_value && item.value <= end_value)" src="../assets/games/53/by.png">
                        <img v-show="item.status==0 || item.value <= start_value || item.value > end_value" src="../assets/games/53/zy.png">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'game_53',
    components: {
    },
    data() {
        let that = this;
        return {
            biscuits:'',
            started: '',
            start_value:'',
            end_value:'',
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
        this.start_value =this.$store.state.user.game.start_value
        this.end_value =this.$store.state.user.game.end_value
    },
    methods: {
        play(speed) {
            this.biscuits = speed
            console.log('this.biscuits',this.biscuits)
        },
        pause(speed) {
            this.biscuits = speed
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
    background: url("../assets/games/53/jzbj.png") no-repeat center center / 100% 100%;
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
    margin-bottom: 20px;
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
    margin-bottom: 20px;
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
    margin-bottom: 20px;
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


<template>
  <div>
    <Table
        ref="list"
        :edit="true"
        @edit="edit"
        :add="true"
        @add="add()"
        :page-footer="true"
        add-href="/AddPatient"
        :deleteUrl="'api/patient/delete'"
        detail-href="AddPatient"
        @remove="removeBtn"
        :search-url="url"
        :tableTitle="tableTitle"
        @delinfo="delinfoChange"
    />
      <!--弹出-->
      <el-dialog custom-class="dialog"
                 :visible.sync="dialogFormVisible"
                 :destroy-on-close="true"
                 ref="dialog"
                 @close="onDialogClose">
          <div class="tan_top">
              添加患者信息
          </div>
          <div class="tan_body">
              <el-form  ref="form" label-width="120px" style="max-height: unset;" :rules="rules" :model="form">
                  <el-form-item label="姓名" prop="name">
                      <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="gender">
                      <el-radio-group v-model="form.gender">
                          <el-radio :label="0" name="0">男</el-radio>
                          <el-radio :label="1" name="1">女</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出生日期" prop="birth">
                      <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="form.birth"
                                      @change="birthday"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="年龄">
                      <el-input v-model="form.age"></el-input>
                  </el-form-item>
                  <el-form-item label="入院时间">
                      <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                      v-model="form.in_time"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="病历号" prop="medical_num">
                      <el-input v-model="form.medical_num"></el-input>
                  </el-form-item>
                  <el-form-item label="医保号" prop="medical_insurance_num">
                      <el-input v-model="form.medical_insurance_num"></el-input>
                  </el-form-item>
                  <el-form-item label="学历信息" prop="education_id">
                      <el-select v-model="form.education_id" placeholder="请选择" style="width: 100%;" @change="educationChange($event)">
                          <el-option v-for="item in educationInformationArr" :key="item.id" :label="item.name"
                                     :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="患者来源">
                      <div>
                          <el-select v-model="department_name" placeholder="请选择" @change="getRole($event)"  style="width: 100%;">
                              <el-option v-for="item in stateArr" :key="item.id" :label="item.name"
                                         :value="item.name"></el-option>
                          </el-select>
<!--                          <el-select :disabled="disabled" v-model="form.source" placeholder="请选择" style="margin-left: 10px">-->
<!--                              <el-option v-for="(item,index) in select2" :key="item.id" :label="item.name"-->
<!--                                         :value="item.name"></el-option>-->
<!--                          </el-select>-->
                      </div>
                  </el-form-item>
                  <el-form-item prop="source">
                      <div>
<!--                          <el-select v-model="department_name" placeholder="请选择" @change="getRole($event)">-->
<!--                              <el-option v-for="item in stateArr" :key="item.id" :label="item.name"-->
<!--                                         :value="item.name"></el-option>-->
<!--                          </el-select>-->
                          <el-select :disabled="disabled" v-model="form.source" placeholder="请选择"  style="width: 100%;">
                              <el-option v-for="(item,index) in select2" :key="item.id" :label="item.name"
                                         :value="item.name"></el-option>
                          </el-select>
                      </div>
                  </el-form-item>
<!--                  <el-form-item label="病区" prop="source">-->
<!--                      <el-select v-model="form.source" placeholder="请选择" style="width: 100%;">-->
<!--                          <el-option v-for="item in stateArr" :key="item.id" :label="item.name"-->
<!--                                     :value="item.name"></el-option>-->
<!--                      </el-select>-->
<!--                      &lt;!&ndash; <el-input v-model="formData.source"></el-input> &ndash;&gt;-->
<!--                  </el-form-item>-->
                  <el-form-item label="电话" prop="phone">
                      <el-input v-model="form.phone"></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <div slot="footer" class="dialog-footer padding-30 no-padding-left no-padding-right no-padding-top" style="text-align: center">
              <el-button type="warning" round style="margin-right:20px" @click="buttonQx">取消
              </el-button>
              <el-button type="primary" round  @click="buttonSubmit">完成</el-button>
          </div>
      </el-dialog>

    <!--  编辑  -->
      <el-dialog
          :visible.sync="terminalShow"
          :destroy-on-close="true">
          <div class="tan_top">
              编辑患者信息
          </div>
          <div class="tan_body">
              <el-form label-width="120px" style="max-height: unset;" :rules="rules" :model="form"  ref="form">
                  <el-form-item label="姓名" prop="name">
                      <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="gender">
                      <el-radio-group v-model="form.gender">
                          <el-radio :label="0" name="0">男</el-radio>
                          <el-radio :label="1" name="1">女</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出生日期" prop="birth">
                      <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="form.birth"
                                      @change="birthday"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="年龄">
                      <el-input v-model="form.age"></el-input>
                  </el-form-item>
                  <el-form-item label="入院时间">
                      <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                      v-model="form.in_time"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="病历号" prop="medical_num">
                      <el-input v-model="form.medical_num"></el-input>
                  </el-form-item>
                  <el-form-item label="医保号" prop="medical_insurance_num">
                      <el-input v-model="form.medical_insurance_num"></el-input>
                  </el-form-item>
                  <el-form-item label="学历信息" prop="education_id">
                      <el-select v-model="form.education_id" placeholder="请选择" style="width: 100%;" @change="educationChange($event)">
                          <el-option v-for="item in educationInformationArr" :key="item.id" :label="item.name"
                                     :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="患者来源">
                      <div>
                          <el-select v-model="department_name" placeholder="请选择" @change="getRole($event)"  style="width: 100%;">
                              <el-option v-for="item in stateArr" :key="item.id" :label="item.name"
                                         :value="item.name"></el-option>
                          </el-select>
                          <!--                          <el-select :disabled="disabled" v-model="form.source" placeholder="请选择" style="margin-left: 10px">-->
                          <!--                              <el-option v-for="(item,index) in select2" :key="item.id" :label="item.name"-->
                          <!--                                         :value="item.name"></el-option>-->
                          <!--                          </el-select>-->
                      </div>
                  </el-form-item>
                  <el-form-item prop="source">
                      <div>
                          <!--                          <el-select v-model="department_name" placeholder="请选择" @change="getRole($event)">-->
                          <!--                              <el-option v-for="item in stateArr" :key="item.id" :label="item.name"-->
                          <!--                                         :value="item.name"></el-option>-->
                          <!--                          </el-select>-->
                          <el-select :disabled="disabled" v-model="form.source" placeholder="请选择"  style="width: 100%;">
                              <el-option v-for="(item,index) in select2" :key="item.id" :label="item.name"
                                         :value="item.name"></el-option>
                          </el-select>
                      </div>
                  </el-form-item>
<!--                  <el-form-item label="病区" prop="source">-->
<!--                      <el-select v-model="form.source" placeholder="请选择" style="width: 100%;">-->
<!--                          <el-option v-for="item in stateArr" :key="item.id" :label="item.name"-->
<!--                                     :value="item.name"></el-option>-->
<!--                      </el-select>-->
<!--                      &lt;!&ndash; <el-input v-model="formData.source"></el-input> &ndash;&gt;-->
<!--                  </el-form-item>-->
                  <el-form-item label="电话" prop="phone">
                      <el-input v-model="form.phone"></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <div slot="footer" class="dialog-footer padding-30 no-padding-left no-padding-right no-padding-top" style="text-align: center">
              <el-button type="warning" round style="margin-right:20px" @click="selectQx">取消
              </el-button>
              <el-button type="primary" round  @click="selectTerminal">完成</el-button>
          </div>
      </el-dialog>

<!--      删除患者-->
      <el-dialog :visible.sync="qrDialog" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
          <div class="dialog-body">
              <div class="dialog-text" style="text-align: center;color: #FFFFFF;">
                  <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                  <h2 style="margin-top: 10px;margin-bottom: 10px;">提示</h2>
                  <!--                  <div style="margin-top: 5px;" v-for="(item,index) in delinfoList" >-->
                  <!--                      <h3>{{ item.name }}{{item.text}}，是否继续删除?</h3>-->
                  <!--                  </div>-->
                  <div style="margin-top: 5px;margin-bottom: 30px" >
                      <h3>{{ delinfoList }}，是否继续删除?</h3>
                  </div>
                  <div slot="footer">
                      <el-button type="warning" style="background: #01B2E4;color: #ffffff;box-shadow:none;" round @click="qrDialog = false">取消
                      </el-button>
                      <el-button type="primary" round @click="buttonSubmitDel">继续删除</el-button>
                  </div>
              </div>
          </div>

      </el-dialog>
  </div>
</template>

<script>
import Table from "../components/Table";


export default {
  name: "PatientManagement",
  components: {Table},
  data() {
    return {
        select2:[],
        disabled:true,
        nationalList:[],
        department_name:'',
      dialogFormVisible: false,
      terminalShow: false,
      form:{
          name:'',
          gender:'',
          birth:'',
          age:'',
          medical_num:'',
          medical_insurance_num:'',
          education_id:'',
          source:'',
          phone:''
      },
      stateArr: [],
      educationInformationArr:[],
      tableTitle: [
        {
          name: '编号',
          value: 'num'
        },
        {
          name: '姓名',
          value: 'name'
        },
        {
          name: '性别',
          value: 'gender',
          formatter: (row) => {
            if (row.gender == 0) {
              return '男';
            } else {
              return '女';
            }
          }
        },
        {
          name: '年龄',
          value: 'age'
        },
        {
          name: '病历号',
          value: 'medical_num',
        },
        {
          name: '医保号',
          value: 'medical_insurance_num'
        },
          {
              name: '文化程度',
              value: 'education'
          },
          {
              name: '部门',
              value: 'department_name'
          },
          {
              name: '患者来源',
              value: 'source'
          },
        // {
        //   name: '入院时间',
        //   value: 'in_time_text',
        //   width: '180',
        // },
        {
          name: '电话',
          value: 'phone',
          width: '180',
        },],
      url: 'api/patient/index',
        rules: {
            name: [{
                required: true,
                message: '请输入姓名',
                trigger: 'blur'
            }],
            gender: [{
                required: true,
                message: '请选择性别'
            }],
            medical_num: [{
                required: true,
                message: '请输入病历号'
            }],
            medical_insurance_num: [{
                required: true,
                message: '请输入医保号'
            }],
            birth: [{
                required: true,
                message: '请选择出生日期'
            }],
            phone: [{
                pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                message: "请输入正确的手机号码",
                trigger: "blur"
            }],
            //
            source: [{
                required: true,
                message: '请输入患者来源'
            }],
            // marriage_id: [{
            //     required: true,
            //     message: '请输入婚姻状态'
            // }],
            // education_id: [{
            //     required: true,
            //     message: '请输入学历信息'
            // }],
            // occupation_id: [{
            //     required: true,
            //     message: '请输入职业信息'
            // }],
        },
        qrDialog: false,
        delinfoList:[],
        delid:"",
    };
  },
  computed: {},
  watch: {
  },
  methods: {
      delinfoChange(res,id) {
          this.qrDialog = true;
          this.delinfoList = res.data.name
          this.delid = id
      },
      buttonSubmitDel() {
          this.$axios.post('api/patient/delete', this.$qs.stringify({
              id: this.delid,
              type:1
          })).then(res => {
              this.$refs.list.onRefresh()
              this.qrDialog = false;
          })
      },
      //患者来源选择
      getRole (prov) {
          this.select2= []
          for (var val of this.stateArr) {
              if (prov===val.name) {
                  this.select2 = val.child
              }
          }
          this.disabled = false;
          this.form.source = ''
      },
      //文化程度
      educationChange(e){
          this.form.education_id = e
      },
      //文化程度  患者来源接口
      async getWard() {
          await this.$axios.post('api/district/index', {type: 1}).then(res => {
              this.stateArr = res.data.data;

          })
          await this.$axios.post('api/common/education').then(res => {
              console.log(res)
              this.educationInformationArr = res.data.data;
          })
      },
      birthday(e) {
          this.form.age = this.getAge(e.split('-'))[0];
          if(this.form.age < 0){
              this.form.age = 0
          }
      },
      getAge(birthday) {
          // 新建日期对象
          let date = new Date()
          // 今天日期，数组，同 birthday
          let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
          // 分别计算年月日差值
          let age = today.map((value, index) => {
              return value - birthday[index]
          })
          // 当天数为负数时，月减 1，天数加上月总天数
          if (age[2] < 0) {
              // 简单获取上个月总天数的方法，不会错
              let lastMonth = new Date(today[0], today[1], 0)
              age[1]--
              age[2] += lastMonth.getDate()
          }
          // 当月数为负数时，年减 1，月数加上 12
          if (age[1] < 0) {
              age[0]--
              age[1] += 12
          }
          return age
      },
      add() {
          this.dialogFormVisible = true
      },
      edit(row) {
          console.log('row',row)
          this.terminalShow = true
          this.$axios.post('api/patient/info', {id: row.id}).then(res => {
              var data = res.data.data
              this.form = data
              console.log('this.form',this.form)
              this.department_name = data.department_name
              this.disabled = false
              for (var val of this.stateArr) {
                  if (this.department_name===val.name) {
                      this.select2 = val.child
                  }
              }
              // this.backup = {...data};
              console.log(this.form)
          })

      },
      //添加 取消按钮
      buttonQx() {
          this.dialogFormVisible = false
          this.qingkong()
      },
      qingkong() {
          this.form = {
              name:'',
              gender:'',
              birth:'',
              age:'',
              medical_num:'',
              medical_insurance_num:'',
              education_id:'',
              source:'',
              phone:''
          }
          this.department_name = ''
      },
      //添加 确定按钮
      buttonSubmit() {
          this.$refs['form'].validate((valid) => {
              if (valid) {
                  let form = {...this.form};
                  console.log('form',form)
                  this.$axios.post('api/patient/add', this.$qs.stringify(form)).then(res => {
                      if (res.data.code === 1) {
                          this.$refs.list.onSubmit()
                          this.dialogFormVisible = false
                          this.qingkong()
                      }
                  })
              }
          });

      },
      //编辑  取消按钮
      selectQx() {
          this.terminalShow = false
          this.qingkong()
      },
      //编辑  确定按钮
      selectTerminal() {
          this.$refs['form'].validate((valid) => {
              if (valid) {
                  let form = {...this.form};
                  console.log('form',form)
                  this.$axios.post('api/patient/edit', this.$qs.stringify(form)).then(res => {
                      if (res.data.code === 1) {
                          this.$refs.list.onSubmit()
                          this.terminalShow = false
                          this.qingkong()
                      }
                  })
              }
          });
      },
      onDialogClose() {

      },
      removeBtn(ids) {
          console.log('ids',ids)
      }
  },
  async mounted() {
      await this.getWard();
  }
}
</script>

<style scoped lang="scss">
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background: #022358;
    }
    .el-select-dropdown__item.selected {
        color: #01C2F4 !important;
    }

    ::v-deep {
        .el-dialog__wrapper {
            background: rgba(0, 11,26, 0.9);
        }
        .el-dialog__headerbtn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #01C2F4;
        }
        .el-dialog__headerbtn .el-dialog__close {
            font-size: 22px;
            color: #000000 !important;
        }
        .el-select .el-input__inner:focus {
            border: 1px solid #01C2F4;
        }
        .el-select .el-input.is-focus .el-input__inner {
            border: 1px solid #01C2F4;
        }
        .el-scrollbar {
            background: #021743;
            border: 1px solid #01C2F4;
        }
        .el-input.is-disabled .el-input__inner {
            background: #021743;
            border: 1px solid #01C2F4;
        }
        .el-dialog__body {
            .el-input__suffix {
                right: 80px;
            }
        }

        .el-select .el-input .el-select__caret {
            margin-right: 90px;
        }
        .el-radio__input.is-checked .el-radio__inner {
            background: #01C2F4;
            border: #01C2F4;
        }
        .el-radio__input.is-checked + .el-radio__label {
            color:#01C2F4 ;
        }
        .el-radio {
            padding-left: 15px;
            margin-left: 15px;
            width: 80px;
            border: 1px solid #01C2F4 ;
            border-radius: 20px;
            line-height: 40px;
        }
        .el-dialog__header {
            position: relative;
        }
        .el-dialog {
            width: 736px;
            background: rgba(8, 51, 145, 0.3) ;
            border: 1px solid #01C2F4;
        }
        .el-button--primary {
            background: #B12C54;
            border: #B12C54;
            border-radius: 3px !important;
        }
        .el-button--warning {
            background: #01B2E4;
            border: #01B2E4;
            border-radius: 3px !important;
        }
        .el-input__inner {
            width: 75%;
            background: #021743;
            border: 1px solid #01C2F4;
        }
        .el-form-item__label {
            font-size: 18px;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 35px;
        }
        .el-input {
            margin-left: 15px;
            color: #808BA1 !important;
            font-size: 16px;
            font-weight: 500;
        }
        .el-radio__label {
            color: #ffffff;
        }
    }
    .tan_top {
        position: absolute;
        top: -77px;
        left: -1px;
        width: 444px;
        height: 76px;
        background-image: url("../assets/images/ttt.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 24px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 76px;
        text-align: center;
    }
    .tan_body {
    }
</style>

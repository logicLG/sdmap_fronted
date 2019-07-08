<template>
  <div>
    <div slot="activator" class="card-container" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()"
         :class="{itemHover:itemHoverIndex==1}">
      <el-card height="220px" :body-style="{ padding: '5px' }">
        <img :src="card.picPath" style="height: 110px;width: 100px"
             alt="static/img/mydata.svg"
             onerror="this.src='static/img/mydata.svg';this.onerror=null"
             @click="openModelDialog(card.artifactId)">
        <div style="padding: 14px; height: 60px">
                <span class="data-icon " id="info" title="模型信息" @click="viewModelinfo()">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </span>
          <span>{{ card.name}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

  export default {
    name: "modelCard",
    props: {
      card: {type: Object, default: []},
      personalPage: String
    },
    data() {
      return {
        itemHoverIndex: null,
        dialogVisible: {
          v: false,
        },
        modelInfoVisible: {
          v: false,
        }
      }
    },
    computed: {
      artifactId() {
        return this.card.artifactid;
      }
    },
    methods: {
      mouseEnter() {
        this.itemHoverIndex = 1;
      },
      mouseLeave() {
        this.itemHoverIndex = null;
      },
      getUUIDByID() {
        let that = this;
        this.$axios.get('static/json/getUUIDByID.json', {
          id: that.data.id
        }).then(res => {
          console.log(res.data)
        }).catch(function (err) {
          console.log(err)
        })
      },
      dateTrans: function (date) {
        date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
        return date;
      },
      openModelDialog(artifactId) {
        this.dialogVisible.v = true;
        this.$Bus.$emit('pop', this.dialogVisible, this.artifactId);
      },
      viewModelinfo: function () {
        this.modelInfoVisible.v = true;
        this.$Bus.$emit('pob', this.modelInfoVisible, this.artifactId);
      },
      deleteModel: function () {
        let obj = this;
        this.$confirm('此操作将删除该模型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //post请求返回code 判断是否删除了该模型
          obj.$axios.remove(this.$URL.deleteModelUrl + obj.artifactId)
            .then(function (response) {
              if (response.code === 200) {
                obj.$message({
                  type: 'success',
                  message: '删除成功'
                });
                obj.$emit('childRefresh')
              }
            }).catch(function (error) {
            obj.$message.error("删除失败！")
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .itemHover {
    /*box-shadow:0px 0px 1px 0px #313131;*/
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
  }

  .card-container {
    /*margin-left: 25px;*/
    /*padding: 5px 10px 5px 10px;*/
    width: 240px;
  }

  .data-info {
    height: 69px;
    padding: 8px 12px 12px;
    overflow: hidden;
    color: #303c46;
    position: relative;
  }

  .data-info-container {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .data-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 24px;
    text-align: left;
    font-size: 14px;
    line-height: 22px;
    position: relative;
    margin-right: 102px;
  }

  .data-count {
    text-align: left;
    font-size: 12px;
    line-height: 14px;
    width: 110px;
    color: #222;
    padding: 10px 0 6px;
  }

  .data-date {
    position: absolute;
    right: 2px;
    top: 4px;
    height: 14px;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    color: #8a9194;
  }

  .data-option {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .data-icon {
    margin: 0;
    border: 0;
    padding-right: 3px;
    font-size: 14px;
    box-sizing: border-box;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: inline-flex;
  }

  .data-icon i:hover {
    color: #3f87f7;
    cursor: pointer;
  }

  #delete i:hover {
    color: #fe6970;
  }

  .data-option-container {
    position: absolute;
    z-index: 9;
    width: 118px;
    background-color: #fff;
    border-radius: 3px;
    bottom: 30px;
    right: -20px;
    border: 1px solid #d4d8db;
    text-align: left;
    color: #8a9194;
    padding: 6px 0;
  }

  .option-icon {
    width: 18px;
    text-align: center;
    float: left;
    margin-right: 6px;
  }
</style>

<template>
  <div style="width:95%;margin: 10px auto;">
    <el-row>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg3 v-for="card in cards" :key="card.artifactId">
            <v-modelCard :card="card"></v-modelCard>
          </v-flex>
        </v-layout>
      </v-container>
    </el-row>
    <v-modelDialog ref="modelDialog"></v-modelDialog>
    <v-modelInfoDialog></v-modelInfoDialog>
  </div>
</template>

<script>
  import modelCard from '../../components/card/modelCard.vue';
  import modelInfoDialog from '../../components/dialog/modelInfoDialog.vue';
  import modelDialog from '../../components/dialog/modelDialog.vue';

  export default {
    name: "analyseModel",
    data() {
      return {
        cards: null,
        modalTitle: "",
        centerDialogVisible: false,
        modelName: "analyseModel",
        isVisible: false,
        signVisible: {
          v: false,
        },
        positionVisible: {
          v: false
        },
        fileVisible: {
          v: false
        },
        modelInfoVisible: false,
        val: ['all'],
        options: this.$publicModelOption,
        defaultProps: {
          children: 'children',
          label:
            'label'
        }
      }
    },
    components: {
      "v-modelCard":
      modelCard,
      "v-modelDialog":
      modelDialog,
      "v-modelInfoDialog":
      modelInfoDialog
    },
    methods: {
      getModelData: function (val) {
        let obj = this;
        this.$axios.get(
          // params:{ userid: "userid"},
          obj.$URL.publicModelUrl)
          .then(res => {
            this.cards = [];
            for (let card of res.result) {
              if (card.usagetype != "basicStatistics" && card.usagetype != "regression") {
                this.cards.push(card)
              }
            }
            this.cards.forEach(model => {
              model.picPath = this.$serverUrl + model.picPath;
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },


    },
    mounted: function () {
      this.getModelData();
    },
  }
</script>

<style>
  #tool {
    padding: 0 10px 0 0;
    float: right;
  }

  .el-tree-node__content:hover {
    color: #3a8ee6;
  }
</style>

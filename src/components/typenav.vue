<template>
  <div class="type-nav">
    <div class="container" @mouseleave="changeToHidden">
      <h2 class="all" @mouseenter="changeToVisible">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div
          class="sort"
          @mouseleave="deletecur"
          @click="goSearch"
          v-show="isVisible"
          ref="showList"
        >
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3
                @mouseenter="changecur(index)"
                :class="{ cur: index == activeditem }"
              >
                <a
                  href=""
                  :data-category1id="c1.categoryId"
                  :data-category1-Name="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: index == activeditem ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        href=""
                        :data-category2id="c2.categoryId"
                        :data-category2-Name="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                        :data-category-Id="c3.categoryId"
                      >
                        <a
                          href=""
                          :data-category3id="c3.categoryId"
                          :data-category3-Name="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import throttle from 'lodash/throttle'
//也可以部分引入
const throttle = require("lodash/throttle");
import { mapActions, mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      activeditem: -1,
      searchParams:{
          category1Id:'',
          category2Id:'',
          category3Id: "",
          categoryName: "",
          keyword: "",
          order: "",
          pageNo: 1,
          pageSize: 10,
          props: [],
          trademark: "",
        }
    };
  },
  mounted() {
   if(this.$route.name == 'detail'){
     this.$refs.showList.style.display = "none";
   } 
  },
  computed: {
    ...mapState("homeModule", ["categoryList"]),
    isVisible() {
      console.log(this.$route.name);
      if(this.$route.name != 'search'){
              return true;
      }
      if(this.$route.name != "detail"){
               return true;
      }
      return false;
    },
  },
  methods: {
    //lodash节流
    changecur: throttle(function (index) {
      this.activeditem = index;
    }, 50),

    deletecur() {
      this.activeditem = -1;
    },

    changeToVisible() {
      //在当前页面为search路由页面时，控制三级列表的显示与隐藏
      if (this.$route.name == "search" ||this.$route.name == "detail") {
        this.$refs.showList.style.display = "block";
      }
    },
    changeToHidden() {
      //在当前页面为search路由页面时，控制三级列表的显示与隐藏
      if (this.$route.name == "search" ||this.$route.name == "detail") {
        this.$refs.showList.style.display = "none";
      }
    },
    resetParams(){
      this.searchParams.category3Id = '';
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
    },
    goSearch(event) {
      event.preventDefault();
      const location = {
        path: "/search",
        name:'search'
      };
      const ele = event.target;
      if (ele.tagName == "A") {
        let eleset = ele.dataset;
        if (eleset.category1id) {
          location.query = {
            category1Id: eleset.category1id,
            categoryName: eleset.category1Name,
          };
        } else if (eleset.category2id) {
          location.query = {
            category2Id: eleset.category2id,
            categoryName: eleset.category2Name,
          };
        } else {
          location.query = {
            category3Id: eleset.category3id,
            categoryName: eleset.category3Name,
          };
        }
        if (this.$route.params.keyword) {
          location.params = this.$route.params;
        }else{
          location.parms= {
            keyword:undefined
          };
        }
        this.resetParams();
        this.$store.dispatch("searchModule/getSearchList",Object.assign(this.searchParams,location.query));
        //通知header清空search
        this.$bus.$emit('clearSearch');
        this.$router.push(location);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .cur {
      background-color: lightblue;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
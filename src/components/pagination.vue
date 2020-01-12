<template>
  <div class="main_container">
    <div class="list_container">
      <ul
        v-for="p in paginatedData"
        v-bind:class="[tileView ? 'tyle_view' : '']"
      >
        <li v-bind:class="[tileView ? ['tyle_view_item'] : '']"><img :class="tileView ? 'tyle_view_item_img': ''" src="../../src/assets/logo.png" alt="logo" /></li>
        <li v-bind:class="[tileView ? ['tyle_view_item', 'tyle_view_item_title' ] : '']">{{ p.title }}</li>
        <li v-bind:class="[tileView ? ['tyle_view_item', 'tyle_view_display_none'] : '']">{{ p.creator }}</li>
        <li v-bind:class="[tileView ? ['tyle_view_item', 'tyle_view_item_inch'] : '']">{{ p.inch }}" ({{ Math.floor(p.inch * 2.54) }}см)</li>
        <li v-bind:class="[tileView ? ['tyle_view_item', 'tyle_view_display_none'] : '']">{{ p.OLED ? "QLED" : "LED" }}</li>
        <li v-bind:class="[tileView ? 'tyle_view_item' : '']">{{ p.ultraHD ? "Ultra HD (4K)" : "FullHD" }}</li>
        <li v-bind:class="[tileView ? ['tyle_view_item', 'tyle_view_item_price'] : '']">{{ p.price }} ₽</li>

        <li v-bind:class="[tileView ? ['tyle_view_item', 'tyle_view_item_cube'] : '']">
          <i
            v-bind:class="[p.View3D ? 'filterItem'  : '']"
            class=" fas fa-cube"
          ></i>
        </li>
        <li v-bind:class="[tileView ? ['tyle_view_item','tyle_view_item_tv'] : '']">
          <i
            v-bind:class="[p.curveDisplay ? 'filterItem' : '']"
            class="fas fa-tv"
          ></i>
        </li>
        <li v-bind:class="[tileView ? ['tyle_view_item','tyle_view_item_star'] : '']">
          <i
            v-bind:class="[p.favorite ? 'filterItem' : '']"
            class="fas fa-star"
          ></i>
        </li>
      </ul>
    </div>
    <button
      class="btn btn-primary btn-custom"
      v-if="pageNumber < pageCount"
      @click="nextPage"
    >
      Показать еще {{ size }} из {{ filtredList.length }}
    </button>

    <button
            v-else
            class="btn btn-primary btn-custom"
            disabled
            @click="nextPage"
    >
      Показать больше нечего :(
    </button>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      pageNumber: 0
    };
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 20
    },
    filter3d: {
      type: Boolean,
      required: true
    },
    filterCurved: {
      type: Boolean,
      required: true
    },
    priceValue: {
      type: Array,
      required: true
    },
    tileView: {
      type: Boolean,
      required: true
    },
    sortParam: {
      type: Object,
      required: true
    },
    creatorSelect: {
      type: String,
      required: true
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    sortByTitle(a, b) {
      if (a[this.sortParam.name] > b[this.sortParam.name]) {
        if (!this.sortParam.possive) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a[this.sortParam.name] < b[this.sortParam.name]) {
        if (!this.sortParam.possive) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    },
    sortByNumb(a, b) {
      if (!this.sortParam.possive) {
        return a[this.sortParam.name] - b[this.sortParam.name];
      } else {
        return b[this.sortParam.name] - a[this.sortParam.name];
      }
    }
  },
  computed: {
    filtredList: function() {
      return this.listData.filter(item => {
        let isGood = true;

        isGood &= item.price >= this.priceValue[0];
        isGood &= item.price <= this.priceValue[1];

        this.filter3d ? (isGood &= item.View3D) : "";

        this.filterCurved ? (isGood &= item.curveDisplay) : "";

        !(this.creatorSelect === '') ? isGood &= (this.creatorSelect === item.creator) : "";


        return isGood;
      });
    },
    pageCount() {
      let l = this.filtredList.length,
        s = this.size;
      return Math.floor(l / s);
    },
    paginatedData() {
      const start = 0,
        end = this.pageNumber * this.size + this.size;
      return this.sortedList.slice(start, end);
    },
    sortedList: function() {
      let finalList = this.filtredList;

      switch (this.sortParam.name) {
        case "title":
        case "creator":
          return finalList.sort(this.sortByTitle);
        case "inch":
          return finalList.sort(this.sortByNumb);
        case "OLED":
          return finalList.sort(this.sortByTitle);
        case "ultraHD":
          return finalList.sort(this.sortByTitle);
        case "price":
          return finalList.sort(this.sortByNumb);
        default:
          return finalList;
      }
    }
  }
};
</script>

<style scoped>
.list_container {
  width: 1250px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list_container ul {
  width: 100%;
  display: flex;
  /*justify-content: space-around;*/
  align-items: center;
  height: 160px;
  border-radius: 25px;
  box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.37);
}

.list_container ul li {
  text-align: left;
  /*width: 155px;*/
  display: inline-block;
}
.list_container ul li:nth-child(1) {
  margin-left: 20px;
}

.list_container ul li:nth-child(2) {
  width: 120px;
  margin-right: 40px;
}

.list_container ul li:nth-child(3) {
  width: 150px;
  margin-right: 20px;
}

.list_container ul li:nth-child(4) {
  width: 105px;
  margin-right: 40px;
}

.list_container ul li:nth-child(5) {
  width: 115px;
  margin-right: 40px;
}

.list_container ul li:nth-child(6) {
  width: 120px;
  margin-right: 40px;
}

.list_container ul li:nth-child(7) {
  width: 100px;
  margin-right: 90px;
}

.list_container ul li:nth-child(8) {
  width: 25px;
  margin-right: 20px;
}

.list_container ul li:nth-child(9) {
  width: 25px;
  margin-right: 20px;
}

.list_container ul li:nth-child(10) {
  width: 25px;
}

.btn_container {
  width: 148px;
  margin: 0 auto;
}

.btn-custom {
  width: 250px;
}

.list_container ul li img {
  width: 100px;
  margin-right: 20px;
}

.filterItem {
  color: #0003ff;
}

.tyle_view {
  width: 400px !important;
  height: 400px !important;
  flex-direction: column;
  display: inline-block !important;
  padding-left: 20px !important;
  position: relative;
}

.tyle_view_item {
  margin: 0 !important;
  width: 100% !important;
}

button {
  display: block;
  margin: 0 auto 50px;
}

.tyle_view_item_img {
  width: 200px !important;
  margin: 70px 0 10px 80px;
}
.tyle_view_item_title{
  font-size: 22px;
  font-weight: bold;
}
.tyle_view_display_none {
  display: none !important
}

.tyle_view_item_inch {
  position: absolute;
  bottom: 30px;
  left: 280px;
  font-size: 18px !important;
  font-weight: bold;
  display: inline-block;
  width: 110px !important;
}

.tyle_view_item_price {
  position: absolute;
  bottom: 30px;
  left: 20px;
  font-size: 18px !important;
  font-weight: bold;
  display: inline-block;
}

.tyle_view_item_cube {
  position: absolute;
  top: 10px;
  left: 25px;
  font-size: 24px !important;
  display: inline-block;
  width: 28px !important;
}

.tyle_view_item_tv {
  position: absolute;
  top: 10px;
  left: 65px;
  font-size: 24px !important;
  display: inline-block;
  width: 28px !important;
}

.tyle_view_item_star {
  position: absolute;
  top: 10px;
  left: 350px;
  font-size: 24px !important;
  display: inline-block;
  width: 28px !important;
}

.tyle_view_item_title {
  font-size: 18px !important;
}

  @media screen and (max-width: 1250px) {
    .list_container {
      width: 100%;
      justify-content: space-around;
    }

    .list_container ul li {
      font-size: 12px
    }

    .list_container ul li:nth-child(2) {
      width: calc(120 / 1250 * 100%);
      margin-right: calc(40 / 1250 * 100%);
      min-width: 89px;
    }

    .list_container ul li:nth-child(3) {
      width: calc(150 / 1250 * 100%);
      margin-right: calc(20 / 1250 * 100%);

    }

    .list_container ul li:nth-child(4) {
      width: calc(105 / 1250 * 100%);
      margin-right: calc(40 / 1250 * 100%);
      min-width: 74px;
    }

    .list_container ul li:nth-child(5) {
      width: calc(115 / 1250 * 100%);
      margin-right: calc(40 / 1250 * 100%);
    }

    .list_container ul li:nth-child(6) {
      width: calc(120 / 1250 * 100%);
      margin-right: calc(40 / 1250 * 100%);
      min-width: 80px;
    }

    .list_container ul li:nth-child(7) {
      width: calc(100 / 1250 * 100%);
      margin-right: calc(90 / 1250 * 100%);
      min-width: 57px;
    }

    .list_container ul li:nth-child(8) {
      width: calc(25 / 1250 * 100%);
      margin-right: calc(20 / 1250 * 100%);
    }

    .list_container ul li:nth-child(9) {
      width: calc(25 / 1250 * 100%);
      margin-right: calc(20 / 1250 * 100%);
    }

    .list_container ul li:nth-child(10) {
      width: calc(25 / 1250 * 100%);
    }


  }

  @media screen and (max-width: 960px) {

    .list_container ul li img {
      width: 100%;
    }

    .list_container ul li:nth-child(1) {
      width: calc(100 / 1250 * 100%);
      margin-left: calc(20 / 1250 * 100%);
      margin-right: calc(20 / 1250 * 100%)
    }

  }

  @media screen and (max-width: 720px) {

    .list_container ul{
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      height: 60px;
    }

    .list_container ul li {
      text-align: center;
      margin: 0 !important;
    }

    .list_container ul li:nth-child(1) {
      width: 60px;
    }

    .list_container ul li:nth-child(10) {
      width: calc(25 / 1250 * 100% + 6px);
    }

    ul.tyle_view li{
      text-align: left;
    }


  }

  @media screen and (max-width: 480px) {
    .tyle_view {
      width: calc(400vw / 4.8)  !important;
      height: calc(400vw / 4.8) !important;
      padding-left: calc(20vw / 4.8) !important;
    }

    .tyle_view_item_img {
      width: calc(200vw / 4.8) !important;
      margin: calc(70vw / 4.8) 0 calc(10vw / 4.8) calc(80vw / 4.8);
    }
    .tyle_view_item_title{
      font-size: calc(22vw / 4.8);
    }

    .tyle_view_item_inch {
      bottom: calc(30vw / 4.8);
      left: calc(280vw / 4.8);
      font-size: calc(18vw / 4.8) !important;
    }

    .tyle_view_item_price {
      bottom: calc(30vw / 4.8);
      left: calc(20vw / 4.8);
      font-size: calc(18vw / 4.8) !important;
    }

    .tyle_view_item_cube {
      top: calc(10vw / 4.8);
      left: calc(25vw / 4.8);
      font-size: calc(24vw / 4.8) !important;
      width: calc(28vw / 4.8) !important;
    }

    .tyle_view_item_tv {
      top: calc(10vw / 4.8);
      left: calc(65vw / 4.8);
      font-size: calc(24vw / 4.8) !important;
      width: calc(28vw / 4.8) !important;
    }

    .tyle_view_item_star {
      top: calc(10vw / 4.8);
      left: calc(350vw / 4.8);
      font-size: calc(24vw / 4.8) !important;
      width: calc(28vw / 4.8) !important;
    }

    .tyle_view_item_title {
      font-size: calc(18vw / 4.8) !important;
    }
  }


</style>

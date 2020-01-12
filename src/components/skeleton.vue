<template>
  <div class="body">
    <div class="nav_bar">
      <div class="flex_wrapper">
        <div class="left_side">
          <div class="price">
            <label class="price_lbl">Цена, </label>
            <input
              type="text"
              class="price_input"
              :placeholder="value[0] + ' - ' + value[1]"
              disabled
            />
            <vue-slider
                    v-model="value"
                    :enable-cross="false"
                    v-bind:min="0"
                    v-bind:max="findMaxPrice"
            ></vue-slider>
          </div>
          <div class="manufacturer">
            <label for="manufact" class="manufact_lbl">Производитель</label>
            <select name="manufacturer_title" id="manufact" v-model="creatorSelect">
              <option value="" selected>Все производители</option>
              <option v-for="(c, i) in findAllCreator" :key="`option-${i}`" :value="c" >{{ c }}</option>
            </select>
          </div>
        </div>
        <div class="right_side">
          <myCheckBox v-model="checked_3d">
            <i class=" fas fa-cube"></i> Поддержка 3D</myCheckBox
          >
          <myCheckBox v-model="checked_curve_display"
            ><i class="fas fa-tv"></i> Изогнутый экран</myCheckBox
          >
        </div>
      </div>

      <p class="reset_filter">
        <a href="#" v-on:click.prevent="resetFilter">Сбросить фильтр</a>
      </p>
    </div>
    <div class="section_title">
      <ul>
        <li
          v-for="(s, j) in sortMethods"
          :key="`sort-methods-${j}`" 
          @click="sortFunc(s)"
          :class="[sortParam.name === s.name ? 'select_sort' : '']"
        >
          {{ s.title }}
          <i
            v-if="sortParam.name === s.name && sortParam.possive === true"
            class="fas fa-chevron-up"
          ></i>
          <i v-else class="fas fa-chevron-down"></i>
        </li>

        <li class="tile">
          <svg
            @click="tileView = false"
            v-bind:fill="[!tileView ? '#0003ff' : '']"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 612 612"
            style="enable-background:new 0 0 612 612; cursor: pointer"
            xml:space="preserve"
          >
            <g>
              <g id="_x33__32_">
                <g>
                  <path
                    d="M59.226,88.839C26.513,88.839,0,115.352,0,148.064s26.513,59.226,59.226,59.226s59.226-26.514,59.226-59.226
                    S91.938,88.839,59.226,88.839z M59.226,246.774C26.513,246.774,0,273.288,0,306c0,32.713,26.513,59.226,59.226,59.226
                    s59.226-26.513,59.226-59.226C118.452,273.288,91.938,246.774,59.226,246.774z M59.226,404.71C26.513,404.71,0,431.223,0,463.936
                    c0,32.712,26.513,59.226,59.226,59.226s59.226-26.514,59.226-59.226C118.452,431.223,91.938,404.71,59.226,404.71z
                     M197.419,187.548h375.096c21.815,0,39.484-17.669,39.484-39.484s-17.669-39.484-39.484-39.484H197.419
                    c-21.815,0-39.484,17.669-39.484,39.484S175.604,187.548,197.419,187.548z M572.516,266.516H197.419
                    c-21.815,0-39.484,17.669-39.484,39.484c0,21.814,17.669,39.484,39.484,39.484h375.096c21.815,0,39.484-17.67,39.484-39.484
                    C612,284.185,594.331,266.516,572.516,266.516z M572.516,424.451H197.419c-21.815,0-39.484,17.67-39.484,39.484
                    s17.669,39.483,39.484,39.483h375.096c21.815,0,39.484-17.669,39.484-39.483S594.331,424.451,572.516,424.451z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </li>
        <li class="tile">
          <svg
            @click="tileView = true"
            v-bind:fill="[tileView ? '#0003ff' : '']"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 511.626 511.627"
            style="enable-background:new 0 0 511.626 511.627; cursor: pointer"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M301.492,347.177h-91.361c-7.614,0-14.084,2.662-19.414,7.994c-5.33,5.331-7.992,11.8-7.992,19.41v54.823
                  c0,7.611,2.662,14.089,7.992,19.417c5.327,5.328,11.8,7.987,19.414,7.987h91.361c7.618,0,14.086-2.662,19.418-7.987
                  c5.325-5.331,7.994-11.806,7.994-19.417v-54.823c0-7.61-2.662-14.085-7.994-19.41S309.11,347.177,301.492,347.177z"
                />
                <path
                  d="M118.771,347.177H27.406c-7.611,0-14.084,2.662-19.414,7.994C2.663,360.502,0,366.974,0,374.585v54.826
                  c0,7.61,2.663,14.086,7.992,19.41c5.33,5.332,11.803,7.991,19.414,7.991h91.365c7.611,0,14.084-2.663,19.414-7.991
                  c5.33-5.324,7.992-11.8,7.992-19.41v-54.826c0-7.611-2.662-14.083-7.992-19.411S126.382,347.177,118.771,347.177z"
                />
                <path
                  d="M118.771,54.814H27.406c-7.611,0-14.084,2.663-19.414,7.993C2.663,68.137,0,74.61,0,82.221v54.821
                  c0,7.616,2.663,14.091,7.992,19.417c5.33,5.327,11.803,7.994,19.414,7.994h91.365c7.611,0,14.084-2.667,19.414-7.994
                  s7.992-11.798,7.992-19.414V82.225c0-7.611-2.662-14.084-7.992-19.417C132.855,57.48,126.382,54.814,118.771,54.814z"
                />
                <path
                  d="M301.492,200.999h-91.361c-7.614,0-14.084,2.664-19.414,7.994s-7.992,11.798-7.992,19.414v54.823
                  c0,7.61,2.662,14.078,7.992,19.406c5.327,5.329,11.8,7.994,19.414,7.994h91.361c7.618,0,14.086-2.665,19.418-7.994
                  c5.325-5.328,7.994-11.796,7.994-19.406v-54.823c0-7.616-2.662-14.087-7.994-19.414S309.11,200.999,301.492,200.999z"
                />
                <path
                  d="M118.771,200.999H27.406c-7.611,0-14.084,2.664-19.414,7.994C2.663,214.32,0,220.791,0,228.407v54.823
                  c0,7.61,2.663,14.078,7.992,19.406c5.33,5.329,11.803,7.994,19.414,7.994h91.365c7.611,0,14.084-2.665,19.414-7.994
                  c5.33-5.328,7.992-11.796,7.992-19.406v-54.823c0-7.616-2.662-14.087-7.992-19.414S126.382,200.999,118.771,200.999z"
                />
                <path
                  d="M503.632,62.811c-5.332-5.327-11.8-7.993-19.41-7.993h-91.365c-7.61,0-14.086,2.663-19.417,7.993
                  c-5.325,5.33-7.987,11.803-7.987,19.414v54.821c0,7.616,2.662,14.083,7.987,19.414c5.331,5.327,11.807,7.994,19.417,7.994h91.365
                  c7.61,0,14.078-2.667,19.41-7.994s7.994-11.798,7.994-19.414V82.225C511.626,74.613,508.964,68.141,503.632,62.811z"
                />
                <path
                  d="M301.492,54.818h-91.361c-7.614,0-14.084,2.663-19.414,7.993s-7.992,11.803-7.992,19.414v54.821
                  c0,7.616,2.662,14.083,7.992,19.414c5.327,5.327,11.8,7.994,19.414,7.994h91.361c7.618,0,14.086-2.664,19.418-7.994
                  c5.325-5.327,7.994-11.798,7.994-19.414V82.225c0-7.611-2.662-14.084-7.994-19.414C315.578,57.484,309.11,54.818,301.492,54.818z"
                />
                <path
                  d="M484.222,200.999h-91.365c-7.61,0-14.086,2.664-19.417,7.994c-5.325,5.33-7.987,11.798-7.987,19.414v54.823
                  c0,7.61,2.662,14.078,7.987,19.406c5.331,5.329,11.807,7.994,19.417,7.994h91.365c7.61,0,14.085-2.665,19.41-7.994
                  c5.332-5.328,7.994-11.796,7.994-19.406v-54.823c0-7.616-2.662-14.087-7.994-19.414
                  C498.3,203.663,491.833,200.999,484.222,200.999z"
                />
                <path
                  d="M484.222,347.177h-91.365c-7.61,0-14.086,2.662-19.417,7.994c-5.325,5.331-7.987,11.8-7.987,19.41v54.823
                  c0,7.611,2.662,14.089,7.987,19.417c5.331,5.328,11.807,7.987,19.417,7.987h91.365c7.61,0,14.085-2.662,19.41-7.987
                  c5.332-5.331,7.994-11.806,7.994-19.417v-54.823c0-7.61-2.662-14.085-7.994-19.41S491.833,347.177,484.222,347.177z"
                />
              </g>
            </g>
          </svg>
        </li>
      </ul>
    </div>
    <pagination
      :list-data="productList"
      :filter3d="checked_3d"
      :filter-curved="checked_curve_display"
      :price-value="value"
      :tile-view="tileView"
      :sort-param="sortParam"
      :creator-select="creatorSelect"
    ></pagination>
  </div>
</template>

<script>
import myCheckBox from "./MyCheckBox.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import productList from "../../productList.json";
import pagination from "./pagination.vue";

export default {
  name: "skeleton",
  data: function() {
    return {
      creatorSelect: '',
      sortParam: {},
      checked_3d: false,
      checked_curve_display: false,
      value: [0, 150000],
      productList,
      tileView: false,
      sortMethods: [
        {
          name: "title",
          title: "Название",
          possive: false
        },
        {
          name: "creator",
          title: "Производители",
          possive: false
        },
        {
          name: "inch",
          title: "Диагональ",
          possive: false
        },
        {
          name: "OLED",
          title: "Технология",
          possive: false
        },
        {
          name: "ultraHD",
          title: "Разрешение",
          possive: false
        },
        {
          name: "price",
          title: "Цена",
          possive: false
        }
      ]
    };
  },
  components: {
    myCheckBox,
    VueSlider,
    pagination
  },
  methods: {
    resetFilter() {
      this.checked_3d = false;
      this.checked_curve_display = false;
    },
    sortFunc(s) {
      if (this.sortParam.name === s.name) {
        this.sortParam.possive = !this.sortParam.possive;
      } else {
        this.sortParam = s;
      }
    }
  },
  computed: {
    findMaxPrice() {
      let max = this.productList[0].price;

      for (let i = 0; i < this.productList.length; i++) {
        if (max < this.productList[i].price) {
          max = this.productList[i].price;
        }
      }

      return max;
    },
    findAllCreator() {
      let creator = [];
      for (let i = 0; i < this.productList.length; i++) {
        creator.push(this.productList[i].creator);
      }

      function unique(arr) {
        var obj = {};

        for (var i = 0; i < arr.length; i++) {
          var str = arr[i];
          obj[str] = true; // запомнить строку в виде свойства объекта
        }

        return Object.keys(obj); // или собрать ключи перебором для IE8-
      }

      return unique(creator.sort());
    }
  }
};
</script>

<style>
.body {
  border-top: 50px solid #0003ff;
  padding-top: 100px;
}

.nav_bar {
  width: 1250px;
  margin: 0 auto 50px;
  height: 200px;
  padding: 45px 100px 0;
  border-radius: 25px;
  background: linear-gradient(to right, #3e4aff, #3cb6ff);
}

.flex_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.price_input {
  width: 180px;
  height: 55px;
  border-radius: 10px;
  margin-bottom: 10px;
  outline: none;
  border: none;
  padding: 0 10px;
  text-align: center;
  letter-spacing: 1px;
}

.price {
  width: 180px;
}

vue-slider {
  width: 180px;
}

.price_lbl,
.manufact_lbl {
  display: inline-block;
  color: white;
  margin-bottom: 10px;
}
.manufact_lbl {
  display: block;
}
.price_lbl {
  margin-right: 178px;
}
#manufact {
  width: 180px;
  height: 55px;
  border: none;
  outline: none;
}

.left_side {
  display: flex;
}

.right_side {
  display: flex;
}

.price {
  margin-right: 40px;
}

.reset_filter {
  text-align: right;
}

.reset_filter a {
  color: white;
}

.section_title ul li {
  display: inline-block;
  color: #7a7a7a;
  text-align: left;
  cursor: pointer;
}

.section_title ul li:nth-child(1) {
  margin-left: 140px;
  width: 120px;
  margin-right: 40px;
}

.section_title ul li:nth-child(2) {
  width: 150px;
  margin-right: 20px;
}

.section_title ul li:nth-child(3) {
  width: 105px;
  margin-right: 40px;
}

.section_title ul li:nth-child(4) {
  width: 115px;
  margin-right: 40px;
}

.section_title ul li:nth-child(5) {
  width: 120px;
  margin-right: 40px;
}
.section_title ul li:nth-child(6) {
  width: 100px;
  margin-right: 125px;
}

.section_title ul li:nth-child(7) {
  width: 25px;
  margin-right: 30px;
}

.section_title ul li:nth-child(8) {
  width: 25px;
}

.section_title ul {
  display: flex;
  /*justify-content: space-around;*/
  width: 1250px;
  margin: 0 auto 30px;
}

.select_sort {
  font-weight: bold;
}

  @media screen and (max-width: 1250px) {
    .body {
      padding-left: 10px;
      padding-right: 10px;
    }
    .nav_bar {
      width: 100%
    }
    .section_title {
      width: 100%
    }
    .section_title ul {
      width: 100%
    }

    .section_title ul li {
      font-size: 12px;
    }

    .section_title ul li:nth-child(1) {
      width: calc(120/1250 * 100%);
      margin-right: calc(40/1250 * 100%);
      min-width: 72px;
    }

    .section_title ul li:nth-child(2) {
      width: calc(150/1250 * 100%);
      margin-right: calc(20/1250 * 100%);
      min-width: 109px;
    }

    .section_title ul li:nth-child(3) {
      width: calc(105/1250 * 100%);
      margin-right: calc(40/1250 * 100%);
      min-width: 77px;
    }

    .section_title ul li:nth-child(4) {
      width: calc(115/1250 * 100%);
      margin-right: calc(40/1250 * 100%);
      min-width: 84px;
    }

    .section_title ul li:nth-child(5) {
      width: calc(120/1250 * 100%);
      margin-right: calc(40/1250 * 100%);
      min-width: 92px;
    }
    .section_title ul li:nth-child(6) {
      width: calc(100/1250 * 100%);
      margin-right: calc(125/1250 * 100%);
      min-width: 45px;
    }

    .section_title ul li:nth-child(7) {
      width: calc(25/1250 * 100%);
      margin-right: calc(30/1250 * 100%);
    }

    .section_title ul li:nth-child(8) {
      width: calc(25 / 1250 * 100%);
    }

  }

  @media screen and (max-width: 1060px) {
    .nav_bar {
      height: 278px;
    }
    .flex_wrapper {
      flex-direction: column
    }
    .ckb_view_3d_lbl:nth-child(1) {
      margin: 0;
    }
    .left_side {
      margin-bottom: 10px;
    }
    .reset_filter {
      text-align: center;
    }
  }

  @media screen and (max-width: 960px) {
    .section_title ul li:nth-child(1) {
      margin-left: calc(140 / 1250 * 100%)
    }

    .section_title ul li:nth-child(1) {
      margin-left: calc(140 / 1250 * 100%)
    }

    .section_title ul li:nth-child(6) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 720px) {
    .select_sort {
      font-size: 11px !important;
    }

    .section_title ul {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      height: 40px;
    }

    .section_title ul li {
      margin: 0 !important;
    }

  }

  @media screen and (max-width: 480px) {
    .nav_bar {
      height: calc(278vw / 4.8 + 25px);
    }

    .price_input {
      width: calc(180vw / 4.8);
      height: calc(55vw / 4.8);
      border-radius: calc(10vw / 4.8);
      margin-bottom: calc(10vw / 4.8);
      padding: 0 calc(10vw / 4.8);
    }

    .price {
      width: calc(180vw / 4.8);
    }

    .price_lbl,
    .manufact_lbl {
      margin-bottom: calc(10vw / 4.8);
      font-size: calc(16vw / 4.8)
    }
    .manufact_lbl {
      display: block;
    }
    .price_lbl {
      margin-right: calc(178vw / 4.8);
    }
    #manufact {
      width: calc(180vw / 4.8);
      height: calc(55vw / 4.8);
      font-size: calc(16vw / 4.8)
    }
    vue-slider {
      width: calc(180vw / 4.8)
    }
    .flex_wrapper {
      margin-bottom: calc( 10vw / 4.8);
    }
    .reset_filter {
      font-size: calc(16vw / 4.8)
    }

  }

</style>

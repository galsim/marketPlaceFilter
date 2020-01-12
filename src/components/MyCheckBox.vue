<template>
    <label
      class="ckb_view_3d_lbl"
      v-bind:class="{ active: value }"
      >
      <input
              type="checkbox"
              class="ckb_view_3d "
              checked="value"
              @input="$emit('input', !value)"
      />
      <slot></slot>
    </label>
</template>

<script>
export default {
  name: "MyCheckbox",
  props: ['value']
};
</script>

<style scoped>
.ckb_view_3d {
  display: none;
}

.ckb_view_3d_lbl {
  display: inline-block;
  width: 180px;
  height: 55px;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  text-align: center;
  padding-top: 16px;
  cursor: pointer;
}

.ckb_view_3d_lbl {
  margin-left: 50px;
}

.active {
  color: #3e4aff;
  background: white;
}

@media screen and (max-width: 480px) {
    .ckb_view_3d_lbl {
        width: calc(180vw / 4.8);
        height: calc(55vw / 4.8);
        border-radius: calc(10vw / 4.8);
        padding-top: calc(16vw / 4.8);
        font-size: calc(16vw / 4.8)
    }

    .ckb_view_3d_lbl {
        margin-left: calc(50vw / 4.8);
    }
}
</style>

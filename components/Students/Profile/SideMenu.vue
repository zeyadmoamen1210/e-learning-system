<template>
  <div class="sidebar-outer mb-5">
    <div class="sidebar">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <nuxt-link :to="item.link" class="align-items-center">
            <font-awesome-icon :icon="item.iconClasses" style="color: #ccc" />
            <span> {{item.title}} </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      required: true,
      type: Array,
    }
  }
}
</script>

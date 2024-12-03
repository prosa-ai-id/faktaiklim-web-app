<template>
  <q-breadcrumbs class="breadcrumbs">
    <template #separator>
      <q-icon
        size="1.5em"
        name="chevron_right"
        style="position:relative; top:-1px;"
      />
    </template>
    <q-breadcrumbs-el
      :label="first"
      :class="second === '' ? 'active-breadcrumbs' : 'passive-breadcrumbs'"
      @click="goTo(firstLink)"
    />
    <q-breadcrumbs-el
      v-if="second"
      :label="second"
      :class="third === '' ? 'active-breadcrumbs' : 'passive-breadcrumbs'"
      @click="goTo(secondLink)"
    />
    <q-breadcrumbs-el
      v-if="third"
      :label="third"
      :class="fourth === '' ? 'active-breadcrumbs' : 'passive-breadcrumbs'"
      @click="goTo(thirdLink)"
    />
    <q-breadcrumbs-el
      v-if="fourth"
      :label="fourth"
      class="active-breadcrumbs"
    />
  </q-breadcrumbs>
</template>

<script>
export default {
  props: {
    first: {
      type: String,
      required: true
    },
    firstLink: {
      type: String,
      default: ''
    },
    second: {
      type: String,
      default: ''
    },
    secondLink: {
      type: String,
      default: ''
    },
    third: {
      type: String,
      default: ''
    },
    thirdLink: {
      type: String,
      default: ''
    },
    fourth: {
      type: String,
      default: ''
    }
  },
  methods: {
    goTo (url) {
      if (url) {
        if (this.$route.path !== url) {
          this.$router.push(url)
        }
      }
    }
  }
}
</script>

<style>
.active-breadcrumbs {
  color:#1D84EF;
}
.passive-breadcrumbs {
  color:#686980;
  cursor:pointer;
}
@media (max-width:768px) {
  .breadcrumbs {
    font-size:12px;
  }
}
@media (min-width:769px) {
  .breadcrumbs {
    font-size:14px;
  }
}
</style>

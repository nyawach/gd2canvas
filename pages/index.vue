<template lang="pug">
section.container
  h1.title
    | gd2canvas
  ul.list
    li.item(v-for="link in linkList"): router-link.link(:to="`/${link}/`") {{ link }}
</template>

<script>

export default {
  name: 'index',
  data: () => ({
    linkList: [
      '1',
    ],
  }),
}
</script>

<style lang="scss" scoped>

.title {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
}

.list {
  margin: 40px 0;
}

.item {
  display: block;
  text-align: center;
}

.link {
  text-decoration: none;
  padding: 10px 14px;
  &:hover {
    text-decoration: underline;
  }
}
</style>

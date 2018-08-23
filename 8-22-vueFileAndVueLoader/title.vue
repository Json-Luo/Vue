<template>
    <h1>
        <a :href="'#' + title">{{ title }}</a>
    </h1>
</template>

<script>
    export default {
        // 限制 title 的属性只能是字符串
        props: {
            title: {
                type: String
            }
        }
    }
</script>

<style scoped>
    h1 a {
        color: #3399ff;
        font-size: 24px;
    }
</style>
<template>
    <div>
        <!--
            router-view 标签用来挂在所有路由组件，会根据当前路由动态渲染不同的页面组件，页面中的公共部分，可以直接写在 template 中
            与 router-view 同级，路由切换时，切换的只是 router-view 挂在的组件，其他内容不变
         -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
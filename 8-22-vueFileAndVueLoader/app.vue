<template>
    <div>
        <!--Hello {{ name }}!-->
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="./assets/dargon.gif">
            <img src="./assets/flower.jpg">
        </p>
    </div>
</template>

<script>
    // 改写 app 组件，引入 title 和 button 组件
    import vTitle from './title.vue';
    import vButton from './button.vue';

    export default {
        components: {
            vTitle,
            vButton
        },
        methods: {
            // 接收子组件的参数 e
            handleClick (e) {
                console.log(e);
            }
        }
    }
</script>

<style scoped>
    /*
     * scoped 表示这里面的 css 样式仅仅作用于此文件
     */
    div {
        color: #f60;
        font-size: 24px;
    }
</style>
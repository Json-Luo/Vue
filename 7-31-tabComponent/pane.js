Vue.component('pane', {
    name: 'pane',
    template: `
    <div class="pane" v-show="show">
        <slot></slot>
    </div>`,
    data: function () {
        // 用于控制标签页的内容展示与隐藏
        return {
            show: true
        }
    },
    props: {
        // pane 组件的唯一标识 用来区分几个 pane   label 则是标签页的标题 初始化 pane 时以及更新 label 时都要通知父组件及时更新
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateNav () {
            // 使用 $parent 来访问父组件 tab 组件来更新标题
            this.$parent.updateNav();
        }
    },
    watch: {
        // 监听 label 的更新时 调用 updateNav 更新标题
        label () {
            this.updateNav();
        }
    },
    mounted () {
        // 初始化 pane 的时候更新标题
        this.updateNav();
    }
});
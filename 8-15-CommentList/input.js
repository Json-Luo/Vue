//  render 函数里面的 v-model 数据双向绑定得自己实现
Vue.component('vInput', {
    props: {
        //  接收来自父组件的变量, 双向绑定时只能使用 value 单向绑定的时候也被限死了
        value: {
            type: [String, Number],
            default: ''
        }
    },
    render (h) {
        let _this = this;
        return h('div', [
            h('span', '昵称：'),
            h('input', {
                attrs: {
                    type: 'text',
                    placeholder: '请输入昵称'
                },
                domProps: {
                    // 将接收到的父组件变量赋值给虚拟 DOM input 的 value
                    value: this.value
                },
                on: {
                    input (event) {
                        // 监听 input 的输入事件, 抛出 input 事件实现数据双向绑定
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    }
});

Vue.component('vTextarea', {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    render (h) {
        let _this = this;
        return h('div', [
            h('span', '留言内容：'),
            h('textarea', {
                attrs: {
                    placeholder: '请输入留言内容'
                },
                domProps: {
                    value: this.value
                },
                on: {
                    input (event) {
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    },
    methods: {
        focus () {
            // 还是通过 refs 来选择到这个组件进行聚焦 focus 操作 TODO：暂时这个做法报错
            this.$refs.message.focus();
        }
    }
});
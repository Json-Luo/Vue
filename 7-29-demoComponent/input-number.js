Vue.component('input-number', {
    template: `
    <div class="input-number">
        <input type="text" :value="currentValue" @change="handleChange">
        <button :disabled="currentValue <= min" @click="handleDown">-</button>
        <button :disabled="currentValue >= max" @click="handleUp">+</button>
    </div>`,
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    // 子组件不修改父组件的 value 创建并维护自己的 currentValue
    data: () => ({currentValue: this.value}),
    // 第二种写法 初始化内部 value 时过滤，也可以在生命钩子函数 mounted 中实现初始化
    // data: () => {
    //     let temp = this.value;
    //     if (temp > this.max) temp = this.max;
    //     if (temp < this.min) temp = this.min;
    //     return { currentValue: temp };
    // },
    watch: {
        currentValue (val) {
            // 监听子组件的 value 发生变化的时候抛出 input 事件直接同步修改父组件 v-model 的 value 值
            this.$emit('input', val);
            // 此自定义事件暂未使用，但是可以用来提醒父组件 input 内容已经发生改变 其实也可以在父组件里面 watch value 值的变化
            this.$emit('on-change', val);
        },
        value (val) {
            // 监听 value  发生变化的时候更新子组件维护的内部 value
            this.updateValue(val);
        }
    },
    methods: {
        handleDown () {
            if (this.currentValue <= this.min) return;
            // this.currentValue -= 1;
            --this.currentValue;
        },
        handleUp () {
            if (this.currentValue >= this.max) return;
            // this.currentValue += 1;
            ++this.currentValue;
        },
        handleChange (e) {
            // 获取 input 内容 并且过滤规范输入内容
            let val = e.target.value.trim();
            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;

                if (val > this.max) this.currentValue = this.max;
                if (val < this.min) this.currentValue = this.min;
            } else {
                // 加入输入的不是数字的话 强行改变成之前的内部 value
                e.target.value = this.currentValue;
            }
        },
        updateValue (val) {
            // 将过滤干净的数据赋值给子组件维护的数据变量
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        }
    },
    mounted () {
        // 第一种写法 初始化的时候过滤
        // 此方法是用来过滤父组件传递过来的数据的 因为他不一定符合要求
        this.updateValue(this.value);
    }
});

// 检测数字函数
function isValueNumber(val) {
    // test 函数用来检测是否符合正则规则
    return (/(^-?[0-9]+\.{1}\d$) | (^-?[0-9][0-9]*$) | (^-?0{1}$)/).test(val + '');
}
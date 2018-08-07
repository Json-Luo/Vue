Vue.component('tabs', {
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <!-- tabs 标题，这里用 v-for 循环标题 -->
            <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">
                {{ item.label }}
            </div>
        </div>
        <div class="tabs-content">
            <!-- 这里的 slot 就是嵌套内容组件的 pane -->
            <slot></slot>
        </div>
    </div>`,
    data () {
        return {
            // 用于渲染 tabs 标题
            navList: [],
            // 不方便修改 value 所以复制一份自己维护
            currentValue: this.value
        }
    },
    props: {
        // 这里的 value 是为了方便使用 v-model
        value: {
            type: [String, Number]
        }
    },
    methods: {
        getTabs () {
            // 通过遍历子组件获取所有 pane 组件
            return this.$children.filter((item) => item.$options.name === 'pane');
        },
        updateNav () {
            this.navList = [];
            // 设置对 this 的引用，在 function 的回调里，this 并不是指向 vue
            let _this = this;
            this.getTabs().forEach((pane, index) => {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                // 如果没有给 pane 设置 name，默认设置它的索引
                if (!pane.name) pane.name = index;
                // 设置当前选中的 tab 的索引
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus () {
            let tabs = this.getTabs();
            let _this = this;
            // 显示当前选中的 tab 对应的 pane 组件，隐藏没有选中的
            tabs.forEach((tab) => tab.show = tab.name === _this.currentValue);
        },
        tabCls (item) {
            return [
                'tabs-tab',
                {'tabs-tab-active': item.name === this.currentValue}
            ]
        },
        // 点击 tab 标题时触发
        handleChange (index) {
            let nav = this.navList[index];
            let name = nav.name;
            // 改变当前选中的 tab 并触发下面的 watch
            this.currentValue = name;
            // 更新 value
            this.$emit('input', name);
            // 触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        }
    },
    watch: {
        value (val) {
            this.currentValue = val;
        },
        currentValue () {
            // 在当前选中的 tab 发生变化时，更新 pane 的显示状态
            this.updateStatus();
        }
    }
});
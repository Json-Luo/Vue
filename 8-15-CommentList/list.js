// 列表数据 list 为空时,渲染一个‘列表为空’的信息提示节点，不为空时每个 list-item 应包含昵称、留言内容和回复按钮三个子节点
Vue.component('list', {
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    render (h) {
        let _this = this, list = [];
        this.list.forEach((msg, index) => {
            let node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [
                h('span', msg.name + '：'),
                h('div', {
                    attrs: {
                        class: 'list-msg'
                    }
                }, [
                    h('p', msg.message),
                    h('a', {
                        attrs: {
                            class: 'list-reply'
                        },
                        on: {
                            click () {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复')
                ])
            ]);
            list.push(node);
        });
        if (this.list.length) {
            return h('div', {
                attrs: {
                    class: 'list'
                }
            }, list);
        } else {
            return h('div', {
                attrs: {
                    class: 'list-nothing'
                }
            }, '留言列表为空');
        }
    },
    methods: {
        handleReply (index) {
            this.$emit('reply', index);
        }
    }
});
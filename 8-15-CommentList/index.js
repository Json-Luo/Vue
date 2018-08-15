// 发布一条留言，需要的数据有 username 和 message, 留言列表也是从 app 中获取
let app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        list: []
    },
    methods: {
        handleSend () {
            if (this.username === '') {
                return window.alert('请输入昵称');
            }

            if (this.message === '') {
                return window.alert('请输入留言内容')
            }
            // 将信息添加到留言列表中
            this.list.push({
                name: this.username,
                message: this.message
            });
            // 置空信息
            this.message = '';
            this.username = '';
        },
        handleReply (index) {
            let name = this.list[index].name;
            this.message = '回复@' + name + '：';
            // 通过 ref 属性访问到 textarea 组件然后调用组件函数 focus
            this.$refs.message.focus();
        }
    }
});
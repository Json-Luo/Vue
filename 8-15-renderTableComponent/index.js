let app = new Vue({
    el: '#app',
    // 构建数据，columns 每一项就是一个对象，title 和 key 字段是必填， 排序参数 sortable 选填
    data: {
        columns: [
            { title: 'Name', key: 'name' },
            { title: 'Age', key: 'age', sortable: true },
            { title: 'Birth', key: 'birthday', sortable: true },
            { title: 'Address', key: 'address' }
        ],
        data: [
            {
                name: '张三',
                age: 18,
                birthday: '1992-09-12',
                address: '上海市浦东新区'
            },
            {
                name: '李四',
                age: 15,
                birthday: '1995-04-12',
                address: '上海市普陀区'
            },
            {
                name: '王五',
                age: 12,
                birthday: '1998-03-22',
                address: '上海市杨浦区'
            }
        ]
    },
    methods: {
        handleAdd () {
            this.data.push({
                name: '赵六',
                age: 30,
                birthday: '1980-06-03',
                address: '北京市海淀区'
            });
        }
    }
});
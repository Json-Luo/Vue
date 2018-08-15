Vue.component('vTable', {
    // 对于父级原始数据的限制
    props: {
        columns: {
            type: Array,
            default () {
                return [];
            }
        },
        data: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    // 为了使排序不影响原始数据，定义两个组件内部的数据来维护
    data () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    // 开始构建虚拟 DOM  这里的参数 h 就是 createElement
    render (h) {
        let ths = [], trs = [], _this = this;
        // 先遍历所有的行，然后在每一行内再遍历各列，最终组合出主体内容节点 trs
        this.currentData.forEach(row => {
            let tds = [];
            _this.currentColumns.forEach(cell => {
                tds.push(h('td', row[cell.key]));
            });
            trs.push(h('tr', tds));
        });
        // ths 相对复杂一点 假如存在 sortable 属性，把升降序渲染出来，否则直接渲染标题即可
        this.currentColumns.forEach((col, index) => {
            if (col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    // 升序
                    h('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click () {
                                _this.handleSortByAsc(index)
                            }
                        }
                    }, '↑'),
                    // 降序
                    h('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click () {
                                _this.handleSortByDesc(index)
                            }
                        }
                    }, '↓'),
                ]));
            } else {
                ths.push(h('th', col.title));
            }
        });
        // 根据 ths 和 trs 的内容构建一个完整的 table
        return h('table', [
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ]);
    },
    methods: {
        // 排序函数
        handleSortByAsc (index) {
            let key = this.currentColumns[index].key;
            this.currentColumns.forEach(col => {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort((a, b) => a[key] > b[key] ? 1 : -1)
        },
        handleSortByDesc (index) {
            let key = this.currentColumns[index].key;
            this.currentColumns.forEach(col => {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort((a, b) => a[key] < b[key] ? 1 : -1)
        },
        makeColumns () {
            this.currentColumns = this.columns.map((col, index) => {
                // 添加一个字段标识当前列排序的状态 normal 就是默认不排序
                col._sortType = 'normal';
                // 添加一个字段标识当前列在数组中的索引
                col._index = index;
                return col;
            });
        },
        makeData () {
            this.currentData = this.data.map((row, index) => {
                // 添加一个字段标识当前行在数组中的索引
                row._index = index;
                return row;
            });
        }
    },
    // 当渲染完表格之后 父级修改了 data 数据， currentData 也应该修改， 如果存在排序， 则更新数据重新再排一次
    watch: {
        data () {
            // 数据发生变化， 则重新更新数据
            this.makeData();
            // 筛选出 sortType 不等于 normal 的元素  返回 array
            let sortedColumn = this.currentColumns.filter(col => col._sortType !== 'normal');
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    mounted () {
        // 在组件初始化的时候初始化内部维护的数据
        this.makeColumns();
        this.makeData();
    }
});
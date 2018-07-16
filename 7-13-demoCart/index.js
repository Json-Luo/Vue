let app = new Vue({
    el: '#app',
    data: {
        selected: false,
        list: [
            {
                id: 1,
                name: 'iphone 8 Plus',
                price: 6999,
                count: 1
            },
            {
                id: 2,
                name: 'ipad Pro',
                price: 4999,
                count: 1
            },
            {
                id: 3,
                name: 'Macbook Pro',
                price: 16999,
                count: 1
            }
        ]
    },
    computed: {
        totalPrice: function () {
            let total = 0;
            for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                total += item.price * item.count;
            }
            return total.toFixed(2);
        }
    },
    methods: {
        handleAdd: function (key) {
            this.list[key].count++;
        },
        handleDel: function (key) {
            if (this.list[key].count === 1) return;
            this.list[key].count--;
        },
        handleRemove: function (key) {
            this.list.splice(key, 1);
        },
        selectAll: function () {
            this.selected = !this.selected;
        }
    }
});
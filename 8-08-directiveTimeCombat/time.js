/*
 *  转换逻辑：
 *  ~ 1min          刚刚
 *  1min ~ 1hour    xx 分钟以前
 *  1hour ~ 1day    xx 小时以前
 *  1day ~ 1month   xx 天以前
 *  1month ~        xx 年 xx 月 xx 日
 */

// 先封装一个时间对象
let Time = {
    //  获取当前时间戳
    getUnix () {
        return (new Date()).getTime();
    },
    // 获取今天 0 点整的时间戳
    getTodayUnix () {
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return today.getTime();
    },
    // 获取元旦0点整时间出戳
    getYearUnix () {
        let year = new Date();
        year.setMonth(0);
        year.setDate(1);
        year.setHours(0);
        year.setMinutes(0);
        year.setSeconds(0);
        year.setMilliseconds(0);
        return year.getTime();
    },
    // 获取标准年月日
    getLastDate (time) {
        let date = new Date(time);
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    // 转换时间
    getFormatTime (timestamp) {
        let now = this.getUnix();
        let today = this.getTodayUnix();
        let year = this.getYearUnix();

        let timer = (now - timestamp) / 1000, tip = '';
        if (timer <= 0 || Math.floor(timer / 60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timestamp - today >= 0)) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
};

// 自定义时间指令
Vue.directive('time', {
    bind (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        // js 中毫秒数 所以60000即60秒 一分钟更新一次DOM
        el.__timeout__ = setInterval(() => {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000)
    },
    unbind (el) {
        // el.__timeout__ 只是一个载体  方便销毁
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});
/*
 * 总结: 1.在编写自定义组件时，对于 DOM 绑定一次性事件建议在 bind 钩子内完成，并在 unbind 钩子中解除
 *      2.在自定义指令中，理论上可以操作一切 DOM，如果大规模修改 DOM 建议使用组件来实现
 */
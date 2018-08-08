let app = new Vue({
    el: '#app',
    data: {
        // 两个时间戳 现在的时间和以前的时间   js中时间戳精确到毫秒
        timeNow: (new Date()).getTime(),
        timeBefore: 1488930695721
    }
});
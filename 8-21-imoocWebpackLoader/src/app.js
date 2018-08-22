// 直接 ES6 语法
import Layer from './components/layer/layer';
import './css/common.css';

const App = function () {
    // const COUNT = 10;
    // alert(COUNT);
    // console.log(layer);
    let domtpl = document.getElementById('tpl');
    let domejs = document.getElementById('ejs');
    let layer = new Layer();

    domtpl.innerHTML = layer.tpl;
    // ejs loader 处理过后会返回一个函数，我们可以给这个函数传递他需要的参数
    domejs.innerHTML = layer.ejs({
        name: 'this is ejs',
        arr: ['apple', 'oppo', 'vivo']
    });
    alert(layer.name);
};

new App();
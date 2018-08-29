// js 工具库和 ts 混用
import * as _ from 'lodash';
// 将这个数组以两个元素进行切割，结果是切割成三个数组 [[1, 2], [3, 4], [5]]
console.log(_.chunk([1,2,3,4,5], 2));

// es6 语法相关
const NUM = 23;

// ts 语法相关
interface Cat {
    name: string,
    age: number
}
function touchCat(cat: Cat) {
    console.log('miao~', cat.name);
}

touchCat({
    name: 'nuomi',
    age: 2
});
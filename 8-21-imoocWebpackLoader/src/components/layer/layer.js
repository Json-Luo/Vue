import tpl from './layer.html';
import ejs from './layer.ejs';
import './layer.less';

function layer() {
    return {
        name: 'layer',
        tpl: tpl,
        ejs: ejs,
    }
}

export default layer;
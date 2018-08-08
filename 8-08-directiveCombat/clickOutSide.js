Vue.directive('clickoutside', {
    bind (el, binding, vnode) {
        function documentHandle(e) {
            // e 鼠标的点击事件， e.target 获取的是鼠标的点击区域
            console.log(el, e, e.target);
            // contains 就是用来判断 el 是否包含 e.target 判断鼠标点击区域是否被指令绑定元素包含 （即 鼠标是否点击了指令绑定元素的内部区域） 如果点击了 跳出不执行
            if (el.contains(e.target)) {
                return false;
            }
            // 判断当前指令中有没有表达式，该表达式就是一个函数，binding.value() 就是来执行这个函数的
            if (binding.expression) {
                console.log(binding.value);
                binding.value(e);
            }
        }
        // 只是一个载体  方便 unbind 的时候 清除 document 上面的事件
        el.__vueClickOutSide__ = documentHandle;
        document.addEventListener('click', el.__vueClickOutSide__);
    },
    unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutSide__);
        // 由于已经清除掉 document 上面的点击事件之后  这个载体也没啥用了
        delete el.__vueClickOutSide__;
    }
});
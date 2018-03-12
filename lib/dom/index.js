/**
 * Created by nick on 2017/5/6.
 */
let dom = {
    /*
     * 作用：给指定的元素绑定事件？？
     * 参数：
     *    element：DOM元素
     *    eventType：事件类型
     *    selector：css选择器，代表事件实际触发的元素
     *    fn：事件方法
     */
    on: function (element, eventType, selector, fn) {
        element.addEventListener(eventType, e => {
            // 获取触发事件的元素
            let el = e.target
            // 方法的意义：获取事件最后冒泡到的的元素
            // matches方法：如果当前元素能被指定的css选择器查找到，则返回true，否则返回false
            // 如果selector能够查找到el，进入循环体
            while (!el.matches(selector)) {
                // 如果触发事件的元素和绑定事件的元素相同，这里的element就是e.currentTarget啊
                if (element === el) {
                    // el置空，跳出循环，el就是element
                    el = null
                    break
                }
                // 否则，把元素设为它的父节点
                // 最终的执行结果就是，el指向了selector匹配的元素
                el = el.parentNode
            }
            // 如果el存在，在el上执行fn函数，把e和el作为参数传递进去
            // 如果执行成功，el最终指向的是selector匹配的元素
            el && fn.call(el, e, el)
        })
        // 返回当前元素，是为了链式调用
        return element
    },

    /*
     *  作用：给定element，获取当前元素在同辈元素中的index
     *  参数：
     *      element：要查询的元素
     *  返回值：
     *      index代表在同辈元素中的位置，若未查找到返回-1
     */
    index: function (element) {
        // 获取当前元素的同辈元素
        let siblings = element.parentNode.children
        //
        for (let index = 0; index < siblings.length; index++) {
            if (siblings[index] === element) {
                return index
            }
        }
        return -1
    },
    /*
     * 作用：给element的同辈元素中的所有元素都删除className，给element添加className
     * 参数：
     *      element：需要添加类名的元素
     *      className：需要添加的类名
     */
    uniqueClass: function (element, className) {
        dom.every(element.parentNode.children, el => {
            el.classList.remove(className)
        })
        element.classList.add(className)
        return element
    },
    /*
     *  作用：给nodeList中的每一个元素都执行fn
     */
    every: function (nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i], i)
        }
        return nodeList
    }
}

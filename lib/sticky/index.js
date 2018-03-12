// 普通页面的写法
// var buttonOffset = $('button').offset() // 获取button距离顶部的距离
// $(window).on('scroll', function () {
//   var scrollY = window.scrollY // 滚动条滚动的距离
//   if (scrollY > 0) {
//     $('#topbar').addClass('sticky')
//   } else {
//     $('#topbar').removeClass('sticky')
//   }
//
//   if (scrollY + 60 > buttonOffset.top) {
//     $('button').addClass('sticky')
//   } else {
//     $('button').removeClass('sticky')
//   }
// })

// 违反正交的地方要写清楚
class Sticky {
  constructor(selector, n) {
    this.elements = $(selector)
    this.offset = n || 0
    this.offsets = []
    this.addPlaceholder()
    this.cacheOffsets() // 缓存高度
    this.listenToScroll()
  }

  addPlaceholder() {
    // 遍历添加wrapper
    this.elements.each((index, element) => {
      var $wrapper = $('<div class="sticky-placeholder"></div>')
      $wrapper.height($(element).outerHeight())
      $(element).wrap($wrapper)
    })

  }

  cacheOffsets() {
    // 记下相关元素的offset
    this.elements.each((index, element) => {
      this.offsets[index] = $(element).offset()
    })
  }

  listenToScroll() {
    $(window).on('scroll', () => {
      var scrollY = window.scrollY
      this.elements.each((index, element) => {
        var $element = $(element)
        if (scrollY + this.offset > this.offsets[index].top) {
          $element.addClass('sticky')
            .css({top: this.offset}) // 违反了正交原则
        } else {
          $element.removeClass('sticky')
        }
      })
    })
  }
}
// 每个选择器只负责一个元素
new Sticky('#topbar')
new Sticky('button', 60)
// 应该给每个元素手动的加上wrapper，否则sticky下面的元素都会跑到上面

// 调用方式
// var sticky = new Sticky(selector,n)

// composition
class Suggestion {
  constructor(options) {
    this.options = options
    this.$input = $(options.input)
    this.$wrapper = $('<div class="suggestion"></div>')
    this.$input.wrap(this.$wrapper)
    this.$ol = $("<ol class='suggestion-list'></ol>")
    this.$input.after(this.$ol)
    this.$loading = $("<div class='suggestion-loading'></div>")
    this.$loading.html(this.options.loadingTemplate)
    this.$ol.after(this.$loading)
    this.bindEvents()
  }

  bindEvents() {
    this.$input.on('input', (e) => {
      this.$wrapper.addClass('loading')
      this.options.search(e.currentTarget.value, (array) => {
        this.$wrapper.removeClass('loading')
        this.$ol.empty()
        array.forEach((text) => {
          this.$ol.append($('<li></li>').text(text))
        })
      })
    })
  }
}

var suggestion = new Suggestion({
  input: 'input',
  search: function (text, callback) {
    let array = []
    for (let i = 0; i < 5; i++) {
      // 造假数据
      var n = parseInt(Math.random() * 100, 10)
      array.push(text + n)
    }
    setTimeout(() => {
      callback(array)
    }, 200)
  },
  emptyTemplate: '<b>没有结果</b>',
  loadingTemplate: '<b>正在加载中...</b>'
})
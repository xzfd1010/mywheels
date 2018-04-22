class Dialog {
  constructor(options) {
    this.options = options
    this.init()
  }

  get template() {
    let {title, content} = this.options
    return `
      <div class="dialog">
        <div class="dialog-wrapper">
          <header class="dialog-header">${title}</header>
          <main class="dialog-main">${content}</main>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    `
  }

  generateButtons() {
    let {buttons} = this.options
    let $buttons = buttons.map((buttonOption) => {
      let $btn = $('<button></button>')
      $btn.text(buttonOption.text)
      $btn.on('click', buttonOption.action)
      return $btn
    })
    return $buttons
  }

  init() {
    var $dialog = $(this.template)
    $dialog.find('footer').append(this.generateButtons())
    $dialog.addClass(this.options.className)
    this.$dialog = $dialog
  }

  open() {
    $('body').append(this.$dialog)
  }

  close() {
    this.$dialog.detach() // 移除并缓存
  }

}

export default {
  render (h) {
    return h(
      'div',
      { class: ['scrollspy-items'] },
      [h('ul', { class: ['nav-level-1'] }, [this.buildMenu(h)])]
    )
  },
  methods: {
    buildMenu (h) {
      const menu = JSON.parse(JSON.stringify(this.menuData))

      const build = (menu, level = 1) => {
        return menu.map(item => {
          if (item.children) {
            return h(
              'li',
              { class: { active: this.active.includes(item.key) }, on: { click: e => this.navItemClicked(e, item.key) }},
              [item.name, h('ul', { class: [`nav-level-${level + 1}`] }, [build(item.children, level + 1)])]
            )
          } else {
            return h('li', { class: { active: this.active.includes(item.key) }, on: { click: e => this.navItemClicked(e, item.key) }}, [item.name])
          }
        })
      }

      return build(menu)
    }
  },
  props: {
    menuData: {
      type: Array,
      required: true
    },
    active: {
      type: Array,
      default: () => []
    },
    navItemClicked: {
      type: Function,
      default: () => () => {}
    }
  }
}

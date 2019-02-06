<template>
  <section class="scrollspy">
    <div class="scrollspy-menu">
    
      <Scroll-nav
        :menuData="menuTree"
        :active="active"
        :navItemClicked="scrollToComponent"
      ></Scroll-nav>

    </div>
    <div class="scrollspy-content">

      <Example-start
          title="Scrollspy Navigation Example"
          description="This is an example demonstrating using ScrollView to build an advanced page navigation system.
          As you scroll the page and sections come into view, the menu on the left with dynamically mark your location.
          You can also scroll to sections by clicking items in the navigation."
      ></Example-start>

      <template v-for="(section, i) in pageSections">

        <div class="page-section" :key="section.key">
          <scroll-view :offset="150">
            <template slot-scope="visibleSection">
              <scroll-marker
                :key="section.key"
                :visible="visibleSection[section.key]"
                :spacing="0"
                :name="section.key"
                @isVisible="sectionVisible"
                @isNotVisible="key => sectionNotVisible(key, i)"
              ></scroll-marker>
            </template>
          </scroll-view>

          <Heading :weight="section.level" :content="section.name"></Heading>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ligula sit amet diam imperdiet consectetur. Praesent pulvinar felis sed orci commodo, sed dignissim lorem hendrerit. In dignissim dui quis ipsum rutrum, condimentum sodales nisl gravida. Sed tempus risus velit, a suscipit magna porta et. Quisque malesuada vulputate urna, quis euismod quam consequat quis. Donec in felis eu eros ultricies molestie. Suspendisse ut convallis neque, ut pretium metus. Proin at fringilla augue, eget porta ligula. Sed risus turpis, euismod ac dolor vel, molestie mattis ligula. Maecenas porttitor hendrerit purus at varius.</p>
          <p>In ornare accumsan libero id lacinia. Pellentesque vitae pretium lorem. Aenean ac urna aliquet purus dictum consequat et a ligula. Fusce venenatis quam non quam tristique imperdiet. Etiam nec metus luctus, commodo orci quis, tincidunt metus. Nullam laoreet arcu placerat magna efficitur fringilla. In vulputate magna at turpis fermentum imperdiet. Cras eu massa mollis, consequat mauris ut, dictum est. Nulla elit massa, fringilla ac orci in, auctor fermentum lectus.</p>    
          <p>Duis ligula dolor, condimentum sodales est ac, porta ornare sem. Fusce magna ex, condimentum vitae lorem nec, pulvinar aliquam metus. Morbi accumsan, metus et volutpat vehicula, odio sem aliquam arcu, non consequat leo quam id sapien. Suspendisse eget nunc tortor. Morbi sapien nisl, faucibus eleifend nisi non, pulvinar tincidunt eros. Donec suscipit rhoncus eros vel dapibus. Integer aliquam, ex sed sagittis cursus, nulla purus aliquam ligula, bibendum pretium ligula ante at lorem. Aliquam a justo egestas, porta est ac, rhoncus odio. Pellentesque sed tellus purus. In hac habitasse platea dictumst.</p>
        </div>

      </template>

    </div>
  </section>
</template>

<script>
// import { $scrollview } from 'vue-scrollview'
import { $scrollview } from '../../../../../src'

import menu from './menu.js'
import ExampleStart from '../../ExampleStart'
import Heading from './Heading'
import ScrollNav from './ScrollNav'

export default {
  components: {
    ExampleStart,
    Heading,
    ScrollNav
  },
  data() {
    return {
      menuTree: menu,
      active: []
    }
  },
  methods: {
    sectionVisible(key) {
      // find the branch of the tree with the key of currently visible item
      // and build up an array reprensting the path to that branch by the
      // parent keys.
      const findInTree = (key, tree, path = []) => {
        let found = null
        if (tree.key === key) return [key]

        if ('children' in tree) {
          tree.children.some((child) => {
            if (child.key === key) {
              found = [...path, child.key]
              return true
            }
            found = findInTree(key, child, [...path, child.key])
            if (found && found.length > 0 && found.includes(key)) {
              return true
            }
            return false
          })
          return found || path
        }

        return found
      }

      this.active = findInTree(key, { children: menu })
    },
    sectionNotVisible(key, index) {
      if (index === 0 && $scrollview.getScrollDirection() === 'UP') {
        this.active = []
      }
    },
    scrollToComponent(e, key) {
      e.stopPropagation()
      $scrollview.scrollToComponent(key)
    }
  },
  computed: {
    pageSections() {
      // recursively flatten the menu tree into an array
      // while maintaining nesting level.
      const flatten = (tree, level = 1) => {
        const treeCloned = JSON.parse(JSON.stringify(tree))
        let flattened = []
        treeCloned.forEach(branch => {
          const { children } = branch
          delete branch.children
          branch.level = level
          flattened.push(branch)
          if (children) {
            flattened = [...flattened, ...flatten(children, level + 1)]
          }
        })
        return flattened
      }
      return flatten(menu)
    }
  },
}
</script>

<style>
.scrollspy {
  display: flex;
}

.page-section {
  padding: 60px 0;
}

.page-section .heading {
  text-align: center;
}

.page-section h1 {
  font-size: 48px;
}

.page-section h2 {
  font-size: 36px;
}

.page-section h3 {
  font-size: 24px;
}

.page-section h4 {
  font-size: 18px;
}

.scrollspy-menu {
  width: 40%;
}

.scrollspy-items {
  position: fixed;
  top: 50px;
  left: 15px;
}

.scrollspy-items ul {
  display: none;
  list-style: none;
}

.scrollspy-items ul li {
  position: relative;
  cursor: pointer;
}

.scrollspy-items .nav-level-1 {
  display: block;
}

.scrollspy-items .nav-level-1 li {
  font-size: 24px;
  font-weight: bold;
  line-height: 2;
}

.scrollspy-items .nav-level-1 > li:before {
  display: none;
}

.scrollspy-items .nav-level-1 li ul li {
  font-size: 18px;
  font-weight: normal;
  line-height: 1.8;
}

.scrollspy-items ul li:before {
  content: '';
  display: block;
  position: absolute;
  left: -10px;
  top: 0;
  height: 100%;
  width: 2px;
  background:#000;
  opacity: 0;
  transition: .2s opacity ease-in-out;
}

.scrollspy-items ul li.active:before {
  opacity: 1;
}

.scrollspy-items ul li.active > ul {
  display: block;
}

.scrollspy-content {
  width: 60%;
  padding: 0 15px;
}
</style>

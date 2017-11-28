<template>
  <div :class="['lazy-image', { loaded }]">
        <img :src="from" class="lazy-image__from" />
        <img :src="toLoad" class="lazy-image__to" ref="loadedEl" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
            toLoad: ''
        }
    },
    watch: {
        visible(visible) {
            if (visible && !this.loaded) {
                this.$refs.loadedEl.onload = () => this.loaded = true
                this.toLoad = this.to
            }
        }
    },
    props: {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        visible: {
            type: Boolean,
            default: () => false
        }
    }
}
</script>

<style>
.lazy-image {
    position: relative;
    margin: 400px 0;
}

.lazy-image__to {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .4s ease-in;
}

.lazy-image.loaded .lazy-image__to {
    opacity: 1;
}
</style>

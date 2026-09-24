<template>
    <div class="scroll-sync-container">
        <slot></slot>
    </div>
</template>

<script>
let uuid = 0 // from https://github.com/vuejs/vue/issues/5886

export default {
    props: {
        proportional: Boolean,
        vertical: Boolean,
        horizontal: Boolean,
        group: String
    },
    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },
    mounted() {
        this.topNode = this.$root
        this.topNode.$on('scroll-sync', this.handleSync)
        this.$el.onscroll = this.handleScroll
    },
    beforeDestroy() {
        this.topNode.$off('scroll-sync', this.handleSync)
        this.$el.onscroll = null
    },
    methods: {
        handleSync: function (data) {
            const vue = this
            if (data.emitter === vue.uuid || data.group !== vue.group) {
                return
            }
            const {
                scrollTop,
                scrollHeight,
                clientHeight,
                scrollLeft,
                scrollWidth,
                clientWidth,
                barHeight,
                barWidth
            } = data

            // from https://github.com/okonet/react-scroll-sync
            const scrollTopOffset = scrollHeight - clientHeight
            const scrollLeftOffset = scrollWidth - clientWidth

            const { proportional, vertical, horizontal } = vue

            /* Calculate the actual pane height */
            const paneHeight = vue.$el.scrollHeight - vue.$el.clientHeight
            const paneWidth = vue.$el.scrollWidth - vue.$el.clientWidth
            /* Adjust the scrollTop position of it accordingly */
            vue.$el.onscroll = null
            if (vertical && scrollTopOffset > barHeight) {
                vue.$el.scrollTop = proportional ? (paneHeight * scrollTop) / scrollTopOffset : scrollTop
            }
            if (horizontal && scrollLeftOffset > barWidth) {
                vue.$el.scrollLeft = proportional ? (paneWidth * scrollLeft) / scrollLeftOffset : scrollLeft
            }
            window.requestAnimationFrame(() => {
                if (!vue._isDestroyed) {
                    vue.$el.onscroll = vue.handleScroll
                }
            })
        },
        handleScroll: function(e) {
            const vue = this
            window.requestAnimationFrame(() => {
                if (vue._isDestroyed) {
                    return
                }
                const {
                    scrollTop,
                    scrollHeight,
                    clientHeight,
                    scrollLeft,
                    scrollWidth,
                    clientWidth,
                    offsetHeight,
                    offsetWidth
                } = e.target

                vue.topNode.$emit('scroll-sync', {
                    scrollTop,
                    scrollHeight,
                    clientHeight,
                    scrollLeft,
                    scrollWidth,
                    clientWidth,
                    barHeight: offsetHeight - clientHeight,
                    barWidth: offsetWidth - clientWidth,
                    emitter: vue.uuid,
                    group: vue.group
                })
            })
        }
    }
}
</script>

<style scoped>
.scroll-sync-container {
    width:100%;
    height:100%;
    overflow:auto;
    position: relative;
}
</style>

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
    data() {
        return {
            topNode: null
        }
    },
    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },
    mounted() {
        const vue = this
        let parent = this.$parent
        while (parent) {
            this.topNode = parent
            parent = this.topNode.$parent
        }
        this.topNode.$on('scroll-sync', function (data) {
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
            const paneHeight = vue.$el.scrollHeight - clientHeight
            const paneWidth = vue.$el.scrollWidth - clientWidth
            /* Adjust the scrollTop position of it accordingly */
            vue.$el.onscroll = null
            if (vertical && scrollTopOffset > barHeight) {
            vue.$el.scrollTop = proportional ? (paneHeight * scrollTop) / scrollTopOffset : scrollTop // eslint-disable-line
            }
            if (horizontal && scrollLeftOffset > barWidth) {
            vue.$el.scrollLeft = proportional ? (paneWidth * scrollLeft) / scrollLeftOffset : scrollLeft // eslint-disable-line
            }
            window.requestAnimationFrame(() => {
                vue.$el.onscroll = vue.handleScroll
            })
        })
        this.$el.onscroll = this.handleScroll
    },
    methods: {
        handleScroll: function(e) {
            const vue = this
            window.requestAnimationFrame(() => {
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

                this.topNode.$emit('scroll-sync', {
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

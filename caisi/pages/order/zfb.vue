<template>
    <div v-html="apply">
        {{ apply }}
    </div>
</template>

<script>
export default {
    name: "Zfb",
    data() {
        return {
            apply: ""
        }
    },
    created() {},
    mounted() {
        if (this.$route.query.close) {
            window.opener = null
            window.open("", "_self")
            window.close()
        } else {
            let form = this.$route.query.htmls
            this.apply = form
            this.$nextTick(() => {
                document.forms[0].submit()
            })
        }
    }
}
</script>

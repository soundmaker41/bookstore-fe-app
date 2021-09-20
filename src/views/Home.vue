<template>
<div>
    <h1>Home Page</h1>
    Click <router-link :to="{name: 'BookStoreBrowser'}">here</router-link> to access BookStore
</div>
</template>

<script>
export default {
    name: "Home"
}
</script>
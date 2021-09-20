<template>
<div>
    <h2>404</h2>
    <h3>Oops! Page Not Found</h3>
    <router-link :to="{name: 'Home'}">Go to home page</router-link> 
</div>
</template>

<script>
export default {
    name: "NotFound"
}
</script>
<template>
    <div id="book-details">
    <h1>Book Details</h1>
    <p>Current Book ID is {{id}}</p>
    </div>
</template>

<script>
export default {
    name: "BookDetails",
    props:{
        id: String
    }
}
</script>
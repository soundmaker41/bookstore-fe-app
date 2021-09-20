<template>
    <v-container fluid dark>
        <v-row dense>
            <v-col cols=6>
                <v-select
                    v-model="selectedSort"
                    :items="sortSelectors"
                    label="Sort By"
                    @change="onSortChange"
                >
                </v-select>
            </v-col>
            <v-col>
                <v-select
                    v-model="selectedOrder"
                    :items="orderSelectors"
                    label="Order"
                    @change="onOrderChange"
                >
                </v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "SortOptions",
    data: () => ({
        selectedSort: 'id',
        selectedOrder: 'asc',
        sortSelectors: [
            {text: 'Default (id)', value: 'id'},
            {text: 'Price', value: 'price'},
            {text: 'Title', value: 'title'},
            {text: 'Author', value: 'author'},
            {text: 'Publication Date', value: 'publishedDate'},
            {text: 'Rating', value: 'rating'}
        ],
        orderSelectors: [
            {text: 'in Ascending Order', value: 'asc'},
            {text: 'in Descending Order', value: 'desc'}
        ]
    }),
    methods: {
        onSortChange(){
            console.log('New sort option is ' + this.selectedSort);
            //
            this.$emit('sort-option-changed', {
                sort: this.selectedSort,
                order: this.selectedOrder
            });
        },
        onOrderChange(){
            console.log('New order option is ' + this.selectedOrder);
            this.$emit('sort-option-changed', {
                sort: this.selectedSort,
                order: this.selectedOrder
            });
        }
    }
}
</script>
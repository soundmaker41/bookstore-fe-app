<template>
    <div>
        <div class="text-center">
            <v-pagination
            v-show="books.length > 0"
            v-model="currPage"
            :length="paginationInfo.totalPages"
            :total-visible="7"
            @input="getPageNumber"
            @next="getNext"
            @previous="getPrevious"
            ></v-pagination>
        </div>
        <v-row dense>
        <v-col v-for="book in books"
                  :key="book.id"
                  cols="12">            
                <BookCard :book="book" @delete-book="deleteBook" @update-book="updateBook"></BookCard>
                <v-divider dark role="presentation"></v-divider>
            
        </v-col>
        </v-row>
        
        <div class="text-center">
            <v-pagination
            v-show="books.length > 0"
            v-model="currPage"
            :length="paginationInfo.totalPages"
            :total-visible="7"
            @input="getPageNumber"
            @next="getNext"
            @previous="getPrevious"
            ></v-pagination>
        </div>
    </div>
    
</template>

<script>
import BookCard from './BookCard.vue'

export default {
    name: 'BookStore',
    components:
    {
        BookCard
    },
    data: () =>({
        currPage: 1
    }),
    created(){
        this.currPage = this.paginationInfo.number + 1;
    },
    props: {
        books: Array,
        paginationInfo: Object
    },
    methods: {
        //Call from parent component using ref on this component
        setPageNumber(num){
            console.log('Set page from parent: ' + num);
            this.currPage = num;
        },
        getPageNumber(num){
            console.log('Get page ' + num);
            //Emit this event upwards to BookStoreBrowser
            this.$emit('page-change', num - 1);//Change to Base-0 index
        },
        getPrevious(){
            console.log('Get Previous: ');
        },
        getNext(){
            console.log('Get Next: ' );
        },
        deleteBook(id){
            this.$emit('delete-book', id);
        },
        updateBook(book){
            this.$emit('update-book', book);
        }
    }
}
</script>

<template>
    <div>
    <h1>Search and Browse Books</h1>
    <v-container>
        <v-row dense>
            <v-col cols="12">
            <SearchForm
            @search-request="onSearchRequest"
            ></SearchForm>    
            </v-col>    
        </v-row>        
        <v-row>
            <v-col
            cols="2"
            >
                <p v-show="showResultCount">{{resultText}} </p>
                
            </v-col>
            <v-spacer></v-spacer>
            <v-col
            cols="8"
            >
                <SortOptions
                @sort-option-changed="onSortOptionChange"
                ></SortOptions>
                
            </v-col>
            <v-spacer></v-spacer>
            <v-col>                
                <AddBookDialogForm 
                 dialogTitle="Add new Book" 
                 btnIcon="mdi-plus"
                 @add-book="onAddBook"
                ></AddBookDialogForm>
            </v-col>
        </v-row>
        <BookStore ref="bookstore" @update-book="onSendUpdateBookRequest" @delete-book="onSendDeleteBookRequest" @page-change="onPageChange" :books="books" :paginationInfo="paginationInfo"></BookStore>
    </v-container>
    
    </div>
</template>

<script>
//Main component with the bookstore data
import BookStore from '../components/BookStore.vue';
import AddBookDialogForm from '../components/AddBookDialogForm.vue';
import SearchForm from '../components/SearchForm.vue';
import SortOptions from '../components/SortOptions.vue';
import axios from 'axios';

export default {
    name: "BookStoreBrowser",
    components: {
        BookStore, AddBookDialogForm, SearchForm, SortOptions
    },
    data(){
        return {
            books: [],
            paginationInfo: {
                "size": 0,
                "totalElements": 0,
                "totalPages": 0,
                "number": 0
            },
            currRestURL:'/books',
            searchParams: {
                title: null,
                author: null,
                priceCap: null,
                subjects: null
            },
            sortParam: null,
            showResultCount: false,
            resultText: ''
        };
    },
    created(){
        //To replace with Axios or fetch call
        console.log('BookStoreBrowser created...');

        axios.get(this.currRestURL)
        .then(res => {
            this.books = res.data["_embedded"]["bookstore"];
            this.paginationInfo = res.data["page"];
            this.formatResultText();
            this.showResultCount = true;
        })
        .catch(error => {
            console.log(error);
            this.showResultCount = false;
            alert(error);
        })
        .then(() => {

        })
        
    },
    methods: {
        retrieveRecords(page, sort, size){
            axios.get(this.currRestURL,{
                params:{
                    ...this.searchParams,
                    page: page,
                    sort: sort,
                    size: size
                }
            })
            .then(res => {
                this.books = res.data["_embedded"]["bookstore"];
                this.paginationInfo = res.data["page"];
                this.formatResultText();
                this.showResultCount = true;
                //Set page number only if XHR is successful
                this.$refs.bookstore.setPageNumber(this.paginationInfo.number + 1);
            })
            .catch(error => {
                console.log(error);
                this.showResultCount = false;
                alert(error);
            })
            .then(() => {

            })
        },
        checkCurrentPageNumberAfterDeletion(numDeleted){
            const maxPageNumberAfterDeletion = 
                Math.ceil( (this.paginationInfo.totalElements - numDeleted) / this.paginationInfo.size) - 1;
            let currPageNumber = this.paginationInfo.number;
            if(currPageNumber > maxPageNumberAfterDeletion){
                currPageNumber = maxPageNumberAfterDeletion;
            } 
            console.log('Current page index after check is ' + currPageNumber);
            return currPageNumber;
        },
        formatResultText(){
            this.paginationInfo.number * this.paginationInfo.size + 1
            this.paginationInfo.number * this.paginationInfo.size + this.books.length

            if(this.books.length > 0){
                const fromResult = this.paginationInfo.number * this.paginationInfo.size + 1;
                const toResult = this.paginationInfo.number * this.paginationInfo.size + this.books.length;
                const totalResults = this.paginationInfo.totalElements;
                this.resultText = `${fromResult}-${toResult} of ${totalResults}`; 
            }
            else{
                this.resultText = "No results found";
            }

        },
        onSearchRequest(searchObject){
            console.log(searchObject);

            //Four different urls based on Search option combinations
            if(searchObject.priceCapEnabled){
                if(searchObject.subjects.length === 0){
                    this.currRestURL = "/books/search/findByTitleAuthorAndPriceCap";
                    this.searchParams = {
                        title: searchObject.title,
                        author: searchObject.author,
                        priceCap: searchObject.priceCap,
                        subjects: null
                    }
                }
                else{
                    this.currRestURL = "/books/search/findByTitleAuthorSubjectsPriceCap";
                    this.searchParams = {
                        title: searchObject.title,
                        author: searchObject.author,
                        priceCap: searchObject.priceCap,
                        subjects: searchObject.subjects.join()
                    }
                }
            }
            else{
                if(searchObject.subjects.length === 0){
                    this.currRestURL = "/books/search/findByTitleAuthor";
                    this.searchParams = {
                        title: searchObject.title,
                        author: searchObject.author,
                        priceCap: null,
                        subjects: null
                    }
                }
                else{
                    this.currRestURL = "/books/search/findByTitleAuthorAndSubjects";
                    this.searchParams = {
                        title: searchObject.title,
                        author: searchObject.author,
                        priceCap: null,
                        subjects: searchObject.subjects.join()
                    }
                }
            }

            //Reset 
            this.paginationInfo.number = 0;            
            this.retrieveRecords(this.paginationInfo.number, this.sortParam);

        },        
        onSortOptionChange(sortOptions){
            this.sortParam = sortOptions.sort + ',' + sortOptions.order;
            this.retrieveRecords(this.paginationInfo.number, this.sortParam);
        },
        onPageChange(newPageNum){
            this.retrieveRecords(newPageNum, this.sortParam);
        },
        onSendDeleteBookRequest(id){
            console.log('Sending Delete request for book id ' + id);
            //
            axios.delete("/books/" + id)
                .then(() => {
                    //Current page number may no longer be valid after removing an item!
                    this.paginationInfo.number = this.checkCurrentPageNumberAfterDeletion(1);
                    //Retrieve the updated list
                    this.retrieveRecords(this.paginationInfo.number, this.sortParam);
                })
                .catch(error => {
                    console.log(error);
                    alert("Fail to delete book " + id);
                })
                .then(() => {

                })
        },
        onSendUpdateBookRequest(updatedBook){
            console.log('Sending PATCH request for book id ' + updatedBook.id);
            axios.patch("/books/" + updatedBook.id, updatedBook)
                .then(() => {
                    //Retrieve the updated list
                    this.retrieveRecords(this.paginationInfo.number, this.sortParam);
                })
                .catch(error => {
                    console.log(error);
                    alert("Fail to update book " + updatedBook.id);
                })
                .then(() => {

                })
        },
        onAddBook(newBook){
            //
            axios.post("/books", newBook)
                .then(() => {
                    //Retrieve the updated list
                    this.retrieveRecords(this.paginationInfo.number, this.sortParam);
                })
                .catch(error => {
                    console.log(error);
                    alert("Fail to add new book");
                })
                .then(() => {

                })
        }
    }
}
</script>


<template>
        <v-card dark>
            <v-container fluid>
                <v-row dense>
                    <v-col
                        cols="12"
                        sm="5"
                    >
                        <v-card-title>
                        {{book.title}}
                        </v-card-title>

                        <v-card-subtitle>by {{book.author}} | {{formatDisplayDate(book.publishedDate)}}</v-card-subtitle>
                        <v-card-text>ISBN: {{book.isbn}}</v-card-text>
                        <v-chip v-for="subject in book.subjects"
                            :key="subject"
                            class="ma-2"                
                            color="orange darken-2"
                            small                
                            text-color="white"
                            >                
                            {{subject}}
                        </v-chip>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="5"
                    >
                        <v-card-text>                            
                            <v-rating
                                :value="book.rating"
                                color="amber"
                                dense
                                half-increments                                
                                readonly
                            ></v-rating>
                            <h4>{{(Math.round(book.rating*100)/100).toFixed(2)}}</h4>
                            <h2>${{(Math.round(book.price*100)/100).toFixed(2)}}</h2>
                        </v-card-text>

                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                    >
                    <v-card-actions>                    
                    <AddBookDialogForm 
                        dialogTitle="Update Book" 
                        btnIcon="mdi-file-document-edit"
                        :inBook="changeBookPublishedDate()"
                        @update-book="updateBook"
                    ></AddBookDialogForm>
                    <ConfirmDialog @dialog-close="confirmDialogClose" 
                        title="Confirm" 
                        :message="createDeleteConfirmMessage()"
                        btnIcon="mdi-trash-can-outline"/>
                    </v-card-actions>

                    </v-col>
                </v-row>
            </v-container>            
            <v-card-actions>
                
                <v-spacer></v-spacer>
                <v-btn
                icon
                @click="showSummary = !showSummary"
                >
                <v-icon>{{ showSummary ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="showSummary">
                <v-divider></v-divider>
                <v-card-title>Summary</v-card-title>
                <v-card-text>
                   {{book.summary}}
                </v-card-text>
                </div>
            </v-expand-transition>
            <!-- Uses refs to call open method instead of v-slot -->
    </v-card>
</template>

<script>
import ConfirmDialog from './ConfirmDialog.vue';
import AddBookDialogForm from './AddBookDialogForm.vue';
import DateFormatting from '../mixins/DateFormatting';

export default {
    name: 'BookCard',
    props: {
        book: Object
    },
    mixins: [DateFormatting],
    components: {
        ConfirmDialog, AddBookDialogForm
    },
    data: () =>({
        showSummary: false
    }),
    methods: {
        changeBookPublishedDate(){
            //Strip the Hour Min SS portion of published date
            const transformedBook = {
                ...this.book, publishedDate: this.formatDate(this.book.publishedDate)
            };
            return transformedBook;
        },
        createDeleteConfirmMessage(){
            const outMessage = `Are you sure you want to delete the book ${this.book.title} by ${this.book.author}?`;
            return outMessage;
        },
        confirmDialogClose(isAgree){
            if(isAgree){                
                this.$emit('delete-book', this.book.id);
            }
        },
        updateBook(book){
            this.$emit('update-book', book);
        }
    }
}
</script>
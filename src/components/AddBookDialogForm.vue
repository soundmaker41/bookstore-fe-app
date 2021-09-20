<template>
    <v-dialog
        v-model="dialog"
        max-width="600"
        style="{ zIndex: 200 }"
        @keydown.esc="cancel"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="ma-2"
        color="indigo"
        dark
        v-bind="attrs"
        v-on="on"
        >
            <v-icon v-if="!!btnIcon && btnIcon.length > 0">{{btnIcon}}</v-icon>
            <span v-if="!!btnText && btnText.length > 0">{{btnText}}</span>
        </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold --text">
          {{dialogTitle}}
        </v-toolbar-title>
      </v-toolbar>
      <form class="ml-4 mr-4">
                <!--Title -->
                <v-text-field
                v-model="formBook.title"
                :error-messages="titleErrors"
                :counter="256"
                label="Title"
                required
                @input="$v.formBook.title.$touch()"
                @blur="$v.formBook.title.$touch()"
                ></v-text-field>
                <!--Author -->
                <v-text-field
                v-model="formBook.author"
                :error-messages="authorErrors"
                :counter="256"
                label="Author"
                required
                @input="$v.formBook.author.$touch()"
                @blur="$v.formBook.author.$touch()"
                ></v-text-field>
                <!--Summary -->
                <v-textarea
                    v-model="formBook.summary"
                    outlined
                    auto-grow
                    filled
                    label="Summary"
                    rows="2"
                    required
                    :error-messages="summaryErrors"
                    @input="$v.formBook.summary.$touch()"
                    @blur="$v.formBook.summary.$touch()"
                ></v-textarea>
                <!--ISBN-->
                <v-text-field
                    v-model="formBook.isbn"
                    :error-messages="isbnErrors"
                    label="ISBN"
                    required
                    @input="$v.formBook.isbn.$touch()"
                    @blur="$v.formBook.isbn.$touch()"
                >
                </v-text-field>
                <!--Published Date -->
                <v-menu
                    v-model="pickerMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formBook.publishedDate"
                            :error-messages="publishedDateErrors"
                            label="Published Date"
                            prepend-icon="mdi-calendar"
                            readonly       
                            required                     
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="formBook.publishedDate"
                    @input="pickerMenu = false && $v.formBook.publishedDate.$touch()"
                    ></v-date-picker>
                </v-menu>  
                <!--Subjects-->
                <v-combobox
                    v-model="formBook.subjects"
                    :error-messages="subjectErrors"
                    :items="subjectList"
                    label="Subjects"
                    multiple
                    chips
                    required
                    @input="$v.formBook.subjects.$touch()"
                    @blur="$v.formBook.subjects.$touch()"
                    ></v-combobox>              
                <!--Rating-->
                <v-text-field
                    v-model="formBook.rating"
                    :error-messages="ratingErrors"
                    type="number"
                    label="Rating"
                    required
                    min="0.0"
                    max="5.0"
                    step="0.01"
                    @input="$v.formBook.rating.$touch()"
                    @blur="$v.formBook.rating.$touch()"
                >

                </v-text-field>
                <!--Price-->
                <v-text-field
                    v-model="formBook.price"
                    :error-messages="priceErrors"
                    type="number"
                    label="Price"
                    prefix="$"
                    required
                    min="1.0"
                    step="0.01"
                    @input="$v.formBook.price.$touch()"
                    @blur="$v.formBook.price.$touch()"
                >
                </v-text-field>
                <!-- -->

                <!-- -->
                <v-spacer></v-spacer> 
                <v-btn
                    outlined
                    class="body-2 font-weight-bold mr-4"
                    @click="clear">
                Clear
                </v-btn>
                
                <v-btn    
                    color="primary"
                    outlined
                    class="body-2 font-weight-bold mr-4"
                    @click="cancel"
                    >Cancel</v-btn
                    >
                <v-btn     
                    color="primary"
                    outlined
                    class="body-2 font-weight-bold mr-4"
                    @click="send"
                    >Submit</v-btn
                    >
                
            </form>
        <v-card-actions>
            <v-spacer></v-spacer>            
            
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
//Use vuelidate for form validation
import { validationMixin } from 'vuelidate'
import { required, maxLength, between, minValue } from 'vuelidate/lib/validators'
import DateFormatting from '../mixins/DateFormatting';
import SubjectsMixin from '../mixins/SubjectsMixin';

const isbnFormat = (value) => {
    //TODO: Formulate the regex rule for isbn
    return value.length === 17;
};

export default {
    name: "AddBookDialogForm",
    props: {
        dialogTitle: String,        
        btnText: String,
        btnIcon: String,
        inBook: Object
    },
    mixins: [validationMixin, DateFormatting, SubjectsMixin],
    validations:{
        formBook: {
            title: {required, maxLength: maxLength(256)},
            author: {required, maxLength: maxLength(256)},
            summary: {required, maxLength: maxLength(5000)},
            publishedDate: {required},
            subjects: {required},
            isbn: {required, isbnFormat},
            rating: {required, between: between(0.0, 5.0)},
            price: {required, minValue: minValue(1.0)}
        },
        

    },
    data: function () {
        return {
            dialog: false,
            pickerMenu: false,
            formBook: {
                
            },      
        };
    },
    created(){
        
        this.formBook = this.inBook ? {
            ...this.inBook
        } : {
            title: '',
            author: '',
            summary: '',
            publishedDate: '1970-01-01',
            isbn: '',
            rating: 0,
            subjects:[],
            price: 1
        };
    },
    computed: {
        titleErrors () {
            const errors = [];
            if (!this.$v.formBook.title.$dirty) 
                return errors;
            !this.$v.formBook.title.maxLength && errors.push('Title is too long');
            !this.$v.formBook.title.required && errors.push('Title is required.');
            return errors;
        },
        authorErrors () {
            const errors = []
            if (!this.$v.formBook.author.$dirty) 
                return errors;
            !this.$v.formBook.author.maxLength && errors.push('Author name is too long');
            !this.$v.formBook.author.required && errors.push('Author name is required.');
            return errors;
        },
        summaryErrors () {
            const errors = [];
            if (!this.$v.formBook.summary.$dirty) 
                return errors;
            !this.$v.formBook.summary.maxLength && errors.push('Summary is too long');
            !this.$v.formBook.summary.required && errors.push('Summary is required.');
            return errors;
        },
        subjectErrors () {
            const errors = [];
            if (!this.$v.formBook.subjects.$dirty) 
                return errors;
            !this.$v.formBook.subjects.required && errors.push('At least one subject tag is required.');
            return errors;
        },
        isbnErrors () {
            const errors = [];
            if (!this.$v.formBook.isbn.$dirty) 
                return errors;
            !this.$v.formBook.isbn.isbnFormat && errors.push('Not in ISBN format');
            !this.$v.formBook.isbn.required && errors.push('ISBN is required.');
            return errors;
        },
        publishedDateErrors () {
            const errors = [];
            if (!this.$v.formBook.publishedDate.$dirty) 
                return errors;
            !this.$v.formBook.publishedDate.required && errors.push('Published Date is required.');
            return errors;
        },
        ratingErrors () {
            const errors = [];
            if (!this.$v.formBook.rating.$dirty) 
                return errors;
            !this.$v.formBook.rating.between && errors.push('Rating should be between 0 and 5');
            !this.$v.formBook.rating.required && errors.push('Rating is required.');
            return errors;
        },
        priceErrors () {
            const errors = [];
            if (!this.$v.formBook.price.$dirty) 
                return errors;
            !this.$v.formBook.price.minValue && errors.push('Price should be minimum $1');
            !this.$v.formBook.price.required && errors.push('Price is required.');
            return errors;
        }
    },
    methods:{
        onSubjectChange(){
            console.log(this.subjects);
        },        
        send() {
            this.$v.$touch();

            //Check if form input is valid and then send message accordingly
            if(this.$v.$error){
                //console.log('Error in this form!');
                return;
            }
            else{
                //emit add-book if adding new book
                if(!this.inBook){
                    this.$emit('add-book', this.formBook);
                    //Reset
                    this.formBook = {
                        title: '',
                        author: '',
                        summary: '',
                        publishedDate: '1970-01-01',
                        isbn: '',
                        rating: 0,
                        subjects:[],
                        price: 1
                    };
                }
                //emit update-book if updating existing book
                else{
                    this.$emit('update-book', this.formBook);
                }
                this.dialog = false;
                this.$v.$reset();
            }
           
            
        },
        cancel() {
            this.dialog = false;
            this.$v.$reset();
            this.formBook = this.inBook ? {
                ...this.inBook
            } : {
                title: '',
                author: '',
                summary: '',
                publishedDate: '1970-01-01',
                isbn: '',
                rating: 0,
                subjects:[],
                price: 1
            };
        },
        clear () {
            this.$v.$reset();
            this.formBook = this.inBook ? {
                ...this.inBook
            } : {
                title: '',
                author: '',
                summary: '',
                publishedDate: '1970-01-01',
                isbn: '',
                rating: 0,
                subjects:[],
                price: 1
            };
        }
    }
}
</script>
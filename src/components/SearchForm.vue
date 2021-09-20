<template>
    <v-card dark >
        <v-container fluid>
            <v-row dense>
                <v-col
                cols="12"
                sm="6">
                    <v-text-field
                    v-model="search.title"
                        label="Title"                
                    >
                    </v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6">
                    <v-text-field
                    v-model="search.author"
                        label="Author"
                    >
                    </v-text-field>
                </v-col>

                <v-col
                cols="12"
                sm="6">
                    <v-combobox
                    v-model="search.subjects"
                    :items="subjectList"
                    label="Subjects"
                    multiple
                    chips
                    >
                    </v-combobox> 
                </v-col>
                
                <v-col
                cols="12"
                sm="6">
                    <v-checkbox
                        v-model="search.priceCapEnabled"
                        hide-details
                        ></v-checkbox>
                    <v-slider
                    :disabled="!search.priceCapEnabled"
                    v-model="search.priceCap"
                    max="200"
                    min="1"
                    label="Budget"
                    >
                    <template v-slot:append>
                        <v-text-field
                        v-model="search.priceCap"
                        class="mt-0 pt-0"
                        type="number"
                        style="width: 60px"
                        ></v-text-field>
                    </template>
                    </v-slider>
                </v-col>
                
                <v-col class="text-right">
                    <v-btn 
                    class="mr-4 ml-4"
                    color="primary"
                    @click="onSearch"
                    >
                    Search
                    </v-btn>
                    <v-btn
                    class="mr-4 ml-4"
                    color="primary"
                    @click="onResetSearch"
                    >
                    Reset Search
                    </v-btn>
                </v-col>
                
                
            </v-row>
            
        </v-container>
    </v-card>
</template>

<script>
import SubjectsMixin from '../mixins/SubjectsMixin';

export default {
    name: "SearchForm",
    mixins: [SubjectsMixin],
    data: () =>({
        search:{
            title: '',
            author: '',
            priceCap: 100,
            subjects: [],
            priceCapEnabled: false 
        }
    }),
    methods: {
        onSearch(){
            this.$emit('search-request', this.search);
        },
        onResetSearch(){
            this.search = {
                title: '',
                author: '',
                priceCap: 100,
                subjects: [],
                priceCapEnabled: false 
            }
            this.$emit('search-request', this.search);
        }
    }
}
</script>

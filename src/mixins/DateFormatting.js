import moment from "moment";

export default {
    methods:{
        formatDate(dateStr){
            if(dateStr){
                return moment(dateStr).format('YYYY-MM-DD');
            }
        },
        formatDisplayDate(dateStr){
            if(dateStr){
                return moment(dateStr).format('DD MMMM YYYY');
            }
        },
        formatTime(dateStr){
            if(dateStr){
                return moment(dateStr).format('hh:mm:ss');
            }
        }
    }
}
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

let baseUrl: string = "https://bpcprototyperest.azurewebsites.net/api/bookings/"

interface Ibooking {
    ordNr: number
    startAdr: string
    startTime: string
    startDate: string
    endAdr: string
    endTime: string
    endDate: string
    numberOcn: string
    typeOfGoods: string
    comments: string

}

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {


        ordNr: 0,
        startAdr: "",
        startTime:"",
        startDate:"",
        endAdr:"",
        endTime:"",
        endDate:"",
        numberOcn:"",
        typeOfGoods:"",
        comments:"",
        bookings:[],
        booking: null,

        inputData: {ordNr: 0,
            startAdr: "",
            startTime:"",
            startDate:"",
            endAdr:"",
            endTime:"",
            endDate:"",
            numberOcn:"",
            typeOfGoods:"",
            comments:"",},
        
        addMessage:"",

    },


    created(): void {
        console.log("created")
        this.getAndShowAllBookings();
    },

    methods: {
    getAndShowAllBookings(): void {
        axios.get<Ibooking[]>(baseUrl)
            .then((response: AxiosResponse<Ibooking[]>) => {
                this.bookings = response.data
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
    },

    addBooking(): void {

        console.log("addBookíng")
            axios.post<number>(baseUrl, this.inputData)
                .then((response: AxiosResponse<number>) => {
                    this.addMessage = "Booking added"
                    this.getAndShowAllBookings()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
    }

   
},)


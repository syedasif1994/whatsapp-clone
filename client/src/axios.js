import axios from "axios"

const instance= axios.create({
baseURL:  "https://whatsapp-clone01.herokuapp.com/"
})

export default instance


// "https://whatsapp-clone01.herokuapp.com/"
// "http://localhost:9000"
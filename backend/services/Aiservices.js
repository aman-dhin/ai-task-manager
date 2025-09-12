const axios =require("axios");
 const {GoogleAuth} =require('google-auth-library');

 const getTasksuggestion =async (inputText)=>{
    try {
         const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
            {
                contents:[
                    {parts:[
                        {text: `suggest task name for :${inputText} `}
                    ]}
                ]
            },
            {
                 headers:{"Content-Type": "Application/json"},
                 params:{key:process.env.GOOGLE_PALM_API_KEY}
            }
         )
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "no suggestions "
    } catch (error) {
        console.error("error in api" ,error?.response?.data || error.message);
        return "Error fetching in suggestions "
        
    }
 }
 const getTaskprediction =async (inputText)=>{
    try {
         const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
            {
                contents:[
                    {parts:[
                        {text: `Give answer in 1 line only.how much time it will take me to  complete this task  in hours and minutes   :${inputText} `}
                    ]}
                ]
            },
            {
                 headers:{"Content-Type": "Application/json"},
                 params:{key:process.env.GOOGLE_PALM_API_KEY}
            }
         )
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "no suggestions "
    } catch (error) {
        console.error("error in api" ,error?.response?.data || error.message);
        return "Error fetching in suggestions "
        
    }
 }

 module.exports={getTasksuggestion,getTaskprediction};
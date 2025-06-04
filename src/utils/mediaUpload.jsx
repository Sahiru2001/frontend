import { createClient } from "@supabase/supabase-js"



const url = "https://vjvaprvmvskxfaemyboe.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdmFwcnZtdnNreGZhZW15Ym9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MTkwMDcsImV4cCI6MjA2Mzk5NTAwN30.NNXt6qcwG0zpimwuAUAq5VcMA5GmydrsHCEhxOVAcO4" 

const supabase = createClient(url, key);

export default function mediaUpload(file) {

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{
            if(file == null){

                reject("No file selected");
                return;
            }

            const timestamp = new Date().getTime();
            const newName = timeStamp+file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert: false,
                cacheControl: '3600',

            }).then(() => {
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl;
                console.log(publicUrl);
                resolve(publicUrl);

            }).catch(
                (e)=>{
                console.log(e);
                reject("Error occured in supabase connection");
            })

            



            }
        
    )

    return mediaUploadPromise


}

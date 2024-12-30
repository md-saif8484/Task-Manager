import { connectDb } from "@/helper/db"

connectDb();

export default function profile()
{
    return(

        <h1>
            <div>
                <img src="/assests/bg.jpg"></img>
            </div>
        </h1>
    )
}
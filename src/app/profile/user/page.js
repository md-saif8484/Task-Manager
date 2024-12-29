import { connectDb } from "@/helper/db"

connectDb();

export default function profile()
{
    return(

        <h1>
            this is user profile page
        </h1>
    )
}
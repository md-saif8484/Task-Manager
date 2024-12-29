import { connectDb } from "@/helper/db"

connectDb();

export default function profile()
{
    return(

        <h1>
            this is admin profile page
        </h1>
    )
}
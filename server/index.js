import express from "express"
import 'dotenv/config'
import cors from "cors";
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.router.js"
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000

const app = express()

app.use(express.json());
app.use(cors())


app.use("/api/user", userRouter)
app.use("/api/post", postRouter)



app.listen(port, async ()=>{
    console.log(`server is running at http://localhost:${port}`)
    await connectDB()
})



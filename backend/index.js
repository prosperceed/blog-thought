
import express, { response } from "express"
import { createClient } from "@supabase/supabase-js"
import cors from "cors"
import bodyParser from "body-parser"


const app = express()

const supabaseUrl = "https://vqpaklwgmlriqdzlyfqv.supabase.co"
const supabaseApi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxcGFrbHdnbWxyaXFkemx5ZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NzQwNDYsImV4cCI6MjAzNDI1MDA0Nn0.ZTUqUd-F7RbuczUl7IXVtDkFNrwFwZWY-ovWZ1c_LWA"

const PORT = 3000 || process.env.PORT

const supabase = createClient(supabaseUrl, supabaseApi)

const router = express.Router();
if (process.env.NODE_ENV === 'development') {
  // Enable CORS for development mode

  app.use(cors({
    origin: 'https://blog-thought.onrender.com/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));
}

else{
  app.use(cors("*"));
}

app.use(express.json())
app.use(bodyParser.json({limit: '300kb'}));
app.use(bodyParser.urlencoded({extended: true}))



// Middleware to store user data in req.user
app.use((req, res, next) => {
  req.user = {
    id: 'user-id',
  };
  next();
});


app.use((req, res, next) => {
  // Replace with your frontend URL
  res.header('Access-Control-Allow-Origin', 'https://blog-thought.onrender.com/'); 
  res.header('Access-Control-Allow-Credentials', true); // Allow credentials (cookies)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Specify allowed headers
  next();
});


app.get("/home", async (req,res)=>{
  try{
    const {data, error } =  await supabase
    .from("blog")
    .select("*")
    if(error){
      console.log("Error while fetching", error);
      res.status(500).json({message: "Error while loading data"})
    }
    res.status(201).json(data)
    console.log("The fetched data",data);
    return data

  }
  catch(error){
    console.log("Internal error", error);
    res.status(500).json({error: "An internal error occurred", error})
  }
})

// Route that fetches only requested article by id
app.get("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error while fetching article:", error);
      return res.status(500).json({ message: "Error while loading article" });
    }

    if (!data) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log("Internal error:", error);
    res.status(500).json({ error: "An internal error occurred" });
  }
});



  app.post("/post", async (req, res)=>{
    try{
      const {title, body, author, image} = req.body
console.log(req.body);
      const {data, error} = await supabase
      .from("blog")
      .insert({title, body, author, image});

      if(error){
        console.log("An error was encountered:", error.message)
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({message: "Your post was sent successfully!!", data})
      return data
    }
    catch (error){
      console.error("An error occurred creating your post", error);
      res.status(500).json({error: "Internal server error"})
    }
  })



  // Create Account route

  const getUser = async (userId)=>{
    const {data, error} = await supabase.from("auth.users")
    .select("*")
    .eq("id", userId)
    .single()
    if(error){
      throw error
    }
    return data
  }

  app.get('/auth', async (req, res) => {
    const userId = req.user.id
    try {
      const userData = await getUser(userId)
     if(userData && getUser()){
      res.send("Protected route passed!")
     }
     else{
      res.status(401).send("Unauthorized")
     }

      }
    catch (error) {  
      console.log("Error fetching user data", error.message);
      res.status(500).send("Internal Server error")
      }
  });
  
app.listen(PORT,()=>{
console.log(`App running on port ${PORT}`);
})


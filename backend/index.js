const express = require("express") 
const {createClient} = require("@supabase/supabase-js")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

const supabaseUrl = "https://rzgiicwrerqxfqppofjr.supabase.co"
const supabaseApi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6Z2lpY3dyZXJxeGZxcHBvZmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1Nzg4NzgsImV4cCI6MjAyNzE1NDg3OH0.2VOZPs-W9OQE2P7TT0RkfBfOuolMgTNIuFO-oAggUCQ"


const supabase = createClient(supabaseUrl, supabaseApi)

const router = express.Router();
if (process.env.NODE_ENV === 'development') {
  // Enable CORS for development mode

  app.use(cors({
    origin: 'https://blog-thought.onrender.com/'
  }));
}

else{
  app.use(cors("*"));
}

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", async (req,res)=>{
  try{
    const {data, error }=  await supabase
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
      const {title, body, author} = req.body

      const {data, error} = await supabase
      .from("blog")
      .insert({title:title, body:body, author:author});

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
  

app.listen(8000,()=>{
console.log("App running on port 8000");
})

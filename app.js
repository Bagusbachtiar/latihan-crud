const express = require("express");
const app = express();

const db = require("./config/db");

app.get('/', (req, res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => 
  console.log("berhasil Terkoneksi dengan database")
);

const User = require("./models/User");

app.post("/crud",async (req, res) => {
  try {
      const { username, email, password } = req.body;

      const newUser = new User({
        username,
        email, 
        password
      });

      await newUser.save();

     return res.json(newUser);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server error")
  }
});

app.get("/crud", async (req, res) => {
  try{
    const getAllUser = await User.findAll({});

   return res.json(getAllUser)
  }catch (error) {
    console.error(error.message);
    return res.status(500).send("server error");
  }
});

app.get("/crud/:id", async (req,res) => {
  try{
    const id = req.params.id
    
    const getUser = await User.findOne({
      where: { id:id }
    });

    return res.json(getUser);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server error");
  }
});

app.delete("/crud/:id", async (req,res) => {
  try{
    const id = req.params.id;

    const deleteUser = await User.destroy({
      where: { id: id }
    })

    await deleteUser;

    return res.json("berhasil di hapus")
  } catch (error){
    console.error(error.message);
    return res.status(500).send("server error");
  }
});

app.put("/crud/:id", async (req,res) => {
try{
  const {username, email, password} = req.body
  const id = req.params.id

  const updateUser = await User.update(
    {
    username,
    email,
    password
  },
  { where: { id: id}}
  );

  await updateUser;

  res.json("berhasil di update");
}catch (error) {
  console.error(error.message);
  return res.status(500).send("server error");
}
});

app.listen(4500, () => console.log("port berjalan di 4500"));
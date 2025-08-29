const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

   
    const fullName = "Mohammed Sohail Rehan"; 
    const dob = "15062004"; 

    // building user_id
    const user_id =
      fullName.toLowerCase().replace(/\s+/g, "_") + "_" + dob;

    // Separating values
    const numbers = data.filter((x) => !isNaN(x)).map(Number);
    const alphabets = data.filter((x) => /^[a-zA-Z]+$/.test(x));
    const specials = data.filter((x) => !/^[a-zA-Z0-9]+$/.test(x));

    const even_numbers = numbers.filter((n) => n % 2 === 0).map(String);
    const odd_numbers = numbers.filter((n) => n % 2 !== 0).map(String);
    const upper_alphabets = alphabets.map((a) => a.toUpperCase());
    const sum = numbers.reduce((acc, n) => acc + n, 0);

    // Concating string from all alphabets (joined, reversed, alternating caps)
    let allChars = alphabets.join("").split("").reverse();
    let concat_string = allChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    // Response
    return res.status(200).json({
      is_success: true,
      user_id, 
      email: "m.sohailrehan@gmail.com",
      roll_number: "22bce7929",
      odd_numbers,
      even_numbers,
      alphabets: upper_alphabets,
      special_characters: specials,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, error: err.message });
  }
});



// Root test route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/bfhl", (req, res) => {
  res.json({ message: "testing get here" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

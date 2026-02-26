const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/action", (req, res) => {
    const { target } = req.body;

    console.log("Cabrino de Noël action vers :", target);

    res.json({
        status:"success",
        message:"🎄 Cabrino de Noël a envoyé l'action !"
    });
});

app.listen(3000, () => {
    console.log("🎄 Cabrino de Noël Server ON");
});

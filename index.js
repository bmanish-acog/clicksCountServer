const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "This is an API to count the respective no. of clicks on buttons",
  });
});

app.post("/json", (req, res) => {
    const id  = req.query.id;
    // console.log(id === 'join');
    fs.readFile("data.json", (err, data) => {
        if (err) {
            res.json({
                err: err,
            });
            return;
        }

        let fileData = JSON.parse(data);

          id === "banner" ? fileData.get_in_touch_from_homepage_banner += 1
        : id === "cta" ? fileData.get_in_touch_from_homepage_cta += 1
        : id === "aboutpage" ? fileData.join_us_btn_from_aboutpage += 1
        : id === "contactpage" ? fileData.reach_us_link_from_contactpage += 1
        : id === "scientist" ? fileData.apply_btn_from_data_scientist += 1
        : id === "engineer" ? fileData.apply_btn_from_data_engineer += 1
        : id === "developer" ? fileData.apply_btn_from_web_developer += 1
        : id === "devops" ? fileData.apply_btn_from_devops += 1
        : id === "bioinformatics" ? fileData.apply_btn_from_bioinformatics += 1
        : id === "cheminformatics" ? fileData.apply_btn_from_cheminformatics += 1
        : id === "architect" ? fileData.apply_btn_from_lead_sol_architect += 1
        : console.log("id is invalid")

        let updatedCount = fileData;

        fs.writeFile("data.json", JSON.stringify(updatedCount,null, 4), (err) => {
            if (err) {
                console.log(err);
                res.json({
                    err: err,
                });
                return;
            }
        });

        res.json({
            data: updatedCount,
        });

        return;
    });
});

var path = require('path');
app.get('/showData', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, 'data.json'));
})

const port = 5000

app.listen(port, () => {
    console.log(`App successfully running at : http://localhost:${port}`);
});

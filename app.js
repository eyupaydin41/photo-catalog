const express = require(`express`);
const path = require(`path`);
const ejs = require(`ejs`);
const Photo = require(`./model/Photo`)
const mongoose = require('mongoose').default;

const app = express();

mongoose.connect('mongodb://localhost/pcat-db')
    .then(() => console.log("Başarıyla veritabanı ile bağlantı kuruldu."))
    .catch((err) => console.log("Veritabanına bağlanırken hata oluştu: ", err));


app.set("view engine","ejs");
app.use(express.static(`public`));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`);
})

app.get(`/`, async (req, res) => {
    const photos = await Photo.find({});
    res.render(`index`, {
        photos
    });
})

app.get(`/about`, (req, res) => {
    res.render(`about`);
})

app.get(`/add`, (req, res) => {
    res.render(`add`);
})

app.post(`/photos`, async (req, res) => {
    await Photo.create(req.body);
    res.redirect(`/`);
})

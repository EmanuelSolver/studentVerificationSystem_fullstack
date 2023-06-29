import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';
import config from './src/db/config.js';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//setup cors
app.use(cors());
app.use("/images", express.static('images')); //using path lib to access images in folders


//setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); //null is error
    },
    filename: (req, file, cb) => {
        cb(null, req.body.category_image);
    },
});

const upload = multer({ storage: storage }); //upload file

//set upload route
app.post("/upload", upload.single("file"), async (req, res) => {
    //single file upload
    try {
        const { category_name, category_image } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("categoryName", sql.VarChar, category_name)
            .input("categoryImage", sql.VarChar, category_image)
            .query("insert into category (category_name,category_image) values (@categoryName, @categoryImage)");
        res.status(201).json({ message: 'category created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        sql.close();
    }
});

app.get("/category", async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        let products = await pool.request().query("select * from category");
        res.json(products.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        sql.close();
    }
});

app.post("/delCategory", async (req, res) => {
    const { category_id, category_image } = req.body;
    const deleteFile = async () => {
        try {

            let pool = await sql.connect(config.sql);
            await pool.request()
                .input("categoryID", sql.Int, category_id)
                .query("delete from category where id = @categoryID");
            res.status(201).json({ message: 'category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            sql.close();
        }
    }

    if (fs.existsSync(`images/${category_image}`)) {
        fs.unlink(`images/${category_image}`, (err) => {
            if (err) {
                res.status(500).json({ error: 'missing image' });
            }
            else {
                deleteFile();
            }
        });
    } else {
        deleteFile();
    }
});

app.get('/', (req, res) => {
    res.send("Hello😁 Welcome todo API!");
});

app.listen(config.port || 5000, () => {
    console.log(`Server is running on ${config.port}`);
});
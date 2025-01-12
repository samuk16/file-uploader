import express from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";
import methodOverride from "method-override";
import { PORT } from './config/config';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



app.listen(PORT || 8000, () => {
    console.log(`Server running on port ${PORT}`);
})



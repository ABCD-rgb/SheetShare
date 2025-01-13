import { getAllSheets, updateSheetByIndex } from "./controller/sheet-controller.js";

const routes = (app) => {
    // insert routes here and its handlers
    app.get('/', (req, res) => {
        res.send('Hello World :0');
    });
    app.get('/sheets/getAllSheets', getAllSheets);
    app.put('/sheets/updateSheetByIndex', updateSheetByIndex);
}


export default routes;
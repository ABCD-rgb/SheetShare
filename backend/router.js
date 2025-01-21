import { getAllSheets, updateSheetByIndex } from "./controller/sheet-controller.js";
import { createUser, validateUser } from "./controller/user-controller.js";

const routes = (app) => {
    // insert routes here and its handlers
    app.get('/', (req, res) => {
        res.send('Hello World :0');
    });
    app.get('/sheets/getAllSheets', getAllSheets);
    app.put('/sheets/updateSheetByIndex', updateSheetByIndex);
    app.post('/auth/createUser', createUser);
    app.post('/auth/validateUser', validateUser);
}


export default routes;
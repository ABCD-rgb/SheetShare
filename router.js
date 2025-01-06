
const routes = (app) => {
    // insert routes here and its handlers
    app.get('/', (req, res) => {
        res.send('Hello World :0');
    });
}


export default routes;
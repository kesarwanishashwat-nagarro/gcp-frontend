'use strict';

const clusterIP = process.env.CLUSTER_ID || 'localhost:3000';
const CLUSTER_ID = "http://" + clusterIP;

module.exports = function (app, request) {
    app.get("/auth", (req, res) => {
        var userid = req.query.userid;
        var pwd = req.query.pwd;
        console.log(CLUSTER_ID + "/auth?userid=" + userid + "&pwd=" + pwd);
        request.get(CLUSTER_ID + "/auth?userid=" + userid + "&pwd=" + pwd, { json: true }, (err, resp, body) => {
            if (err || !body) {
                res.send("Error while authenticating from " + CLUSTER_ID + "/auth")
            } else {
                res.send(body);
            }

        });
    });

    app.get("/students", (req, res) => {
        request(CLUSTER_ID + "/students", { json: true }, (err, resp, body) => {
            if (err || !body) {
                res.send("Error while getting users from " + CLUSTER_ID + "/students")
            } else {
                res.send(body);
            }

        });
    });

    app.post("/students", (req, res) => {
        request.post({
            url: CLUSTER_ID + '/students',
            body: req.body,
            json: true
        }, function (err, resp, body) {
            if (err || !body) {
                res.send("Error while getting users from " + CLUSTER_ID + '/students')
            } else {
                res.send(body);
            }
        });
    });

    app.get("/students/:id", (req, res) => {
        const id = req.params.id;
        request.get(CLUSTER_ID + "/students/" + id+'?isDelete=false', { json: true }, (err, resp, body) => {
            if (err || !body) {
                res.send("Error while getting users from " + CLUSTER_ID + "/students")
            } else {
                res.send(body);
            }

        });
    });

    app.put("/students/:id", (req, res) => {
        const id = req.params.id;
        console.log("in update: "+ id);
        request.post({
            url: CLUSTER_ID + '/students/' + id,
            body: req.body,
            json: true
        }, function (err, resp, body) {
            if (err || !body) {
                res.send("Error while getting users from " + CLUSTER_ID + '/students')
            } else {
                res.send(body);
            }
        });
    });

    app.delete("/students/:id", (req, res) => {
        const id = req.params.id;
        console.log("in delete: "+ id);
        request.get(CLUSTER_ID + "/students/" + id+'?isDelete=true', { json: true }, (err, resp, body) => {
            if (err || !body) {
                res.send("Error while getting users from " + CLUSTER_ID + "/students")
            } else {
                res.send(body);
            }

        });
    });
};
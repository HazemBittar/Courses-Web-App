"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const util = require("util");

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");


const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function getCourse() {
    let courses = [];
    const list = await readFilePromise(DATA_DIR, "utf-8");
    courses = JSON.parse(list);
    return courses;
}
// const courses = [
//   { id: 1, name: "course1" },
//   { id: 2, name: "course2" },
//   { id: 3, name: "course3" },
//   { id: 4, name: "course4" },
// ];

// function validateCourse(course) {

//   const schema = { name: Joi.string().min(2).required() };
//   return Joi.validate(course, schema);
// }

const controllers = {
    hello: (req, res) => {
        res.json({ api: "courses!" });
    },

    readList: async(req, res) => {
        try {
            let contents = await readFilePromise(DATA_DIR, "utf8");
            res.send(JSON.parse(contents));
        } catch (err) {
            res.status(404).send(err);
        }
    },

    readCourse: async(req, res) => {
        let courses = await getCourse();
        let id = parseInt(req.params.id);
        if (courses[id - 1]) {
            let course = courses[id - 1];
            console.log(course);
            res.send(course);
        } else {
            res
                .status(404)
                .send(`The course with the ID=${req.params.id} does not exist`);
        }
    },

    addCourse: async(req, res) => {
        let courses = await getCourse();

        try {
            const course = {
                id: courses.length + 1,
                name: req.body.name,
            };
            courses.push(course);
            console.log(course);


            console.log(courses);
            await writeFilePromise(DATA_DIR, JSON.stringify(courses));
            res.send(course);
        } catch (err) {
            res.status(501).send(err);
        }

    },

    updateCourse: async(req, res) => {

        let courses = await getCourse();
        let id = parseInt(req.params.id);

        if (!courses[id - 1]) {
            res
                .status(404)
                .send(`The course with the ID=${req.params.id} does not exist`);
            return;
        }

        const result = validateCourse(req.body);
        if (result.error) {
            res.status(400).send(result.error.details[0].message);
        }
        try {

            let course = courses[id - 1];
            course.name = req.body.name;
            await writeFilePromise(DATA_DIR, JSON.stringify(courses));
            res.send(course);
        } catch (err) {
            res.status(501).send(err);
        }
    },

    deleteCourse: async(req, res) => {

        let courses = await getCourse();
        let id = parseInt(req.params.id);

        const course = courses[id - 1];
        if (!course)
            res
            .status(404)
            .send(`The course with the ID=${req.params.id} does not exist`);

        const index = courses.indexOf(course);
        courses.splice(index, 1);
        await writeFilePromise(DATA_DIR, JSON.stringify(courses));

        res.send(course);
    },
};
module.exports = controllers;
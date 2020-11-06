const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.hello);

// write your routes

router.get("/courses", controllers.readList);
router.get("/courses/:id", controllers.readCourse);
router.post("/courses", controllers.addCourse);
router.put("/courses/:id", controllers.updateCourse);
router.delete("/courses/:id", controllers.deleteCourse);

module.exports = router;

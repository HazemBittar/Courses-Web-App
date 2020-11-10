export const init = async() => {
    const res = await fetch('/api');
    const data = await res.json();
    console.log(data);
};

import { List } from './course-list.js'
import { Course } from './course.js'

const list = new List(Course, '/api/courses');
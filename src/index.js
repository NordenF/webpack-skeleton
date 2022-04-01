import "core-js/stable";  // For babel.
import "regenerator-runtime/runtime";  // For babel.

import moment from 'moment';
import Post from "./models/Post";
import "./styles/styles.css"
import "./styles/sass-example.scss"
import "./babel-example"

const post = new Post("Webpack Post title")

console.log("Post to string:", post.toString())

document.getElementById("timeDiv").textContent = moment().format('LLLL');
import Post from "@models/Post";
import WebpackLogo from './assets/webpack-logo';
import './styles/styles';
import './styles/scss.scss';
import './babel'

const post = new Post("Webpack post title", WebpackLogo);

const pre = document.getElementsByTagName('pre')[0];
pre.classList.add('code');
pre.innerText = post.toString();

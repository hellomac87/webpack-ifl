import axios from 'axios';
import "./app.css";
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get('/api/users');
  console.log(res);

  const userList = (res.data || []).map(user => {
    return `<div>${user.id}: ${user.name}</div>`
  }).join('');

  document.body.innerHTML = userList;
});

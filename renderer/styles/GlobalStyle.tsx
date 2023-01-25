import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body,
div,
span,
h1,
h2,
p,
a,
address,
img,
small,
strong,
i,
dl,
dt,
dd,
ul,
li,
form,
label,
article,
figure,
footer,
header,
section {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}

article,
figure,
footer,
header,
menu,
nav,
section {
    display: block;
}

body {
    line-height: 1;
}

ol,
ul,
li {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

input,
select {
    border: 0;
}

a,
a:visited,
a:link,
a:active {
    color: #000;
    text-decoration: none;
}

html {
    font-size: 62.5%;
    box-sizing: border-box;
}



/* chat component */
.messages-wrapper {
  padding: 30px;
  margin-bottom: 60px;
}
.chat-bubble {
  border-radius: 20px 20px 20px 0;
  padding: 15px;
  background-color: #7cc5d9;
  color: #1c2c4c;
  width: max-content;
  max-width: calc(100% - 50px);
  box-shadow: -2px 2px 1px 1px #4c768d;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}
.chat-bubble.right {
  margin-left: auto;
  border-radius: 20px 20px 0 20px;
  background-color: #fff;
  box-shadow: -2px 2px 1px 1px #88dded;
}
.chat-bubble__left {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-name {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #1c2c4c;
}
.user-message {
  word-break: break-all;
}
.message-time {
  display: block;
  text-align: right;
}

/* send message */
.send-message {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 20px 30px;
  background-color: #4c768d;
  display: flex;
}
.send-message > input {
  height: 40px;
  padding: 10px 10px;
  border-radius: 5px 0 0 5px;
  border: none;
  flex-grow: 1;
  background-color: white;
  color: #1c2c4c;
  font-size: 1rem;
}
.send-message > input:placeholder {
  color: #ddd;
}
.send-message > :is(input, button):focus {
  outline: none;
  border-bottom: 1px solid #7cc5d9;
}
.send-message > button {
  width: 70px;
  height: 40px;
  padding: 5px 10px;
  border-radius: 0 5px 5px 0;
  color: #242443;
  border: 1px solid #7cc5d9;
  background-color: #7cc5d9;
  font-weight: 600;
}



`;

export default GlobalStyle;

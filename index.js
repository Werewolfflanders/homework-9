const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require("html-pdf");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "color",
      choices: ["green", "blue", "pink", "red"]
    }
  ])
  .then(function(response) {
    // Get Preferred Color
    const color = response.color;

    // Query Github Data
    const username = response.username;
    const queryURL = `https://api.github.com/users/${username}`;

    axios.get(queryURL).then(function(result) {
      // Profile Image
      // Username
      // User location via Google Maps
      // User GitHub Profile
      // User blog
      // User bio
      // Number of public repositories
      // Number of followers
      // Number of GitHub stars
      // Number of users following

      const data = {
        profile_img: result.data.avatar_url,
        url: result.data.html_url,
        name: result.data.name,
        company: result.data.company,
        location: result.data.location,
        blog: result.data.blog,
        bio: result.data.bio,
        num_repo: result.data.public_repos,
        num_followers: result.data.followers,
        num_stars: result.data.public_gists,
        num_following: result.data.following
      };
      generateHTML(data, color);
    });
  });

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(data, color) {
  const html = `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <title>GitHub Profile Generator</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 2.7em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[color].headerBackground};
           color: ${colors[color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           margin: 0 auto;
           display: block;
           border: 6px solid ${colors[color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[color].headerBackground};
             color: ${colors[color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }

           @media (min-width: 576px) {
            .wrapper {
              height: 75%;
            }
            .row {
              display: inline;
            }
            #bottom-wrapper {
              padding-top: 0;
              height: 20% !important;
            }
          }
        </style>
        </head>
  <body>
    <div class="wrapper">
      <div class="photo-header">
          <img src="${data.profile_img}" />
          <h1>Hi!</h1>
          <h1>My name is ${data.name}!</h1>
          <h4 style="text-align:center;">Currently @ ${data.company}</h4>
        <div class="links-nav">
          <a class="nav-link" href="http://maps.google.com/?q=${data.location}" target="_blank"><i class="fas fa-location-arrow"></i> ${data.location}</a>
          <a class="nav-link" href="${data.url}" target="_blank"><i class="fab fa-github"></i> Github</a>
          <a class="nav-link" href="${data.blog}" target="_blank"><i class="fas fa-rss"></i> Blog</a>
        </div>
      </div>
    </div>
   
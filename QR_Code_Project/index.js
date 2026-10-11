/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import code from "qr-image";
import fs from "fs";

inquirer
  .prompt([{
    "message" : "type ur url",
        "name":"url"
    }
  ])
  .then((answers) => {
    const qrin=answers.url;
    var qr_svg = code.image(qrin);
    qr_svg.pipe(fs.createWriteStream('ytcode.png'));

    fs.writeFile("url.txt", qrin ,(err)=>{
        if(err)throw err; 
        console.log("the file is saved");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log("Something else went wrong") ;
    }
  });
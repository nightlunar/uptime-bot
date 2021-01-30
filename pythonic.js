const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("please don't reveal your token...");
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343); //port



//uptime begins
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("pinged.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//helps the bot uptime itself and the bots in itself.


setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi."); //message to warn that a project has been failed to ping
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embeds

const help = new discord.MessageEmbed()
.setFooter("plasmic uptime yardımcısı")
.setColor("RED")
.setThumbnail('https://i.imgur.com/4M7IWwP.gif')  //this is a help menu, edit is as you will
.setDescription(`Selamlar, botunu uptime etmeye hazırmısın? \n artık kolay bir şekilde botunu 7/24 aktif edebilirsin! \n\n🤹 uptime olmak için \`!ekle [glitch linki]\` yazabilirsin \n🎭 Uptime ettiğin botlarımı görmek istiyorsun \`!göster\` `)








client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") { //if the message includes !ekle, feel free to change it
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link) //sets up our little links
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("Plasmic-uptime").setColor("RED").setDescription("Projeniz Sistemimizde Zaten Var"));
        message.channel.send(new discord.MessageEmbed().setFooter("Plasmic-uptime").setColor("RED").setDescription("Projeniz Sistemimize Başarıyla Eklendi."));
        db.push("linkler", { url: link, owner: message.author.id }); //saves the links to a database
      })               //feel free to change the embeds
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Plasmic-uptime").setColor("RED").setDescription("Lütfen Bir Link Giriniz"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!göster") {  //checks if msg includes !göster, change it as you will.
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Plasmic-uptime").setColor("RED").setDescription(`${db.get("linkler").length} Proje Aktif Tutuluyor!`));
  } //this is the menu where it shows how many servers it is holding
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") { //checks if msg includes !yardım, change it as you will.
    var link = spl[1];
    message.channel.send(help); //our embed from the start, aka the help menu
  }
});

var TelegramBot = require("node-telegram-bot-api");
var http = require("http");
var fs = require("fs");
var telegram = new TelegramBot(
  "1342608979:AAHmo-5Jyr0SE0TWJWJGU07gs-R83D1x7yw",
  { polling: true }
);
var a;
var check = 0;
var check2 = 0;
var addCredits = 0;
 telegram.sendMessage(
                    -1001495013298,
                    "Total credits in your account :
                  );

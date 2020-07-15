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
telegram.on("text", (message, match) => {
  if (message.text.toLowerCase() == "yes") {
    check = 1;
  }
  if (message.text == "/reset" && message.from.username == "Soitchu") {
    fs.writeFile("data.json", '{"lastTime":' + Date.now() + "}", function(err) {
      if (err) {
        throw err;
      } else {
        telegram.sendMessage(message.chat.id, "Done!");
      }
    });
  } else if (message.text == "/reset") {
    telegram.sendMessage(message.chat.id, "Fuck off, Katie!");
  }

  if (
    message.text.split(" ")[0] == "/add" &&
    message.from.username == "Soitchu"
  ) {
    fs.readFile("credit.json", function(err, data) {
      if (err) throw err;
      if (data) {
        credit_file = JSON.parse(data.toString("utf8")).credits;
        credit_file = credit_file + parseInt(message.text.split(" ")[1]);
        console.log(credit_file, "ffff");
        if (isNaN(credit_file) == 0) {
          fs.writeFile(
            "credit.json",
            '{"credits":' + credit_file + "}",
            function(err) {
              if (err) {
                throw err;
              } else {
                telegram.sendMessage(
                  -1001495013298,
                  "Total credits in your account : " + credit_file
                );
              }
            }
          );
        }
      }
    });
  } else if (message.text.split(" ")[0] == "/add") {
    telegram.sendMessage(message.chat.id, "Fuck off, Katie!");
  }

  if (message.text.split(" ")[0] == "/gamble") {
    
    fs.readFile("credit.json", function(err, data) {
        if (err) throw err;
        if (data) {
                    credit_file = JSON.parse(data.toString("utf8")).credits;

    var total = message.text.split(" ");
    if (
      total.length == 3 &&
      isNaN(total[1]) == 0 &&
      isNaN(total[2]) == 0 &&
      total[2] >= 0 &&
      total[2] <= 6 && credit_file>=total[1]
    ) {
      var money = total[1];
      var dice = total[2];
      if (Math.floor(Math.random() * 6) + 1 == dice) {
        money = money * 2;
      } else {
        money = money * 0;
      }
      
          // credit_file=credit_file+parseInt(message.text.split(" ")[1]);
          // console.log(credit_file,"ffff");
          if (isNaN(credit_file) == 0) {
            fs.writeFile(
              "credit.json",
              '{"credits":' + (credit_file - total[1] + money) + "}",
              function(err) {
                if (err) {
                  throw err;
                } else {
                  telegram.sendMessage(
                    -1001495013298,
                    "Total credits in your account : " +
                      (credit_file - total[1] + money)
                  );
                }
              }
            );
          }
        
    } else {
      telegram.sendMessage(
        message.chat.id,
        "Wrong format. \nCorrect format : /gamble <money> <dice number>"
      );
    }
        }
      });
  }

  if (
    message.text.split(" ")[0] == "/remove" &&
    message.from.username == "Soitchu"
  ) {
    fs.readFile("credit.json", function(err, data) {
      if (err) throw err;
      if (data) {
        credit_file = JSON.parse(data.toString("utf8")).credits;
        credit_file = credit_file - parseInt(message.text.split(" ")[1]);
        console.log(credit_file, "ffff");
        if (isNaN(credit_file) == 0) {
          fs.writeFile(
            "credit.json",
            '{"credits":' + credit_file + "}",
            function(err) {
              if (err) {
                throw err;
              } else {
                telegram.sendMessage(
                  -1001495013298,
                  "Total credits in your account : " + credit_file
                );
              }
            }
          );
        }
      }
    });
  } else if (message.text.split(" ")[0] == "/remove") {
    telegram.sendMessage(message.chat.id, "Fuck off, Katie!");
  }

  if (message.text == "/now" && message.from.username == "Soitchu") {
    fs.writeFile("data.json", '{"lastTime":' + 0 + "}", function(err) {
      if (err) {
        throw err;
      } else {
        telegram.sendMessage(message.chat.id, "Done!");
      }
    });
  } else if (message.text == "/now") {
    telegram.sendMessage(message.chat.id, "Fuck off, Katie!");
  }

  if (message.text == "/timeleft") {
    var date = Date.now();

    fs.readFile("data.json", function(err, data) {
      if (err) throw err;
      if (data) {
        data_file = JSON.parse(data.toString("utf8"));
        console.log(date - data_file.lastTime);

        telegram.sendMessage(
          -1001495013298,
          "Time left : " + (1800000 - date + data_file.lastTime) / (1000 * 60)
        );
      }
    });
  }

  if (message.text == "/credit") {
    var date = Date.now();

    fs.readFile("credit.json", function(err, data) {
      if (err) throw err;
      if (data) {
        data_file = JSON.parse(data.toString("utf8"));

        telegram.sendMessage(
          -1001495013298,
          "Total credits in your account : " + data_file.credits
        );
      }
    });
  }

  if (message.text.split(" ")[0] == "/stopwater") {
    clearInterval(b);
    clearInterval(a);
    telegram.sendMessage(message.chat.id, "You killed Watu! You monster");
  }
  if (message.text.split(" ")[0] == "/startwater") {
    clearInterval(a);
    a = setInterval(function() {
      check_f();
    }, 2000);
    telegram.sendMessage(message.chat.id, "Watu is alive! Yay!");
  }
  // telegram.deleteMessage(message.chat.id, message.message_id);
  console.log(message);
});

var data_file;
var updated_data;
var interval = 2000;
var b;
var check3 = 0;
var credit_file;
function water_reminder() {
  if (check == 0) {
    if (check3 == 0) {
      check3 = 1;
      clearInterval(b);
      b = setInterval(function() {
        addCredits = addCredits - 2;
        telegram.sendMessage(-1001495013298, "Did you drink it yet? - YES/NO");
      }, 10000);
    }
  } else {
    data_file.lastTime = Date.now();
    updated_data = JSON.stringify(data_file);
    console.log(updated_data, 1);
    fs.writeFile("data.json", updated_data, function(err) {
      if (err) {
        throw err;
      } else {
        fs.readFile("credit.json", function(err, data) {
          if (err) throw err;
          if (data) {
            credit_file = JSON.parse(data.toString("utf8")).credits;
            credit_file = credit_file + addCredits;

            fs.writeFile(
              "credit.json",
              '{"credits":' + credit_file + "}",
              function(err) {
                if (err) {
                  throw err;
                } else {
                  telegram.sendMessage(
                    -1001495013298,
                    "Number of credits added : " +
                      addCredits +
                      "\nTotal credits in your account : " +
                      credit_file
                  );
                }
              }
            );
          }
        });

        check = 0;
        check2 = 0;
        check3 = 0;
        clearInterval(b);
        telegram.sendVideo(
          -1001495013298,
          "https://giphy.com/gifs/5tmRHwTlHAA9WkVxTU",
          { caption: "Good girl! *pat pat*" }
        );
      }
    });
  }
  if (check2 == 0) {
    addCredits = 20;
    telegram.sendVideo(
      -1001495013298,
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/201ad23f-f34c-48b6-91aa-0f0bb831c697/dd13ufr-21e4db94-b35d-4dcb-95b1-6c3f4adb9d7e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMjAxYWQyM2YtZjM0Yy00OGI2LTkxYWEtMGYwYmI4MzFjNjk3XC9kZDEzdWZyLTIxZTRkYjk0LWIzNWQtNGRjYi05NWIxLTZjM2Y0YWRiOWQ3ZS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.GtJdRlbfSx5aJBp_g38WRtYGOSlRvcIuypgluMTFM0c",
      { caption: "DRINK WATER!!!!" }
    );
  }
  check2 = 1;
}
a = setInterval(function() {
  check_f();
}, interval);

function check_f() {
  var date = Date.now();
  fs.readFile("data.json", function(err, data) {
    if (err) throw err;
    if (data) {
      data_file = JSON.parse(data.toString("utf8"));
      console.log(date - data_file.lastTime);
      console.log(date, data_file);
      if (date - data_file.lastTime > 1800000) {
        water_reminder();
      }
    }
  });
}

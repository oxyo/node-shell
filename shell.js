
const shell = require('node-powershell');
 
let ps = new shell({
  executionPolicy: 'Bypass',
  noProfile: true
});
 
ps.addCommand('.\\getEvents.ps1 99');
//ps.addCommand('hostname');

ps.invoke()
.then(output => {
  console.log(output);

  var events = JSON.parse(output);

  console.log('Parsed Object ----------------\n');

  for (let i = 0; i < events.length; i++) {

    console.log('MachineName: ' + events[i].MachineName + ' appId: ' + events[i].Source + ' eventId: ' + events[i].EventID);
    console.log('    message: ' + events[i].Message);
    console.log();
    
  }


  ps.dispose();
})
.catch(err => {
  console.log(err);
  ps.dispose();
});



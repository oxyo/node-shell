
const shell = require('node-powershell');
 
let ps = new shell({
  executionPolicy: 'Bypass',
  noProfile: true
});
 
ps.addCommand('echo node-powershell');
ps.addCommand('hostname');


ps.invoke()
.then(output => {
  console.log(output);
  //ps.dispose();
})
.catch(err => {
  console.log(err);
  ps.dispose();
});



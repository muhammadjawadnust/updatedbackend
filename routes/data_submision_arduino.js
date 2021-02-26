const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000
const path = require('path')

/**
   * Run python myscript, pass in `-u` to not buffer console output
   * @return {ChildProcess}
*/

function runScript(){
  
   return spawn('python', [
      "-u",
      path.join(__dirname, 'data_submission_arduino.py'),
     "", "",
   ]);
}
const subprocess = runScript()
// print output of script
subprocess.stdout.on('data', (data) => {
   console.log(`data:${data}`);
});
subprocess.stderr.on('data', (data) => {
   console.log(`error:${data}`);
});
subprocess.stderr.on('close', () => {
   console.log("Closed");
});
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))


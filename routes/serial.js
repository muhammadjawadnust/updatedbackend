const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const app = express();
const path = require('path');




/**
   * Run python myscript, pass in `-u` to not buffer console output
   * @return {ChildProcess}
*/


function serial3(){
  
      return spawn('python', [
         "-u",
         path.join(__dirname, 'serialtest.py' ), 
     'COM3' , '9600' ,'serial3_log', 'serial3_stop'
   
      ]);
   }
   
   
   const subprocess = serial3()
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
   
   //
   
   /**
      * Run python myscript, pass in `-u` to not buffer console output
      * @return {ChildProcess}
   */
   
   function serial(){
     
         return spawn('python', [
            "-u",
            path.join(__dirname, 'serialtest.py' ), 
      'COM12', '115200', 'serial_log', 'serial_stop', 
         ]);
      }
   
      const subprocess1 = serial()
   // print output of script
   subprocess1.stdout.on('data', (data) => {
      console.log(`data:${data}`);
   });
   subprocess1.stderr.on('data', (data) => {
      console.log(`error:${data}`);
   });
   subprocess1.stderr.on('close', () => {
      console.log("Closed");
   });
   
   
   //
   
   /**
      * Run python myscript, pass in `-u` to not buffer console output
      * @return {ChildProcess}
   */
   
   function serial5(){
     
         return spawn('python', [
            "-u",
            path.join(__dirname, 'serialtest.py' ), 
        'COM15', '115200', 'serial5_log', 'serial5_stop',
   
      
         ]);
      }
   
      const subprocess2 = serial5()
   // print output of script
   subprocess2.stdout.on('data', (data) => {
      console.log(`data:${data}`);
   });
   subprocess2.stderr.on('data', (data) => {
      console.log(`error:${data}`);
   });
   subprocess2.stderr.on('close', () => {
      console.log("Closed");
   });
   
   
   //
   /**
      * Run python myscript, pass in `-u` to not buffer console output
      * @return {ChildProcess}
   */
   
   function serial6(){
     
         return spawn('python', [
            "-u",
            path.join(__dirname, 'serialtest.py' ), 
        'COM8', '115200', 'serial6_log', 'serial6_stop'
      
         ]);
      }
   
      const subprocess3 = serial6()
   // print output of script
   subprocess.stdout.on('data', (data) => {
      console.log(`data:${data}`);
   });
   subprocess3.stderr.on('data', (data) => {
      console.log(`error:${data}`);
   });
   subprocess3.stderr.on('close', () => {
      console.log("Closed");
   });




//module.exports={serial3};
module.exports =router;
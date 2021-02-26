set arg1=%1
set arg2=%2
set arg3=%3
arduino-cli compile --fqbn %arg1% %arg2%
REM echo "Done Compiling!";
arduino-cli upload -p %arg3% --fqbn %arg1% %arg2%
REM echo "Done Uploading!";

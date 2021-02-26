# import serial
# ser = serial.Serial('COM3', 115200, timeout=0, parity=serial.PARITY_NONE, rtscts=1)
# ser.flushInput()
#
# ser_bytes = ser.read(100)
# # decoded_bytes = str(ser_bytes[0:len(ser_bytes)-2].decode("utf-8"))
# decoded_bytes = str(ser_bytes)
# print(decoded_bytes)


from time import sleep
import time
import serial
import os
import sys
from sys import argv

com = argv[1]
baud = argv[2]
filename =  argv[3]
out_file =  argv[4]
filename = filename + ".txt"
out_file = out_file + ".txt"



with open(out_file, "w+", encoding='utf-8') as f:
        f.truncate(0)
with open(filename, "w+", encoding='utf-8') as f:
        f.truncate(0)




ser = serial.Serial(com, baud)
# ser = serial.Serial("COM3", 115200)

# while x == True:
#     sleep(1)
#     getVal = str(ser.readline().decode("utf-8")).rstrip()
#     print(getVal)
#     if (getVal == "Counter: 10"):
#         x=False


# sleep(2)



timeout = 60   # [seconds]

timeout_start = time.time()

while time.time() < timeout_start + timeout:
# while True:
#     sleep(1)
    if os.stat(out_file).st_size != 0:
        with open(out_file, "r+", encoding='utf-8') as f:
            keyboardInput = f.readline()
            f.truncate(0)
            if str(keyboardInput) == "---Completed---":  # for exiting serial monitor
                sys.exit()
    try:
        bytesToRead = ser.inWaiting()  # get the amount of bytes available at the input queue
        if bytesToRead:
                getVal = str(ser.readline().decode('utf-8')).rstrip()
                print(getVal)
                with open(filename, "a+", encoding='utf-8') as f:
                        f.write(str(getVal + '\n'))
    except:
                # Manually raise the error again so it can be caught outside of this method
        pass



with open(filename, "a+", encoding='utf-8') as f:
        f.write("---Completed---")
# with open(out_file, "w+", encoding='utf-8') as f:
#         f.truncate(0)


sys.exit(1)
## Running the Raspberry Pi script
Open the directory "IQDS/hx711py/time" and find the python script "example.py"
Open the script and run it
The camera will take a single picture and upload it to the s3 bucket as well as upload it to the directory that the python script is in

## Weight Sensor Failure and Future Work
The external weight sensor, hx711, did not work for our Raspberry Pi. We used two different hx711 chips and two different sensors but for all configurations, we
were unable to get a proper output from the sensor. Initially, with the first chip we received, there was faulty wiring so the chip was receiving power but it was
not able to recognize any data since the data and clock pins were not properly working. For the second chip, it was able to read data but the data that it was reading
did not correspond to the sensor at all. Even after running the setup script and calibrating the sensor, the sensor would give random values that did not match up
with what was occurring on the weight sensor. For example, to calibrate we used a 2 kg weight and put it on the sensor, but the data that was being reported was the same 
as when the scale was empty. Both the chips and both the sensors are with the rest of the hardware and there are multiple scripts on the raspberry pi for running the 
hx711 weight sensor so going forward, the next goal would be to get the weight sensor to properly read in data and integrate that to the onepicture.py script so that
it only takes the picture once the sensor detects that there's even a can on the plate and uploads the weight of the can along with the picture to the s3 bucket.

## Running the Computer Vision Model

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
Access the colab notebooks at this link via the team email - https://drive.google.com/drive/u/0/folders/1cC_HE9Kc1_s03Ttf-ihH-aN4rz2bKcEs. 

There are two directories intell-qual-1 and intell-qual-2: each a dataset of cans with three classes defined: Dent_Can, Lid_Open, and Tin_Can. The best.pt files store the weights of the model that are retrived during prediction. So if a new model is trained and used, that model would need to be hosted in this directory to be acessible by the cv-model notebook. 

The cv-model.ipynb file hosts all of the logic required to retrive data from the S3 bucket, run the computer vision model, and push output to DynamoDB. Run each of the cells in the cv-model notebook sequentially except for the ones which say "ONLY ON DEV". Make sure you select the runtime under "Change runtime type" to be a T4 GPU. 

We built the architecture from the assumption that we would pull the data in a batch style process and clear previous runs, the logic will work only when the DynamoDB database is empty and the S3 bucket has only unpredicted files. So if you are running this process subsequently, ensure that all files starting with a "pred-" are cleared in S3 and the DynamoDB database is empty. This logic would later need to be updated so automatic fetch exists to bypass the issue of clearing these manually. 

The cells that say "ONLY ON DEV" are used to train the model. You just need to change the parameters such as the epochs or the dataset and download the resulting best.pt from the training run and store it in the forementioned directory. 
The S3 bucket and DynamoDB instance are accessible via the team's AWS account. 

## Current Limitations of the CV Model
Computer Vision models require a vast training dataset in multiple enviorments to be accurate. Currenlty we only have a dataset of around 150 images. Therefore, the model's accuracy is wavering. The model has a high false positive rate - it gets confused by red items in the background or foreground. Dents on the can need to be made visible to the model and the captured image needs to avoid any glares/unintended lighting illusions. Remember, if it is hard for you as a human to identify where the dent is on the image/can, it will be that much harder for the model to do the same. This can be improved upon by creating a larger, more varied dataset and fine-tuning the model over various parametric combinations.

## Running and Making Changes to the Web Application
If you would like to make changes to the web application, there are a few steps you need to take. First step is you need to pull the iqds-dashboard branch from the project github. You can then make changes to the file, commit the changes, and push your changes to the iqds-dashboard branch. These changes will automatically update on vercel as it is linked to the iqds-dashboard banch. You can then log into vercel using the team email and get the web-application url under the Domains section of the intelligent-quality-detection-system project.

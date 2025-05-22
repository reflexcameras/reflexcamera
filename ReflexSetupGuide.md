<!-- <html>
<head>
  <style>
    img#logo {
      max-width: 200px; adjust as needed
      display: block;
      margin-bottom: 20px;
    }
  </style>
</head>

<body>

<!-- Logo -->
<!-- <img id="logo" src="./assets/images/logo-no-background.svg" alt="Your Logo"/> -->
# Reflex - Quick Guide

Position the camera within 4m of the roost. For optimal results position the camera slightly higher than the feature and look down onto it.

Plug in the battery

Plug in the camera - it will start automatically

Wait for the camera to start a Wi-Fi hotspot. This will take about 20 seconds

Connect to the cameras Wi-Fi hotspot with your device (phone or computer)
- SSID = `REFLEXCAMERA-REFLEX0000` - replace 0000 with the number printed inside the camera lid
- Password = `REFLEXREFLEX` - on windows it may ask you to enter a pin number rather than a password. in this case press `connect using a password instead` and enter `REFLEXREFLEX`

On your device (phone or computer) open chrome and head to [http://10.42.0.1:5000](http://10.42.0.1:5000) to see the camera's **Reflex settings webpage**

Use the camera's **Reflex settings webpage** to check:
- that the roost entrance is visible and the image includes the area beneath the feature where the bats will drop out
- that the green boxes cover only the area of interest and excludes anything that could move such as leaves and cobwebs
- that the camera is in focus - adjust the focus with the `Focus 0.0` to `Focus 10.0` slider or use ‘Autofocus’
- that the motion sensitivity is appropriate:
    - high sensitivity is suitable for most applications
    - medium sensitivity is suitable when there are lots of insects and the camera is close to the feature. The motion will only trigger when a larger portion of the image changes. This will will reduce false triggers associated with insects and noise.
- that the LED and FPS are appropriate to your survey objectives:
    - 120 FPS + LED Extreme (60) provides the clearest individual frames - *good for species identification, but depletes batteries more quickly*
    - 30 FPS and LED Low (20) maximises battery life - *good for  finding whether bats roost in a tree - batteries will last for a long time on this setting.  As bats move quickly it can be hard to identify to species level at 30FPS unless the bats spend time sat still at the roost entrance*

It is good practice to `clear logs` (on the **Log Page**) and `delete all` media (on the **Media Page**) when you have finished setting up the camera. You will have recorded some videos during the setup and it will save you time later if you delete these now.

***Leave it to run - the camera will now handle record automatically***

In the daytime the camera will turn itself off after 15 minutes and turn itself back on half an hour before sunset. If the camera unexpectedly powers off during setup this could be the reason, if this is the case just unplug the camera and plug it back in and it will reboot for another 15 minutes.

<div style="page-break-after: always;"></div>

# Reflex - Full Guide

## Before use in the field

Follow the steps in this guide to ensure you can connect to the REFLEX camera

Use the devices (phone or computer) that you intend to use when setting up the REFLEX camera in the field

### Physically adding or removing a Micro SD card

Turn the camera off

Lay the camera on its back so the clear window is facing up. Firmly press down on the side of the clear window that you want to open near to where the clear plastic meets the grey plastic and insert a suitable flat head screwdriver into the slot between the two plastics. Use the screwdriver to push the grey tab outwards and away from the clear window and the hinge will pop open. The clear plastic lid can then be opened.

![Apply pressure](./assets/images/Pressure.png)

![Open case](./assets/images/ScrewdriverOpen.png)

Lever the clear window up and open

Use a finger or soft plastic tool to push the micro SD card in or out of its slot (on the left hand side of the camera). If removing the micro SD card after it has been released tip the camera upside down so the card falls out being careful not to lose it.

The SD card will need formatting by using the `Format SD card` button on the **Media Page** on the **Reflex settings webpage**. Futher information is included below.

## Battery connections

Details of the Reflex Connectors and battery options are described here - [Reflex - Field Tested Kit](https://docs.google.com/document/d/18x_3zCUOL8CXIbLmqtegnimR8Hybc1Km8X352Bb5Ypg/edit?usp=sharing)

Connect the relevant cable to your battery

### Leisure Battery
Attach the `Reflex Car Battery Terminal Connector` onto the relevant battery post.

Black = negative, red = positive. The red and black indicators are located on the wires closest to to the metal rings.

Be careful not to touch both battery posts at the same time.

![Reflex Car Battery Terminal Connector
](./assets/images/CarBatteryConnector.jpg)
![Car battery with post connectors](./assets/images/CarBattery.png)

Waterproof the battery in a suitable bag or box. The cables can be run out of a roll top bag in a way to ensure that the bag is sealed properly and will remain waterproof.
![Car battery in a waterproof bag](./assets/images/CarBatteryInBag.png)

If your battery has posts rather than screws you can attach the cable to the battery with copper post connectors rather than screws. To do this, screw the lugs on the Reflex Car Battery Terminal Connector onto the bolts on the copper post connectors with the provided nuts. Then to attach them to the battery posts push the large hole on the copper post connectors over each battery post and tighten the relevant screws. 

Be careful not to touch both battery posts at the same time.
![Battery post connectors](./assets/images/Batterypostconnectors.png)

### Large talentcell
Attach the `Reflex 12v Male Barrel Jack Connector` to a suitably rated Talentcell.

Make sure this connection won’t disconnect during deployment.

Turn the Talentcell on.

![Reflex 12v Male Barrel Jack Connector](./assets/images/TalentcellConnector.jpg)
![Talentcell](./assets/images/Talentcell.png)

### Extension leads

`Reflex Standard Extension Cables` allow you to position the camera at height whilst the battery stays on the ground. Each ‘Reflex Standard Extension Cable’ is just over 4m long.

These cables connect between the battery cables described above and the port on the bottom of the camera. Multiple `Reflex Standard Extension Cables` can be linked together if you want to position the camera at a greater height. To buy additional cables use the contact form at the bottom of our webpage.

Using the ‘Reflex Standard Extension Cables’ batteries can positioned on the ground whilst the camera is running higher up in a tree. The `Reflex Standard Extension Cables` can be run up the tree wrapping around the trunk to stop them moving. This setup allows you to change the batteries on the ground without access to the camera. Make sure the camera is properly switched off using the `Shutdown` button (described below) before unplugging a battery.

![Reflex Standard Extension Lead](./assets/images/ReflexStandardExtensionLead.jpg)

<div style="page-break-after: always;"></div>

## Operating the camera

### Connecting power

- Attach the relevant battery connector (`Reflex Car Battery Terminal Connector` or `Reflex 12v Male Barrel Jack Connector`) to the battery
- Attach the `Reflex Standard Extension Cable` to the battery connector:
    - Line up lines on the battery connectors
    - Twist clockwise to lock, the lock symbol should line up with the dot
- Connect the extension cable to camera:
    - Line up the lines on the connectors
    - Twist clockwise to lock, the lock symbol should line up with the dot
- The camera will boot automatically
- Wait for 20 seconds whilst the camera turns on and starts a WiFi hotspot (or connects to a saved WiFi connection)

![Reflex Connection](./assets/images/ReflexConnection.png)

### Checking camera status

When camera is fully running the large infra-red LED will be lit and visible on a phone camera as a faint red glow

![Large LED Location](./assets/images/LargeLEDStatus.png)

<div style="page-break-after: always;"></div>

### Connecting to the settings page
Connect to the camera's WiFi hotspot

- SSID: REFLEXHOTSPOT-REFLEXXXXX
(XXXX will be replaced with the four digit number printed in your camera lid)
- Password: REFLEXREFLEX

Open an internet browser on phone or laptop and head to the web address [http://10.42.0.1:5000](http://10.42.0.1:5000)

### Updates
To check that your camera has the latest updates - compare the date at the bottom of the **Reflex settings webpage** with the latest update listed in the [REFLEX Camera Software Changelog](https://docs.google.com/document/d/1RrwahLq1giOLBvLCXRYnbYzcS-O2mhe-h3U20ZcZxuQ/edit?usp=sharing)

If the date on your camera's **Reflex settings webpage** is older than the latest date in the `REFLEX Camera Software Changelog` document then there are updates available for your camera. 

The camera needs to be connected to the internet to receive updates. A method is described in the 'Advanced Users' section below. If you have followed this guide but still need help updating the camera email: sam@reflexcameras.co.uk

### Automatic shutdown in the day
The camera will shutdown after 15 minutes if turned on in the daytime

The camera will automatically schedule itself to turn back on 20 minutes before sunset

If you are still setting up the camera when the camera shuts down, disconnect and reconnect power to turn the camera back on for another 15 minutes

The shutdown can be delayed by three hours using the `Delay Shutdown` button on the Schedule page of the **Reflex settings webpage**

<div style="page-break-after: always;"></div>

## Reflex settings webpage
The **Reflex settings webpage** is described below. This is provided by the camera over WiFi.

The website has five pages:
1. Home
2. Schedule
3. Log
4. Media
5. WiFi

<div style="page-break-after: always;"></div>

### Home

![Home Page](./assets/images/Home.png)

#### Video feed

A live video feed is displayed at the top of the page. This feed can be used to check the position of the camera and fine tune the motion detection setup.

Motion will only be detected within the green boxes, exclude any areas you are not interested in. The boxes turn red when the camera detects motion and is recording

The purple box is used by the autofocus function. When set the autofocus will attempt to focus within the area highlighted by this purple box. 

The live video feed is displayed at a lower resolution than the camera is recording this ensures the feed runs smoothly over WiFi. The videos recorded by the camera are of much higher quality.

The live video feed stops after three minutes (a countdown timer indicates how long the feed is live). Refresh the page to restart the video feed for another three minutes.

#### Settings

`Select Motion Box`
Select a box to move it’s edges, it will become bold when selected

`-` `Motion Boxes` `+` Add or remove additional green motion boxes

`↑` `Upper` `↓`
`→` `Left` `←`
`←` `Right` `→`
`↓` `Down` `↑`
Arrows to move box edges. Move the boxes to exclude cobwebs/ leaves and other objects which might move and trigger unwanted recordings.

`Default settings` Use this button to apply the camera's default settings.
These settings are optimised for long deployments and provide relatively low but acceptable lighting to minimise the camera's power consumption. For clearer images increase the led brightness to improve the video quality,

`Focus 0.0` to `Focus 10.0`
Slider for fine tuning the camera's focus. Right = close focus. Left = infinity. Watch the video feed and adjust the slider until the image is in focus. It can be helpful to zoom into the image to triple check it is in focus. This slider tends to be more reliable than the Autofocus.

`30FPS` `60FPS` `120FPS`
Frames per second (FPS) refers to the number of images recorded in each second of video. Higher frame rates provide clearer images with less blur. There is a tradeoff however as each frame needs more light to compensate for the short exposure time. Higher frame rates are therefore associated with better quality videos but also higher power consumption due to the LED brightness and CPU processing demands.

The best framerate will depend on your objective, see the table below.

| Objective                                                                                     | Recommended framerate | LED          | A 12v 50ah battery should last |
|-----------------------------------------------------------------------------------------------|-----------------------|--------------|--------------------------------|
| To record as many nights as possible                                                          | 30FPS                 | Low (20)     | 26 nights                      |
| To record good quality bright images                                                          | 60FPS                 | Medium (40)  | 19 nights                      |
| To record the best possible images for species identification and see bat behaviour in detail | 120FPS                | Extreme (60) | 16 nights                      |

`LED Low` `LED Medium` `LED High`
Default settings for LED brightness

`Motion Boxes` `Motion Average`
There are two different motion algorithms built into the camera, ‘average’ and ‘boxes’. These can be selected using this dropdown. The algorithms only search for changes within the green box.

‘Motion boxes’ - The default setting. This algorithm looks for pixel differences and draws boxes (blue on the live video feed) around changed pixels. If the blue box size is larger than the threshold value then a recording will start. This setting uses marginally more power than ‘Motion average’

‘Motion average’ - This algorithm looks for changes in the light, medium and dark light bands within the image. If any of these bands gets darker or lighter a recording will start. This mode is less sensitive to small movements than 'Motion boxes' but works very effetively when surveying a bat from a short distance when a bat will represent a larger area in the total frame. The algorithm is less sensitive to small changes so it can reduce the number of recordings of small insects.

To test the motion settings, set the camera up in a dark room. Load the webpage to watch the video stream and make some movement with your hand or another object. Test out different sensitivity settings to understand how they trigger. If the LED is on a low setting make sure the darker areas of the image are not triggering motion events. If the darker areas of the image are triggering motion events during testing, consider increasing the LED brightness or tuning the motion sensitivity with the `sensitivity` `motion area` and `motion frames` buttons.

`Autofocus Box` `Autofocus Centre` Decide whether to autofocus based on the purple box in the video feed by selecting `Autofocus Box` or based on the centre of the image by selecting `Autofocus Centre`. `Autofocus Centre` is often more reliable at focusing the image than `Autofocus Box`. If there are insufficient light levels some manual fine tuning is often needed after Autofocusing the camera.

`Autofocus x1` Initiate autofocus of the camera.

`Autofocus ∞ ON` `Autofocus ∞ OFF` Autofocus on boot. The camera will attempt to refocus every time it starts up. As the autofocus is not always reliable it is recommend that this setting is set to ‘Off’.

`LED 0.0` to `LED 60.0`
Fine tuning slider for LED brightness.

`Circular On` `Circular Off`
Circular On - Pre-record for 2 seconds before motion. Circular Off - Do not pre-record.

`Upgrade` 
Software updates may have been issued for the camera, see here: [REFLEX Camera Software Changelog](https://docs.google.com/document/d/1RrwahLq1giOLBvLCXRYnbYzcS-O2mhe-h3U20ZcZxuQ/edit?usp=sharing)

If you need help updating the camera email: sam@reflexcameras.co.uk 

To download an update the camera must be in WiFi mode with an internet connection.
Some updates can take some time. Wait for the progress tracker to reach 100% before refreshing the page. If the update hangs and does not change for 30 seconds or more manually refresh the page.

`Shutdown` 
To avoid data loss or damage to your camera, if it is running always shut it down properly before disconnecting the power.

Before disconnecting the power source, follow these steps to shut the camera down safely if it is on:
- Initiate the shutdown process by clicking `Shutdown`.
- Wait for the shutdown process to complete, indicated by a confirmation message.
- Once the confirmation message appears, it is safe to unplug the camera.

<div style="page-break-after: always;"></div>

### Schedule

![Schedule Page](./assets/images/Schedule.png)

The values in the table on this page detail the power statistics and scheduling of the camera. When deploying check that these are correct. Example valies are provided below.

|  Board Data            |  Current Value                                 |
|------------------------|---------------------------------------------|
|  <br>Input (V)         |  <br>13.50                                  |
|  <br>Power (W)         |  <br>4.46                                   |
|  <br>Current (A)       |  <br>0.30                                   |
|  <br>Temperature (°C)  |  <br>60.37                                  |
|  <br>System Time       |  <br>Mon, 20 Jan 2025<br> <br>15:42:15 GMT  |
|  <br>RTC Time          |  <br>Mon, 20 Jan 2025<br> <br>15:42:14 GMT  |
|  <br>Next Shutdown     |  <br>Tue, 21 Jan 2025<br> <br>08:23:00 GMT  |
|  <br>Next Startup      |  <br>Tue, 21 Jan 2025<br> <br>16:20:58 GMT  |
| Low Voltage Threshold  | n/a                                         |

`Latitude` `Longitude` `Set custom lat long`
The camera turns on 20 minutes before sunrise and turns off 20 minutes after sunset. The scheduling is calculated based on the cameras latitiude and longitude values. Enter new Lat Long values based on the cameras deployment location and press `Set custom lat long`, the camera will automatically calculate the correct times and update the scheduled values for shutdown and startup, new values are displayed in the table on this page.

`Delay Shutdown` Delay camera shutdown by three hours. Useful when downloading media over WiFi or extending the time you have for setting up a camera in the daytime.

`Set custom cutoff` The camera will turn off automatically and stop its scheduled routine if it detects an input voltage below this cutoff value

Small lithium battery packs i.e. talentcell batteries have their own BMS protection and run at a a constant voltage determined by an internal regulator. If using a battery with internal BMS protection disable the cutoff by setting the `Set custom cutoff` value to 0

To determine the appropriate cutoff value, please consult the battery manufacturer's datasheet.
For non-lithium batteries lower voltage cutoffs may extend run times but will likely reduce the overall lifespan of the battery. During testing an 11.3v cutoff was used with one 12v AGM battery which allowed for long run times with c.80% depletion but shortened the battery lifespan on each run. This is for informational purposes only it does not constitute a recommendation, check your battery datasheet and think about the lifespan of your battery.

Disclaimer: This feature is not designed to be a substitute for a dedicated battery management system. Reflex Cameras Limited accept no liability for any damage to the battery or other equipment resulting from an unsuccessful voltage cutoff. If battery health is critical to your application, you must use a dedicated system such as an undervoltage protection device or a solar controller. These devices are specifically designed to monitor battery voltage accurately and implement safe cutoffs reliably.

`Internet time sync` When connected to the internet (WiFi receive mode) - update the time and schedule on the camera by retrieving the current time and date from the internet.

`Custom date` `Custom time` `Set custom time` The fields `Set custom date` and `Set custom time` are populated with the current time and date on the device (phone or computer) connected to the camera. These values can be submitted without amendment so that the camera date and time match the time and date on the device (phone or computer). Alternatively these values can be manually changed to any other time and date. The `Set custom time` button will use the entries in the `Custom date` and `Custom time` fields and update the camera date and time based on these values. The camera will update it's schedule based on the new time.

<div style="page-break-after: always;"></div>

### Log

![Log Page](./assets/images/Log.png)

An interactive chart showing power statistics, shutdown and startup times. Depending on the number of logs this can take from 5 seconds to 1 minute load

`Clear logs` Clears the existing logs and restart the logging.

<div style="page-break-after: always;"></div>

### Media

![Media Page](./assets/images/Media.png)

A list containing all
- recorded videos in mp4 format
- images in jpeg format - a frame from the recorded video when the motion which triggered the recording was first detected
- motionoutput.csv - a csv file containing the motion statistics relating to each video

The jpeg and videos can be sorted by their motion statistics with the arrows in the column headers in the table.

If there are more than 1000 files saved on the camera only the first 1000 files will be listed and a message will state this. All of the files can still be downloaded using `Download all`.

The camera takes a few seconds to create jpeg and mp4 files from raw video after the last motion event. Refresh the page to see updates.

Media can be downloaded individually by clicking on the name of the file in the first column.

`Download all` Downloads video and images from the camera onto the connected device (phone or computer) over WiFi. Use Chrome on the connected device (phone or computer) as this handles large downloads well. The camera will zip up all saved media and transfer this zip file over WiFi. Once downloaded the file can be unzipped on the connected device (phone or computer) to view the video and images. If the storage on the camera is over half full the camera will zip and send 1gb folders at a time and delete the 1gb of media which was transferred from the camera when the download is complete. In this instance you will need to press `Download all` multiple times until the system has over half of it's space free and can send a larger zip file. If this is taking a long time consider extracting the media directly from the micro SD card and use a larger micro SD card on future deployments.

`Delete all` Deletes all media saved on the camera. To avoid duplicate media, after the media has been copied from the camera it is good practice to delete the videos on the camera before the next deployment.

`Format SD card` Format an SD card so that it can be used by the camera. **Warning** this will delete all media on the SD card. If this is the first time using the card you will need to turn the camera on and off for the card to be recognised. 

<div style="page-break-after: always;"></div>

### WiFi

![WiFi Page](./assets/images/WiFi.png)

`Switch between WiFi and hotspot` Change WiFi mode. For further details see 'Advanced Users'.

`SSID` `Passphrase` `Add` For further details see 'Advanced Users'. The dropdown `SSID` will list all WiFi connections in range of the camera that it is possible to connect to. The page may need refreshing if WiFi connections are not seen. The WiFi password associated with a WiFi connection should be entered in the `Passphrase` field. It is not possible for the camera to check the new SSID or Passphrase so ensure these values are correct before pressing `Add`. The `Add` button will add the WiFi connection to the camera. When a new connection is added the camera will switch to WiFi receive mode, the camera will reboot automatically and connect to this WiFi connection and this can take up to one minute. 

`Update WiFi Country Code` will change the WiFi settings so that the WiFi is compliant with a country other than GB (Great Britain).

`Update Timezone` will change the timezone from the default Europe/London (GMT) to ensure that the camera scheduling is correct in countries other than the UK. 

<div style="page-break-after: always;"></div>

## Field setup

Familiarise yourself with setting up the camera in the field by deploying it on some non-roost trees. Practice will mean you can set the camera up quickly and quietly with minimal disturbance on roost trees.

### Positioning light stand on tree

![Light Stand Setup](./assets/images/LightStandSetup.jpg)

Recommended procedure:
1. Remove leaves or cobwebs from the area of interest to avoid false triggers
2. Use a bungee cord to hold the camera stand on the tree for initial placement
3. Feed ratchet straps through the stand and tighten them so that the stand is secure
4. Remove the bungee cord (optional)
5. Screw the camera onto the tripod
6. Connect battery
7. Position the tripod so the camera is viewing the roost feature. It is best if the camera is tipped slightly forwards to reduce the number of false triggers from rain

### Housekeeping

![Tidy Cable](./assets/images/TidyCable.jpg)

Coil cables carefully when not in use. Avoid tight coiling. Instead, gently follow the cables natural curve and alternate between "over" and "under" loops to prevent twists. There are several good instruction videos on YouTube.

<div style="page-break-after: always;"></div>

## Reviewing footage

![Reviewing Images](./assets/images/Preview.png)

Once footage is downloaded from the camera it is quickest to scroll through the jpeg files saved alongside the videos in the media folder. These jpeg files are a frame extracted from the video at the time when a motion event first triggered the video recording. Most of the time they will contain the wildlife that triggered the recording so provide a quick way to review lots of media. Due to other triggers these images may not contain the wildlife so if 100% accuracy is needed a full review of videos may be required.

On Mac use preview

On Windows use FastPictureViewer or an equivalent

<div style="page-break-after: always;"></div>

## Advanced users

This section is for advanced users and contains methods to connect the cameras to the internet for an update.

### Checking status

There is a small indicator IR (Infra-red) LED located at the top of the camera on the PCB. This can be used to monitor the  WiFi mode. This LED is infra-red so only visible with a phone torch.
- If the REFLEX camera is producing an active WiFi hotspot the small IR indicator LED will flash rapidly
- If the REFLEX camera is in wifi mode the small IR indicator LED will flash slowly (once every 2 seconds)

![Small IR Indicator LED Location](./assets/images/IndicatorLEDStatus.png)

### Different modes

#### Hotspot mode
In this mode the camera broadcasts it’s own WiFi connection and hosts the **Reflex settings webpage** on 10.42.0.1:5000
The website can be accessed by device (phone or computer) connected to the camera WiFi network: 
SSID: REFLEXHOTSPOT-REFLEX0000 (replace 0000 with the number printed in your camera lid)
Password: REFLEXREFLEX

![Hotspot Mode](./assets/images/HotspotMode.png)

#### WiFi receive mode
In this mode the camera connects to nearby WiFi network. The camera broadcasts the **Reflex settings webpage** over this connection

The webpage address is defined by the router i.e. xx.xx.xx.xxx:5000

If the WiFi network has internet the camera can be updated in this mode by using the `Upgrade` button on the **Home Page** of the **Reflex settings webpage**.

![WiFi Receive Mode](./assets/images/WiFiReceiveMode.png)

##### WiFi receive mode android hotspot
On your android phone create a hotspot on your phone with the SSID `REFLEX` with password `REFLEXREFLEX`

Open the lid of the camera, press the button to switch from hotspot mode into WiFi mode or press the `Switch between WiFi and hotspot` button on the WiFi page of the camera's **Reflex settings webpage**.

Your camera may need powering off and on at this point.

Once re-powered in the mobile hotspot settings on your android scroll to bottom to find ‘connected devices’

Hold down on REFLEX camera hostname i.e. REFLEX0000 (printed in REFLEX lid)

The ip address is shown on the next page i.e. 192.168.167.181

Open a webpage and type in this ip address, followed by :5000,  into the search bar web i.e. http://XX.XX.XX.XX:5000

You will be connected to the camera

![Android Hotspot Settings](./assets/images/AndroidHotspot.png)

##### WiFi receive mode iOS hotspot
On your iPhone create a hotspot.

You will need to change the SSID to REFLEX and the password to REFLEXREFLEX

To change the iphone personal hotspot SSID you need to change the name of your phone, unfortunately there is no other way to do this on iOS. In the iPhone settings menu go to -> `General` -> `About` -> `Name` -> and change the name to `REFLEX`
To change the personal hotspot password go to `Personal Hotspot` -> `Wi-Fi Password` and change the hotspot password to `REFLEXREFLEX`
Turn on `Allow others to join`
Turn on `Maximise compatibility`

Restart iPhone. If it is turned off in the setings turn back on `Allow others to join`

Power up the reflex camera, if in WiFi mode it should connect to the iPhone hotspot

*Optionally connect your mac to this hotspot*

Find the hostname of the REFLEX camera (printed in REFLEX lid)

Open a webpage on chrome and type in this hostname followed by :5000, into the search bar web i.e. http://REFLEX0000.local:5000

You should now see the **Reflex settings webpage**

![iOS Hotspot Settings](./assets/images/iOSHotspot.png)

#### WiFi receive mode - additional connections

The camera can be connected to a normal WiFI connection at home or in an office. Due to complications with IP addresses this method is not included in this guide. If you need to use this feature please contact me at sam@reflexcameras.co.uk and I can supply more information.

# Product FAQs

## How long does a Reflex Camera last on a Talentcell 12V Lithium ion Battery Pack, 11.1V/9000mAh 99.9Wh Portable Power Bank Li-ion Battery?

In summer, you can expect approximately:

- **4 nights** at **30 FPS** with the LED set to **20**
- **3 nights** at **60 FPS** with the LED set to **40**
- **2 nights** at **120 FPS** with the LED set to **60**

## Can I watch Reflex Camera videos remotely over the internet?

Not directly. Each Reflex Camera broadcasts its own short‑range Wi‑Fi hotspot (effective up to about **10 m / 30 ft**). Within that range you can:

- **View a live stream** on a connected phone, tablet, or laptop  
- **Download recorded clips** straight from the camera

Because the hotspot is local‑only, the feed is **not routable over the wider internet**—you would need an external network solution (e.g., a router or cellular gateway) to make the stream accessible online.

### Can I power a Reflex Camera with a solar panel?

Yes. Reflex Cameras are designed to run from a **12 V leisure battery**, so pairing that battery with a solar panel and charge‑controller is an easy way to keep the system topped‑up and extend deployment time indefinitely.

- **Compatible panels:** Any 12 V (nominal) panel - typically **20 W – 100 W** depending on how much sun you expect and how many cameras share the battery.  
- **Shade‑friendly:** Even under light tree canopy a modern panel will trickle‑charge; you can mount it in a small gap or on a pole that reaches full sun.  
- **Extras you’ll need:**  
  - **PWM or MPPT charge controller** to protect the battery  
  - **Inline fuse** for safety  
  - Weatherproof cabling and mounts

With the right‑sized panel, the camera can stay in the field far longer than with the battery alone - often all season.

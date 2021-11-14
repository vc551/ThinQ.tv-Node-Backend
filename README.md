# ThinQ.tv Tiny Video Player
#### Current Version: 1.0.1 (first release version)
## NodeJS Backend
This **NodeJS** app is a website that provides a user-friendly way to interface with the **Raspbeery Pi** hardware driving the video player. The device is intended to slideshow a collection of user uploaded photos and videos. This server provides a way for the user to do so in a simple, user friendly way.
### Changes from last version
- Added Icons for Media Manage, Feedback Form, Documentation pages
- Changed name of the Manage Media page
- Remove unused `feedbackform.ejs` file
### Dependencies
- [ExpressJS](https://www.npmjs.com/package/express) - For Web Server Operation
- [EJS](https://www.npmjs.com/package/ejs) - For Website layout
- [Formidable](https://www.npmjs.com/package/formidable) - For File Uploads
- [HTTPS](https://www.npmjs.com/package/https) - For securing the connection using HTTPS
- [Method-Override](https://www.npmjs.com/package/method-override) - For DELETE requests
- [Pretty-bytes](https://www.npmjs.com/package/pretty-bytes) - For converting data from bytes to a human readable format
### Features
- Intended to run on a Raspberry Pi (Tried and tested on a Raspberry Pi Zero W)
- Allows Media File Upload (File Operation - C)
- Allows Media File Viewing (File Operation - R)
- (No File Operation - U suppoorted)
- Allows Media File Deletion  (File Operation - D)
- Allows viewing documentation hosted on a google server
- Allows viewing and filling a feedback google form
### Specifics
- The entry point is the `app.js` file.
- This server will upload files to a folder called `Media` in the user's home folder. **If this folder doesn't exist, the server will not work as expected.** Please make sure such a folder exists before running.
- This server works with HTTPS, however, in order for it to function, an SSL certificate and key pair will need to be generated in the `cert` folder. The files will need to be called `server.cert` and `server.key` respectively. If not present, the server will still run, but HTTPS will not work.
- Since the HTTPS certificate will be self-signed, modern browsers might flash error messages. Please trust the server and the website should work as intended.
- The server symlinks the `Media` folder inside the user's home folder to inside the server directory's `public` folder and serves it as static files. While every precaution has been taken to ensure safety, please make sure that no sensitive information is present in the server's `public` folder or the `Media` folder.
- While every precaution has been taken to ensure that this server is secure, due to the potential for different attacks, it is **NOT** recommended to expose this server to the internet.
#### Links
- GitHub: https://github.com/vc551/ThinQ.tv-Node-Backend
- ThinQ.tv: https://thinq.tv

#### A preview of how this server will run can be found here: https://vplayer-raspberrypi-website.herokuapp.com . Please note that this preview doesn't support the file upload/viewing/deletion functionality.
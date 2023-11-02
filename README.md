# Parking-Angel-Prototype

## Get started
1. First you need to follow the following guide (https://capacitorjs.com/docs/getting-started/environment-setup). If you have an android device you can skip the iOS requirements and vice versa. The android version of your app can be built on any platform, whereas the iOS version will require macOS to be build the app.
2. Pull down this repo `git clone https://github.com/smckee625/Parking-Angel-Prototype` and cd into the directory `cd Parking-Angel-Prototype`.
3. Run: `npm install`

4. Android - Run: `npx cap open android` this will open android studio were you can run the app in an emulator. Altenrativly if you enable 'devloper options -> usb debugging' on your android device and plug it into your computer you can install the app on device. To run the app simply click the green ’Run app’ button in android studio.

   iOS - Haven't got an iOS device but will require you to run: `npx cap open ios` and then from there build and run the app. More info (https://capacitorjs.com/docs/ios)

## Modify
This project uses svelte for the frontend. After making changes to the `/src/index.svelte` file and then you can run `npm run build` to compile the webapp to the `/public` folder. Once compiled you can then run the webapp in your browsers using `npm run start` without needing a mobile device. Alternatively if you run `npx cap sync` that'll update the android and ios versions and then all you need to do is open android studio(`npx cap open android`) or the ios equivalent(`npx cap open ios`) and compile it.

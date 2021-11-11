<!-- markdownlint-disable -->
<p align="center">
    <img width="800" src="https://raw.githubusercontent.com/Fabio286/open-ready-for/master/docs/screen.png">
</p>
<!-- markdownlint-restore -->

# Open Ready For 🖥️↔️📱

This is an open-source alternative to official Motorola Ready For Assistant desktop application, available only for Windows.  
The goal of this project is to provide an RDP connection indipendent from Motorola client and bring this feature to operating systems differend than Windows.

## Usage

In order to run this application you need to install [Node.js](https://nodejs.org/).

### Installation

Clone this repository on your machine:

``` bash
git clone https://github.com/Fabio286/open-ready-for.git
```

Install dependecies running following command in `open-ready-for` folder:

```bash
npm install
```

### Run

To start the application run the following command from open-ready-for folder and go to the address localhost:8080 from your browser.

```bash
npm run start
```

## How it works

This application through the QR code says to the phone to connect to its address.  
After the connection the phone waits for a remote connection for a while because it does not receive any response from application.  
During this time is possible to connect via RDP with the phone using a client different than Ready For Assistant.

## Tested with

- Motorola Moto Edge 20 Lite

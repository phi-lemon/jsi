# JSI

JSI is a website to get films information (director, casting, scores, rating...) from a rest API.

## Installation

You need python to run the web server.<br>
If you don't have python installed, download and install python from here : https://www.python.org/downloads/

### Get the website
Create a folder for the website and get the files :
```bash
git clone https://github.com/phi-lemon/jsi.git
```

### Install the web server locally
Create a separate folder for the server (outside of the website folder)
```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
python -m venv venv
```

Activate the virtual environment:

```bash
venv\Scripts\activate  # on windows
source venv/bin/activate  # on linux
```

Install the dependencies

```bash
pip install -r requirements.txt
```

Create and populate the project database

```bash
python manage.py create_db
```


## Usage

### Launch the server
```bash
venv\Scripts\activate  # on windows
source venv/bin/activate  # on linux
python manage.py runserver
```

### Launch the website
Go to the folder where you downloaded the project files (e.g. "jsi").<br/>
Simply open **index.html** in your web browser.

## Screenshots:

<img src="screenshots/page.png"><br/><br/>
<img src="screenshots/modal.png">

## License
[MIT](https://github.com/phi-lemon/jsi/blob/main/LICENSE.md)

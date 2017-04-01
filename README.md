# Dilesmo
Deep learning project

## Usage

This project's modeles rely on [Kaparthy's neuraltalk2](https://github.com/karpathy/neuraltalk2) and [tensorflow's im2txt](https://github.com/tensorflow/models/tree/master/im2txt) models.

The collections used are:
* MS COCO
* UIUC Pascal Sentence

In order to retrieve Pascal Sentence, one must first run `npm install` to retrieve node dependencies.
Then run successively `node pascal.js` and `python3 pascal.py`.
After that, images will be located in the `/pascal` folder, and captions in the `captions.json` file.

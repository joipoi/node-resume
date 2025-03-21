INITIALLY MADE BY @tiborsaas AT https://github.com/tiborsaas/node-resume
EDITED BY ME @joipoi
______________
# Description
This project lets you generate your own CV. It has a tempalte and data that gets filled in.
You can edit the data to make your own custom CV.

Currently I use it to generate both a Swedish and a English CV.

# Install/Use
- Make sure you have node and npm installed
- Clone or download the repo
- Go to the project root and run 'npm install' to install dependenceis
- run 'npm start' to generate the cv(for starters this would just generate my cv)
- if you want to generate your own cv you should change the data in the data folder(cv_en.json for english)
- You could also change the twig files in the views folder to change the template
- Keep in mind that the template file, data file and output file should all have the same name(not counting extension)
- You could in theory add lots of templates and data for example in other languages

# Dependenceis used
- chalk(for console output)
- html-pdf(Converts html to a pdf)
- twig(used for the template)

# Problems
- Acording to npm a lot of the packages here are outdated and may be unsafe. This does not really bother me because it works and I just
use it for myself, but should be noted.
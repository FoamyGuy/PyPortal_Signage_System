import os
import shutil

os.system("npm run build")

dirs = ["js", "css"]

#  Delete files

for file in os.listdir("../../static/"):
    if "." in file:
        print("Deleting: {}".format(file))
        os.remove("../../static/{}".format(file))

for cur_dir in dirs:
    for file in os.listdir("../../static/{}".format(cur_dir)):
        print("Deleting: {}".format(file))
        os.remove("../../static/{}/{}".format(cur_dir, file))

# Copy files

for file in os.listdir("build"):
    if "." in file and file != "index.html":
        shutil.copy("build/{}".format(file), "../../static/{}".format(file))

for cur_dir in dirs:
    for file in os.listdir("build/static/{}".format(cur_dir)):
        print("copying: {}".format(file))
        shutil.copy("build/static/{}/{}".format(cur_dir, file), "../../static/{}/{}".format(cur_dir, file))

shutil.copy("build/index.html", "../../templates/frontend/polotno_designer.html")

f = open("../../templates/frontend/polotno_designer.html", "r")
html_file_before = f.read()
f.close()

f = open("../../templates/frontend/polotno_designer.html", "w")
f.write(
    html_file_before.replace(
        '<div id="root"></div>',
        '<div id="root" data-props=\'{"data": {{ context_data }}}\'></div>{% csrf_token %}'
    ))

Kyle Wang's Personal Website
============================

# Jargon
##### general
* **Root Project Folder**: `kwang91.github.io` folder or the folder in which it contains `package.json` for your website project 
* **npm** : Package Manager for Node. Allows developers to manage coding libraries more efficiently. ex: the library used to start a server, the library used to parse markdown files etc...
* **node** : node is a software that is required to run javascript files in the terminal.
* **yarn** : Another package manager for node    
   
##### git  
   
* **repository** : a git project
* **commit** : saving your git project locally
* **push** : uploading your local project to remote(github)
* **pull** : syncing your local project with remote(github)
* **track** : git tracked files  means git is monitoring and controlling the file. Untracked means git is not monitoring and controlling the file. When changes occur to the file, git won't know about it. Untracked files won't be uploaded to remote.

#### local vs remote
git project on your computer is a different copy on what's on github.com
* **local** : git repository that you cloned onto your computer 
* **remote** :  git repository that's sitting online on github.com/kwang91.github.com

## Using Git

#### Steps to get your new updated code on the web
1. Run `git status` to see the current status of your local repository:  
  2 things to check for:  branch status and commit status:   
    ##### branch status  
    a. See if it says `"our branch is up-to-date with 'origin/master'."` this means your local repository is in sync with the remote repository     
    ##### commit status  
    a. if it says `"nothing to commit, working directory clean".` then you're good. It means you don't have any newly editted files that you need to commit. You can directly do a `git pull origin master`    
    b. if it says `Changes not staged for commit:` and it lists things in red, you have to commit your changes that you have done with your files before you do a `git pull`.  Run `git add -A` `git commit -am "your message here"`

2. Pull from the web `git pull origin master`  
  if it's successful then good.
  if you have conflicts, you have to open up each file and edit things (if that happens call me)
  or if you want to overwrite everything on your local repository with your remote repository just do a `git reset --hard origin/master`

#### Steps to update your local code to the web

1. Run `git add -A` 
2. Run `git status` and make sure the things that you have added/tracked are the things that you want to be uploaded. 
   if not you have to do `git rm PATH_TO_FILE --cached` on files you do not want added/tracked. or `git rm -r PATH_TO_FILE --cached` on directories you do not want to be added/tracked

3. Run `git commit -am "[A_NOTE_FOR_SAVING]"

4. Run `git push origin master` to upload changes
  in the case where the remote code is more up-to-date with your local code, you have to do a `git pull origin master` before you push. See [Steps to get your new updated code on the web](#steps-to-get-your-new-updated-code-on-the-web)  
  a. to forcibly upload your local code to remote, do `git push --force origin master` (HIGHLY NOT RECOMMENDED unless you know what you're doing)


## Installation
Either do 
```
npm install
```
or
```
yarn
```
to install dependencies  
**YOU SHOULD DO THIS EVERYTIME YOU DO A `git pull origin master`**

## Developing

1. Run the Local Development Server 
```
npm start
```

2. Browser should open automatically with url 127.0.0.1:1337 if not, open up your default browser and manually type in url, either `localhost:1337` or `127.0.0.1:1337`

3. Open up files that you want to edit in sublime text  

4. Save the file in sublime after editing

5. Refresh the browser page to see changes

6. `Ctrl+c` to stop the server running on the terminal window


## Generating Pdfs

1. open up the pdf config file: `config/pdf.config.json`  
2. add any new sources that you'd like to generate by following the json pattern:   
this is a source:    
```
    {
      "path": "./home/coverLetter/[COMPANY FOLDER NAME]/index.html",
      "name":"kyle_wang_[COMPANY FOLDER NAME]_coverLetter",
      "fileType": "pdf",
      "targetDir": "pdfs/coverLetters/[COMPANY FOLDER NAME]"
    }
```  
replace `[COMPANY FOLDER NAME]` with your any new company cover letters you have written.  
append this new source with the other sources  
```javascript
{
  "sources":[
    //... other sources
    {
      //...another source
    },  // <--- Don't Forget This Comma !!!
    {
      "path": "./home/coverLetter/companyxyz/index.html",
      "name":"kyle_wang_companyxyz_coverLetter",
      "fileType": "pdf",
      "targetDir": "pdfs/coverLetters/companyxyz"
    }
  ]
}
```

3. type `npm run pdf` to generate the pdfs  
4. commit and push
```
git add -A
git commit -am "updated pdfs"
git push origin master
```



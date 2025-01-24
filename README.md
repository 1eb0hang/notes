This is meant as a personal alternative to Obsidian, with the features that i actually care about.<br>
I want it to have features similar to Anytype, but ill build it u to evetually get to that point.<br>

Functionality
 - Java program that hosts webserver. This will make it cross platform without me having to learn Flutter
 - Allow you to specify loacal files/folders as part of displayed data set.
 	- I dont want to have to run the server on my phone to be able to see the data.
 	- I sholuld just be able to run it on my laptop and import app data/settings/etc from some local folder.

 - Must be a Web App (no page loading)
 - The app should be a markdown based notes app that updates display on a line by line/region by region basis
 	- `## Heading 2` should only be displayed when line is no longer being edited, and should be displayed as
 	   the raw markdown when line if in focus. 
 	- Have 2 diffrent modes, View and Edit
 		- View - no editing of text is possible. When line is in focus, should still be displayed as styled text
 		- Edit - mode where editing of text is performed. When line is in focus, styled text will be displayed as raw md/html 

TODO:
	-[x] Ability to add text without textbox
	-[x] Text updates in someway apon pressing enter
	-[ ] Add markdown styling
	-[ ] Make such that up and down arrows move cursor accross lines
	-[ ] Beable to read files from system.
	

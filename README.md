# TOHacks-backend
## Inspiration
The inspiration for Save The Crops is that starting from the last year when the pandemic had led to many lockdowns, there had been many articles written about how now farmers are struggling to keep up with the harvest because of a lack of labour to assist in the harvesting season because of the restrictions. Basically, the farmers couldn't do it on their own anymore so the crops would grow and rot because they were not being harvested or not being purchased. This has a negative impact on climate change because nitrous oxide emissions can originate from the rotting of these crops. Which means if we are able to harvest them properly this emission would be lessened. Furthermore, if crops are left to rot constantly then this would lead to the food supply chain also being impacted as there is now a shortage of produce coming in from local farms and thus Save The Crops is born to assist with this problem and connect the farmers with people willing to help out. 
 
## What it does
Basically, a farmer is able to fill out a form which makes a listing of their farm with all the needed information to contact them. Afterwards, a volunteer is able to create an account and see these listings and then choose to sign up to assist the farmer. The volunteer has a dashboard where their information is displayed and a list of all their appointments to volunteer at. Furthermore, there is another page which simply displays Food Bank options to donate the food to. If the farmers are unable to sell off their produce and are left with a lot of extra that would rot away than they are able to see some Food Bank options to get in contact with so that they are able to donate to them and help as everyone is in need of help during this time more than ever before. This not only prevents food waste but once again can help countless individuals in the community. 

## How we built it
The website was built using React to handle to frontend of things, by using Mongodb and Firebase we were able to handle the backend database the held the listings and user details. Essentially we used the MERN stack to create the website. Furthermore, we used sendgrid alongside courier so that an email is sent to the user whenever they register their account and another email is sent to them whenever they choose to volunteer at a farm.  

## Challenges we ran into
The biggest challenge we ran into is properly hooking up the backend and frontend with each other, having good state management is really important and without that everything can fall apart. When testing locally using postman and such we can see that the requests were working as intended but having that translate properly with the frontend of things was another story entirely. 

## Accomplishments that we're proud of
Using courier and sendgrid was really fun, it was something new and seeing it work properly whenever the emails would be sent was very satisfying and something to be proud of. As a service courier is very easy to use and intuitive which made it fun to work with.  

## What we learned
We learned that without proper state management many parts of your projects can fall apart, having a clear cut design from the start with the backend database worked out would save so much time and save you from many headaches down the line. Once again, we learned the basics of working with courier and sendgrid so that was something fun to take out of this project.
 
## What's next for Save The Crops
Fixing any minor bugs would be good start, shifting our server from being local to an api hosted on heroku for example would be another good move. Changing the Dashboard so that we can split the appointments into "current" and "past" ones based on the date would make it look more slick and easier for the user to track their work. 

# Relevvo Engineering Test

This is my submission for the Revevvo Engineering Test, specifically the front-end variation. It aims demostrate competency with Javacript, React, cloud technologies such as Firebase, Firestore and Vercel and other tools used in every-day full-stack engineering.

See full test instructions here: https://github.com/relevvo/relevvo-test

This demo application shows what a Yelp-like geo-aware application might do: Users saving and publishing information about their favorite shops, discovering and learning about shops closeby, and contributing meta information to those entities, in this case simply recording a 'Like'.

A more complete version might allow Vendor and Customer user types to interact with each other, with different types having different access rights and user experiences. For example a Vendor might publish a coupon or promotion and users could discover, share meta data about and possibly register usage of said coupons/promotions.

## Deployed app

https://relevvo-test.vercel.app/

## What this app does

Current UX flow involves the User starting the application, logging in via Google, recording their location, browsing to the list of stores to find closest existing stores, viewing details, registering Like's and obtaininig mapping/navigation details.

A User can also publish new stores along with GPS coordinate (hint: grab those from the google maps url). In a more complete application a mapping API would be used to assist the user in finding businesses and obtaining those GPS coordinates.

## Configuration

This application is currently deployed on Vercel and configured to run against a Firebase back-end running from my own account. In order to run locally setup a Firestore database with `Stores` and `Users` collections, along with enabling both `Anonymous` and `Google` auth methods, copy/rename the file `.env.local.example` to `.env.local` and fill in the environmental vars. Alternatively I'm happy to provide configuration to connect to the existing Firebase back-end.

 ## How to run locally

1. Clone this project to a local dir
2. Configure `.env.local` as described above
3. `npm run dev`


## Debate question: UI compoenent frameworks (ex MUI) vs CSS frameworks (ex Bootstrap) vs hand-coded

When it comes to building the actual UI for a web-app there are any approaches available and I'd like to offer a short discusison on the pros/cons of the three main approaches

### UI Components

For example, https://mui.com/ is a framework that provides a compehensive and exhausive set of fully-cooked components to be used directly in a React project. Other similar frameworks exist but this one is the most mature and popular.

Pros: 
- Very high quality components
- Consistent look and feel across the board
- Faster development time for the majority of cases
- Good documentation
- Appealing to the common React developer
- Not much fiddling with CSS

Cons:
- Highly opinionated 
- Hard to customize (all apps look the same)
- Learning curve

Bottom line is that for React engineers this approach will be most suited when building up clean apps that look and feel like the framework wants. Can get away without a designer.

### CSS Frameworks

For example https://getbootstrap.com/, this is a different approach from above where instead of working with code we're hand-writing html structure and attaching CSS classes to compose look and behavior.

Pros:
- High quality CSS
- Consistent look but not so much behavior
- Reduced fiddling with CSS
- Quick to pick up and become productive
- Can be customised (to some extent)
- Easy to break out of the framework when needed

Cons:
- Highly opinionated 
- Engineers still have to deal wth HTML and all its idiosyncrasies 
- Possible to customise but often stuck with lots of the defauls
- Big project sizes

Bottom line is that more front-end oriented developers will feel start with a high degree of experience of HTML and CSS and will be well equiped to leaverage these frameworks. They WILL however need to put in some work to cook up more structural UI.

### Home-made CSS

This is basically starting from scratch. 

Pros:
- No opinions, no "burden" to carry
- No need to fight with any framework
- Can satisfy detailed designs

Cons:
- WAY more work to get going
- If not done properly a project can become very messy
- HTML/CSS complexity is exposed to all engineers

This approach _may_ be chosen when a team requires complete control over look and feel, _and_ is well equiped with Designers and experienced Front-end Engineers. There are many good and vastly more bad approaches on building a full UI with CSS from scratch and so the right descisions made upfront will save serious pain later.

If going down this road, I would recommend following the basic approach used in CSS framework to build a good library of _atomic_, _portable_ and _composable_ classes, along with highly tested components in code to avoid the entire Engineering team to be burdened with CSS fatigue.

Starter projects can be leaveraged instead of starting completely from stratch, notably https://tailwindcss.com/

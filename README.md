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

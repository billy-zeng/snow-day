—— SnowDay ——

SnowDay is a website that compares Aeris Weather API data to a database of California
ski resorts to make planning trips to the snow easier. Weekly weather information and
snow depth are taken into account to identify "good" conditions, and resorts with "good" conditions are visually flagged accordingly. Users are able to add favorite resorts to a personal list, making checking on their preferred destinations simple. Resort information displays statistics about weather, the resorts' features, and provides quick access to their respective websites, ticketing websites, and phone contact.

—— Technologies Used ——

- JavaScript
- jQuery
- Semantic UI
- MongoDB
- Mongoose

—— Existing Features ——

- Landing on the front page, users can click through to log in or create an account.
- On the login page, frontend validation will prompt the user to fill unfilled fields. Backend validation will prompt the user if the username or email is invalid.
- On the signup page full front end validation ensures that all fields are filled out, and backend validation will prompt if the username or email address has already been used to create an account.
- Once the user has created an account they will be taken to the login page.
- Upon login, they are taken to the main gallery, where all Ski resorts in California are listed. A sun icon on the right hand side of the resort's title bar indicates favorable snow conditions.
- Users can click the resort title bars, which opens an accordion effect, displaying critical information about the resort:
  - Weekly average daytime temperature for the coming 7 days
  - Current estimated average snow depth
  - Total lifts and runs available at the resort
  - Base and Summit elevation numbers
  - links to the resort's general website, ticketing website, and telephone number
  - a 'favorite' toggle.
- Clicking the 'favorite' toggle will add the resort to the user's personal gallery, accessible from the nav bar at the top of the site
- Un-clicking the toggle removes the resort from the user's personal gallery.
- The user's personal gallery contains only the resorts the user has selected as their favorites.
- If the user un-toggles the resort as a favorite from the user gallery, a modal pops up to confirm the decision.
  - If the user confirms, the resort is removed from their gallery.
  - If the user declines, the resort remains in their gallery.
- The user may log out at any time by clicking the 'Log Out' button on the top navbar.
- Logging out returns the user to the front page.

—— Planned Features ——

- Expanding the Resort database to include information about run difficulty distribution, ie, greens vs blues vs black diamons vs double blacks, and to allow the user to see if the resort is suited to their own skill level.
- The ability for users to leave comments or ratings on individual resorts.
- A display on each resort that indicates how many users have 'favorited' it.

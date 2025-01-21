Project 3: NBA Player Performance Analytics

Overview:
This project will visualize historical and current NBA player statistics using free public APIs to aide in the analysis of how the shift in 3-point shooting has impacted scoring trends and efficiency metrics. The application consists of a drop down menu to select a specific player and three charts that will updated based on the player selected.  The three charts can be utilized to determine the impact of changing shot profiles between 2013 and 2023 where a significant increase in 3-point shooting has been seen across the NBA.
- Line Chart: Shows the trend of shot selection over the time period with one line showing the count of all field goal attempts and a second line indicating the count of 3-point shots attempted.
- Scatter Plot: Shows the relationship between 3-point field goal percentage and scoring average by year.
- Stacked Bar Chart: Shows the distribution of shot types across the ten year period.
 
Instructions on how to use and interact with the project:
- This project leverages requires node.js to run the application leveraging a server side script to create the API's to retrieve the data from the Postgres database.
- A local installation of the database is required and can be setup using the scripts located in the SQL Scripts folder
- Once the node.js is running and the database is installed, the application can be accessed at http://localhost:3000
- Select a player from the drop down menu and the charts will be updated with the selected player's data


Ethical Considerations:
There are minimal ethical considerations with this project due to:
- Data is not being scraped from any site as the API is free and does not require an API key
- Data is stored locally on the machine accessing the application
- Data is publicly available through multiple sites and is not being manipulated or enriched with any other data source

References for the data source(s):
- API Github Repo: https://github.com/swar/nba_api/tree/master/docs/nba_api
- API Documentation: https://nba-apidocumentation.knowledgeowl.com/help

References for any code used that is not your own:
- Leveraged sample API code snippets contained in the Github repo: https://github.com/swar/nba_api/tree/master/docs/nba_api
- Leveraged https://chatgpt.com to provide sample code snippets and to aide in identifying appropriate syntax

Data:
- The Postgres database contains just over 13,000 records spread across 4 tables and 2 views

Python Libraries Required
- nba_api
- pandas
- time

Javascript Libraries Required
- node.js
- D3.js
- Express.js
- pg


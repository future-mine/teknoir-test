# Teknoir Frontend Code Challenge

**General premise**: You are given a 3-4 day time period to complete the challenge. It is expected that you should be able to spend about 6-8 hours on implementing a solution. The solution will be evaluated in a review session to close it off.

## Practicalities

**Important**: In order to work on this challenge, please [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository so you can work on your own copy locally without accidentally pushing changes to this repository.

After you have forked the repository, [clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) it locally, and run `pnpm install` or `yarn` r `npm` to install dependencies.

Run `pnpm dev` to run the application on a local server at `localhost:3000`.

The project consists of minimal application boilerplate.

## The Challenge (Command-line)

Teknoir is a platform for data sicentists and machine learning engineers to collaborate on feature engineering workflows and Teknoir Web UI is the GUI for it.

In order to improve our user's experience we decided to make a [Command-line interface](https://en.wikipedia.org/wiki/Command-line_interface) that could potentially perform the actions that's possible via the UI by running custom commands.

To simplify the problem our UI has only two Pages: one page showing a list of counters and the other page showing a single selected counter.

Counters list page specification:

- By default there are no counters on the page.
- There should be a button to add new counters.
- When clicking on the add button user should give a unique name for the counter, then there will be a new counter added with the given name with value 0.
- Each counter would have a value, a name and a flag to show if the counter is locked or not.
- If the counter is locked it should not be possible to increase/decrease the counter value.
- On the list of counters there should be buttons to increase & decrease the counter value.
- It should be shown on the UI the counter's locked/unlocked state, without the ability to lock/unlock it.
- When clicking on the name of each Counter the user should be redirected to the conuter's single page.
- No other actions should be possible other than mentioned above.

Counter's single page specification:

- It should show the counter's name, value, increase/decrease buttons, lock/unllock button and a button to delete the counter.
- User should be able to increase/decrease the counter value by clicking on the buttons if it's not locked.
- User should be able to lock/unlock the counter.
- When clicking on Delete button the counter should be deleted and user should be redirected to counters list page.
- No other actions should be possible other than mentioned above.

Some hints for the Command-line:

- Each page should strictly implement the described page specification and the command-line should only be restricted to the possible page actions. eg: should not be possible to execute "delete" command on the counters list page.
- Having a keyboard shorcut to show the list of performable commands.
- Handling errors properly and having fallback scenarios.
- Don't spend much time on styling and put most focus on the logic robustness, flexibility and extendability.

Bonus points on:

- anything that can make the Command-line tool easier and simpler to use.

Using third party open source libraries is OK when it makes sense. _When_ it makes sense is once again up to you to decide!

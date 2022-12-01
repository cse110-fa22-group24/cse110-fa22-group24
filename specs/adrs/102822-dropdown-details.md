---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: ADR Template

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
# date: {YYYY-MM-DD when the decision was last updated}
# deciders: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-file MD025 -->
# How should we display the information associated with each job application?

## Context and Problem Statement

Our application's purpose is to help users track their job applications throughout the job application process.
A user may be applying to many different jobs, and each of these job applications will have information associated with it,
such as company, position, status, deadline, location, and other details. We want to figure out the best way to show the user this information,
so that they have all of the information they need without the interface being too visually overwhelming.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Ability to hold a lot of information (many jobs and many fields for each job)
* Provides structure and organization
* Visually appealing

## Considered Options

* Table
  * Pros: highly structured, keeps the user organized
  * Cons: displays all of the information all the time, may be visually overwhelming and impractical, if there are too many fields they may not fit well on one screen
* List
  * Pros: still structured, less information to display on screen (only title and essential information)
  * Cons: forced to omit some information
* List with Dropdowns
  * Pros: maintains structure, visually appealing, allows for all of the information to be included
  * Cons: not all information visable all the time, users have to click to get to details

## Decision Outcome

Chosen option: List with summaries always visible, and then expandable dropdowns with more details. This meets our need of displaying a large amount of information in a way that is structured and managable for users to interact with.

<!-- This is an optional element. Feel free to remove. -->
### Positive Consequences

* Aesthetically appealing
* Practical for users

<!-- This is an optional element. Feel free to remove. -->
### Negative Consequences

* Potential to be unintuitive for users if not well-designed (e.g. if it is not clear that we have dropdowns with more details)
* Will require more code and design/styling

<!-- markdownlint-disable-file MD013 -->

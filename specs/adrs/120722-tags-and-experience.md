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
# Should we implement tags and work experience?

## Context and Problem Statement

Our website design initially had a tagging feature and separate work experience page. However, our group is extremely busy and we are running out of time. 

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Time availability
* Whether or not we can build the function with the same quality of the rest of the application given the time constraints.

## Considered Options

* Yes
    * Pros:
      * Will have further functionality
    * Cons:
      * No time
* No
    * Pros:
      * We can spend time on other logistics and quality will be maintained
    * Cons:
      * Less functionality

## Decision Outcome

Chosen option: We will not implement Tags and Experience, and instead focus on polishing the application.

<!-- This is an optional element. Feel free to remove. -->
### Positive Consequences

* Quality is maintained
* We will not be on an unecessarily tight deadline

<!-- This is an optional element. Feel free to remove. -->
### Negative Consequences

* Less functions

<!-- markdownlint-disable-file MD013 -->
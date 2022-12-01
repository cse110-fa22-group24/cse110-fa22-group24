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
# Which storage method should be used for data?

## Context and Problem Statement

Our website will have to store user application data long term. There are multiple methods of doing so that are viable for our project, such as localStorage, IndexDB, or various other file storage API's. 

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Ease of use/accessibility (due to time constraint on project)
* Ability to store all the data types we need to store
* Reliability

## Considered Options

* localStorage
    * Pros:
      * Easy to use
      * Low-cost solution
    * Cons:
      * Not convenient for a variety of data types
* IndexDB
    * Pros:
      * Good documentation available
      * Can store all kinds of data types
      * Low barrier of entry
    * Cons:
      * Requires some reading to learn how to use
* Other storage API's
    * Pros:
      * More versatility
    * Cons:
      * More complicated API's
      * Additional learning required

## Decision Outcome

Chosen option: IndexDB, because it meets all our decision drivers. It should be accessible enough for us to learn to use quickly, it has extensive documentation available, and is compatible with the type of data storage we are looking for. 

<!-- This is an optional element. Feel free to remove. -->
### Positive Consequences

* Ease of use
* Reliability

<!-- This is an optional element. Feel free to remove. -->
### Negative Consequences

* Need to learn a new API

<!-- markdownlint-disable-file MD013 -->
---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 99
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
# What should the pipeline include?

## Context and Problem Statement

Our website will use github workflows to perform key actions such as linting, automated test running, and deployment. Which actions and with what packages should the pipeline include?

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* The tests and linting we are running should be easy learn due to time/resource restraints
* The pipeline should ensure quality and functionality of the application

## Considered Options

* Linting: eslint vs Prettier
    * eslint pros:
        1. does both code quality and code formatting
    * eslint cons:
        1. hard to accomodate different styles
        2. sometimes things are marked as needed to be linted when they are not
    * prettier pros:
        1. popular and does code formatting well
        2. can be run with eslint
    * prettier cons:
        1. does not check code quality
        2. could be overkill in combination with eslint
* End to End Testing: Cypress vs Puppeteer
    * cypress pros:
        1. good for testing a complete application
        2. has its own dashboard
    * cypress cons:
        1. need to learn
    * puppeteer pros:
        1. used for single page application
        2. learned in class
    * puppeteer cons:
        1. might be hard to add on a workflow since it opens a browser
* HTML Validation: automated vs manual
    * pros:
        1. automated validation will be a nice to have
        2. easy to check html quality
    * cons:
        1. manual is easier to run
        2. hard to find a good validator that is easy to integrate
* Code Quality: automated vs manual
    * pros:
        1. automated provides and extra layer of security on top of manual review
        2. creates a nice report to look at
    * cons:
        1. hard to find good code quality package
        2. could be overkill
* Deployment: Automatic vs Manual
    * pros:
        1. automatically deploys
    * cons:
        1. could deploy a bug that slips through when things are not ready yet.

## Decision Outcome

Chosen options:
* eslint: eslint can do part of what prettier can, and it is enough for the sake of this project. Additionally, custom rules can be defined in eslint to resolve any differences of best practices opinion
* puppeteer: since puppeteer was learned in class, cypress would take too much time to learn
* manual validation with lighthouse: automated HTML validation is overkill and unnecessary
* manual code quality check: since we have a two reviewer system, we believe that is enough of a check of code quality as we need and automatic checking takes too much time to integrate and is overkill for this app.
* automatic deployment: this was chosen because we believe that all code that makes it to master will have been thoroughly checked and will be free of bugs. Additionally we can run something back if a bug is found.
<!-- This is an optional element. Feel free to remove. -->
### Positive Consequences

* Ease of use
* Do not need to learn new APIs
* Comprehensive enough for the scope of the project

<!-- This is an optional element. Feel free to remove. -->
### Negative Consequences

* Need to remember to do manual reviews and validation

<!-- markdownlint-disable-file MD013 -->
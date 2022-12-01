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
# Why and How do we implement searching feature

## Context and Problem Statement

Our website will have to display user applications. As users will use this app to track the status of each application they have sent, it's natural that they want to search for a particular application.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Easier for users to find a particular application

## Considered Options 

* Search as we press enter

    Pros: Easier to implement;

    Cons: Need to press 'enter' every time;

* Search as we type

    Pros: Very convenient for users;

    Cons: Harder to implement;

  

## Decision Outcome

Chosen option: Implement searching as we type, because that makes it easier for users to search an application, and this is doable by 

using existing Javascript features.




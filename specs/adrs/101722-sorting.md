---
parent: Decisions
nav_order: 100
title: ADR Template
---

# Why do we need sorting functionality?

## Context and Problem Statement

Since our users will be applying to hundreds of companies, it is easier to keep track of the application if the list can be sorted by the way users desire. 

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Users will be able to deal well with a huge list of items
* quickly organize users' data and to find the data that users want

## Considered Options

* sorting by deadline
* sorting by company
* sorting by position
* sorting by URL
* sorting by type
* sorting by stage
* sorting by location
* sorting by status
* sorting by job description
* sorting by position title

## Decision Outcome
add lambda function for each category and used javascript built-in sorting function to sort. 

Chosen option: sorting by company, position, location, status, deadline

### Positive Consequences

* Ease of use
* Users can add a lot of applications and can still find the data they want easily

### Negative Consequences

* Need to spend time implementing frontend and backend code and also integrating them
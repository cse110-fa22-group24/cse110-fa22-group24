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
# How should the navbar be positioned?

## Context and Problem Statement

Our website will have a bar containing options for searching and sorting, and another bar for navigating between the home page and the profile page. The layout and positioning of these elements needs to be decided for best user experience.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* User accessibility and experience
* Space to place all options without overflow
* Responsiveness

## Considered Options

* Navigation, sorting, and searching on the top with job apps below
  * Pro: Easier to implement in the short term
  * Con: Harder to polish style in the long term 
* Navigation at the top, and sorting and searching on the left
  * Pro: More balanced appearance
  * Con: More difficult to implement in the short term

## Decision Outcome

Chosen option: sorting and searching on the left. This gives the page a more balanced appearance, and makes more sense for the placing of elements in a vertical layout. The page ends up having bars of fixed size, making the page more responsive.

<!-- This is an optional element. Feel free to remove. -->
### Positive Consequences

* Appearance
* Responsiveness

<!-- This is an optional element. Feel free to remove. -->
### Negative Consequences

* More complex styling and positioning

<!-- markdownlint-disable-file MD013 -->

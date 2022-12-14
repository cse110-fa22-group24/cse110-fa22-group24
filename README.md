# Team 24: The Hexadecimators

[Google Sheets: Team 24](https://docs.google.com/spreadsheets/d/1YDdLJqPIO-V7ctv1miaz47mQka0G8L5DxcCv4Mk2RLo/edit)

[GitHub: Team Page](https://github.com/cse110-fa22-group24/cse110-fa22-group24/blob/71fb6d14a7409ceef8ec237c466490903a061c3a/admin/team.md)

[Miro: Team 24 Starting Pitch](https://miro.com/app/board/uXjVPJ8rcC4=/)

[Google Slides: Team 24 Pitch](https://docs.google.com/presentation/d/1J6zCZ23b61nf89hl8gfiFk0LUtrNjuQRapIYU0aGVOk/edit)

[Figma](https://www.figma.com/file/MJNu9BIF2qha5lbEGSJRCw/CSE-110?node-id=4%3A39)

[Final Video](https://youtu.be/Z734BJ6D2-E)

## Pipeline

1. Pull the latest changes from `main`
2. Create a local branch
3. Run tests on changes
   1. Run `npm install` once to install dependencies
   2. Run `npx eslint .` to run lint on the entire directory
   3. Run `npm test` to run the unit tests
4. Commit changes to the local branch
5. Push the local branch to origin
6. Create a pull request to merge changes into `main`
7. Review changes (requires 2 approvals)
8. Merge changes

Merging changes into or pushing onto any branch will run the [CI Workflow Execution](https://github.com/cse110-fa22-group24/cse110-fa22-group24/actions/workflows/deploy.yml) action.  
This will run the [Unit Test Execution](https://github.com/cse110-fa22-group24/cse110-fa22-group24/actions/workflows/tests.yml) and [Lint Execution](https://github.com/cse110-fa22-group24/cse110-fa22-group24/actions/workflows/lint.yml) actions to run tests and the linter.  
If the branch is `main`, this will also run the [Deploy static content to GitHub Pages](https://github.com/cse110-fa22-group24/cse110-fa22-group24/actions/workflows/deployment.yml) action to host the static contents of the `./source` directory (HTML, CSS, and JavaScript) on GitHub Pages at [this URL](https://cse110-fa22-group24.github.io/cse110-fa22-group24/), and host the generated JSDoc documentation at [this URL](https://cse110-fa22-group24.github.io/cse110-fa22-group24/jsdoc/global).

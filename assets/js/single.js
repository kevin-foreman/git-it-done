var issueContainerEl = document.querySelector("#issues-container");

var displayIssues = function(issues) {
// check if there are no open issues
if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
// loop over the response data and create an <a> element for each issue
for (var i = 0; i < issues.length; i++) {
    // creaet a link element to take users to the issue on Github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    // create span to hold issue title
var titleEl = document.createElement("span");
titleEl.textContent = issues[i].title;

// append to container
issueEl.appendChild(titleEl);

// create a type element
var typeEl = document.createElement("span");

// check if issue is an actual issue or a pull request
if (issues[i].pull_request) {
  typeEl.textContent = "(Pull request)";
} else {
  typeEl.textContent = "(Issue)";
}

// append to container
issueEl.appendChild(typeEl);
issueContainerEl.appendChild(issueEl);
}
};

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    console.log(repo);
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to DOM function
                displayIssues(data);
                console.log(data);
            });
        }
        else {
            alert("There was a problem with your request!")
        }
    });
  };
  
  getRepoIssues("kevin-foreman/script-quiz");
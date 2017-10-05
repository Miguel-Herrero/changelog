var fs = require('fs');
var prependFile = require('prepend-file');
const Request = require('request');
const Moment = require('moment');

const generate = (user, password, sprint) => {
  const version = '1.26';

  const url = 'https://' + user + ':' + password + '@XXXX.atlassian.net/rest/api/2/search';
  
  Request({
    url,
    method: 'POST',
    json: true,
    body: {
      "jql":"project = XXXXX AND status in (Closed) AND Sprint = " + sprint + " ORDER BY updated",
      "fields":["id","key", "summary", "description", "assignee", "updated"]
    }
  }, function (error, response, body) {
      if (!error) {
  
        const issues = body.issues;

        const newIssues = issues.map(issue => {
          const title = '\n ## [' + issue.key + '] ' + issue.fields.summary + '\n';
          const subtitle = '_' + issue.fields.assignee.displayName + ' el ' + Moment(issue.fields.updated).format('DD-MM-YYYY') + '_\n\n';
          const description = (issue.fields.description || '');

          return title + subtitle + description;
        });

        
        let author = '';
        
        switch (user) {
          case 'miguel':
            author = 'Miguel Herrero';
          default:
            break;
        }
        const changelogVersion = '# ' + version + ' (' + Moment().format('YYYY-MM-DD') + ')\n*Coordinated by ' + author + '*';
        const data = changelogVersion + newIssues;

        // console.log(JSON.stringify(newIssues))

        prependFile('CHANGELOG.md', data, function (err) {
          if (err) {
            console.log('Error prepending');
          }
      
          console.log('Success');
        })

      }
    }
  )


  // console.log(user, password, sprint);
  // const data = user + ' | ' + password + ' | ' + sprint + '\n';

  // prependFile('CHANGELOG.md', data, function (err) {
  //   if (err) {
  //     console.log('Error prepending');
  //   }

  //   console.log('Success');
  // })
  // fs.appendFile('CHANGELOG.md', data, function (err) {
  //   if (err) {
  //     // append failed
  //   } else {
  //     // done
  //   }
  // })
}

module.exports = { generate };
var Connection = require('tedious').Connection;

  var config = {
    userName: 'antgroup',
    password: 'Artur$12',
    server: 'qxgq6s2ft7.database.windows.net',
    
    // If you're on Windows Azure, you will need this:
    options: {encrypt: true}
  };

  var connection = new Connection(config);

  connection.on('connect', function(err) {
    // If no error, then good to go...
    executeStatement();
    }
  );


var Request = require('tedious').Request;

  function executeStatement() {
    request = new Request("select 42, 'hello world'", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
    });

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });

    connection.execSql(request);
  }

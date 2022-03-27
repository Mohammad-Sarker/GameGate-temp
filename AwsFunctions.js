import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

//Login to Site
export const logIn = (email) => {
    var params = {
    	TableName: "GameGateAccounts",
        Key: {
        	"Email": email[0].value,
        }
    }
    var em = email[0].value;
    console.log(em);

    docClient.scan(params, function (err, data) {
        if (!err) {
            console.log(data)
        }
    }) 
    docClient.get(params, function(err, data) {
    	if (!err) {
        	console.log("no error");
                console.log(data.Item.Password, "Pw entered: " + pw[0].value);
                if (pw[0].value === data.Item.Password) {
                	window.location.href = "profilepage.html";
                        console.log("match");
                } else {
                        console.log("Wrong password or email");
                }
        } else {
                console.log("error");
        }
    })
}

//Add Data to DynamoDB SignUp    

export const signUp = (email, pw, username) => {
    var params = {
        TableName: "GameGateAccounts",
        Item: {
        	"Email": email[0].value,
                "Password": pw[0].value,
                "Username": username[0].value,
        }
    }
    
    var em = email[0].value;
    var user = username[0].value;
    var pr = pw[0].value;
    console.log(em, user, pr);
    docClient.put(params, function(err, data) {
    	if (!err) {
        	console.log("Worked");
                window.location.href = "profilepage.html";
        } else {
                console.log("Not Worked");
        }
    })
}

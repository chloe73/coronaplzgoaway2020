module.exports = function(app,connection)
{

    app.get('/',function(req,res){
        res.render('index.html');
    })

    app.get('/getAccmulate', function(req, res){
        var date = req.query.date +" 00:00:00";
        var mode = req.query.mode;
        var mySql_Query;

        switch(mode){
            case "weeks" :
                mySql_Query = "SELECT * FROM accumulate_logtable WHERE date > date_sub('2020-06-02',interval 7 day);;"
                break;
            case "days" : 
                mySql_Query = "SELECT * FROM accumulate_logtable WHERE date=\"" + date + "\";"

        }
        console.log("mysql_query : ",mySql_Query);

        connection.query(mySql_Query,function(err, rows){
            if(err) throw err;
            res.send(rows);
        })
    });

    app.get('/getDays', function(req,res){
		var date = req.query.date + " 00:00:00"; 	
		var mode = req.query.mode;								
		var mySql_Query;												

		switch(mode){
			case "weeks" :
				mySql_Query = "SELECT * FROM days_logtable WHERE date > date_sub('2020-06-02',interval 7 day);"
				break;
			case "days" :
				mySql_Query = "SELECT * FROM days_logtable WHERE date=\"" + date + "\";"
				break;
		}
		console.log("mySql_Query : " , mySql_Query);

		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; 
			res.send(rows);		 
		});
	});

    //DB 테스트용 
    app.get('/days_logtable', function(req,res){
        connection.query('SELECT * from days_logtable',(error,rows,fields)=>{
            if(error) throw error;
            //console.log('days_logtable is: ', rows);
            res.send(rows);
        })
    })

    app.get('/page/:category',function(req,res){
        const category = req.params.category;
        console.log("category : " , category);
        res.render(category +'.html');
    });

    app.get('/getRecent', function(req, res) {
        mySql_Query = "SELECT date, checkup, confirm, death from days_logtable ORDER BY date DESC limit 1;"
        connection.query(mySql_Query, function(err, rows) {
            if(err) throw err;
            res.send(rows);
        });
    });

    
}
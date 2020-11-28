module.exports = function(app,connection)
{
    const request = require('request');
	const key = "dfXVj6xAppnCiEE9G1nj6ENJ3PZtE%2BhA17ciiyYQorqHC3Uz1HHSl9QKU%2BTqh%2FAnQk0LDkTsiu5cE3DLo59fRg%3D%3D";

	function requestAPI(_method, _pageNo, _numOfRow, _startCreateDt, _endCreateDt, _callback){

		const pageNo = _pageNo;
		const numOfRow = _numOfRow;
		const startCreateDt = _startCreateDt;
		const endCreateDt = _endCreateDt;

		const url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/" + _method
		 	+ "?serviceKey=" + key
			+ "&pageNo=" + pageNo
			+ "&numOfRows=" + numOfRow
			+ "&startCreateDt=" + startCreateDt
			+ "&endCreateDt="+endCreateDt;

			request.get({
				url : url,
				method : "GET",
				headers: {
				 'Accept': 'application/json',
				 'Accept-Charset': 'utf-8',
				 'User-Agent': 'my-reddit-client'
		 		}
				},
				function(err, res, body){
					// console.log("res : " , body);
					if(err) console.log("request err : " , err);
					else{
						_callback(body);
					}
				})
	}
    app.get('/',function(req,res){
        res.render('index.html');
    })

    app.get('/page/:category',function(req,res){
        const category = req.params.category;
        console.log("category : " , category);
        res.render(category +'.html');
});



app.get('/getLatestInfoData',function(req,res){
     const page = 1;
    const numOfRow = 10;
    var start = req.query.start;
    var end = req.query.end;
    console.log(start + " to " + end)
    requestAPI("getCovid19InfStateJson", page, numOfRow, start, end,function(data){
        if(res)
            res.send(data);
        else {
            res.send(false)
        }
    });
});

app.get('/getWeeksDosiData',function(req,res){
     const page = 1;
    const numOfRow = 10;
    var start = req.query.start;
    var end = req.query.end;
    console.log("start : " + start + " end : " + end)
    requestAPI("getCovid19SidoInfStateJson", page, numOfRow, start, end,function(data){
        if(res)
            res.send(data);
        else {
            res.send(false)
        }
    });
});

app.get('/getLatestDosiData',function(req,res){
     const page = 1;
    const numOfRow = 10;
    var start = req.query.start;
    var end = req.query.end;
    var obj = {
        today : null,
        yesterDay : null
    }
    requestAPI("getCovid19SidoInfStateJson", page, numOfRow, start, start,function(data){
        if(res){
            obj.today = data;
            requestAPI("getCovid19SidoInfStateJson", page, numOfRow, end, end,function(data){
                if(res){
                    obj.yesterDay = data;
                    res.send(obj);
                }
                else {
                    res.send(false)
                }
            });
        }
        else {
            res.send(false)
        }
    });
});



app.get('/getComment',function(req,res){
    var id = req.query.id;
    var table = req.query.table;
    mySql_Query = "SELECT * from " + table + " WHERE id="+id+"";
    console.log("mySql_Query : " , mySql_Query);
    try{
        connection.query(mySql_Query, function(err, rows) {
            if(err) throw err; 
            res.send(rows);		
        });
    }
    catch(e){
        res.send(e);
    }
});


app.get('/getTitle',function(req,res){
    var table = req.query.table;
    var page = req.query.page;
    try{
        mySql_Query = "SELECT COUNT(*) AS count from " + table +";"; 
        connection.query(mySql_Query, function(err, rows) {
            if(err) throw err;

            var count = rows[0].count; 
            var startID = (count-1) - ((page-1) * 10) ;
            var endID = startID - 9 ;

            mySql_Query = "SELECT * from " + table +" WHERE id BETWEEN " + endID + " AND " + startID + " ORDER BY id DESC";
            console.log("mySql_Query : " , mySql_Query)
            connection.query(mySql_Query, function(err, rows) { 
                if(err) throw err;
                res.send({count:count, rows:rows});	
            });
        });
    }catch(e){
        res.send(e);
    }
});

}

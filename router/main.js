module.exports = function(app, connection)
{
    const request = require('request');
    const puppeteer = require('puppeteer');
    const key = "kgiQsVQw2UykeibGu%2B616KGEpGzEWwVk2APaO0lm1wR33oZ6j4F02a5AHVWyu8soS%2FgUWXXHMf%2F294wdlV0HrQ%3D%3D";
    function requestAPI(_method, _pageNo, _numOfRow, _startCreateDt, _endCreateDt, _callback){
        const pageNo = _pageNo;
        const numOfRow = _numOfRow;
        const startCreateDt = _startCreateDt;
        const endCreateDt = _endCreateDt;
        const url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/" + _method
            + "?serviceKey=" + key
            + "&pageNo=" + pageNo
            + "&numOfRows=" + numOfRow
            + "&startCreateDt=" + startCreateDt
            + "&endCreateDt="+endCreateDt;
            // console.log("url : " , url);
            request.get({
                url : url,
                method : "GET",
                headers: {
                 'Accept': 'application/json',
                 'Accept-Charset': 'utf-8',
                 'User-Agent': 'my-reddit-client'
                }
                },
                function(err, res, body){
                    // console.log("res : " , body);
                    if(err) console.log("request err : " , err);
                    else{
                        _callback(body);
                    }
                })
    }
    // 127.0.0.1:3000/ 로 들어왔을때 처리하는 서버코드
    app.get('/',function(req,res){
            // index.html을 클라이언트에게 rendering해라.
            res.render('index.html');
    });
    /**
        *   사용자가 요청한 화면을 응답하여 웹사이트를 그려준다.
        *   ex) 클라이언트에서 차트버튼을 누름 =>  127.0.0.1:3000/page/chart 요청  => chart.html을 그려줌
        */
    app.get('/page/:category',function(req,res){
            const category = req.params.category;
            console.log("category : " , category);
            res.render(category +'.html');
    });


    app.get('/getLatestInfoData',function(req,res){
        const page = 1;
        const numOfRow = 10;
        var start = req.query.start;
        var end = req.query.end;
        console.log(start + " to " + end)
        requestAPI("getCovid19InfStateJson", page, numOfRow, start, end,function(data){
            if(res)
                res.send(data);
            else {
                res.send(false)
            }
        });
    });
    app.get('/getWeeksDosiData',function(req,res){
        const page = 1;
        const numOfRow = 10;
        var start = req.query.start;
        var end = req.query.end;
        console.log("start : " + start + " end : " + end)
        requestAPI("getCovid19SidoInfStateJson", page, numOfRow, start, end,function(data){
            if(res)
                res.send(data);
            else {
                res.send(false)
            }
        });
    });
    app.get('/getLatestDosiData',function(req,res){
        const page = 1;
        const numOfRow = 10;
        var start = req.query.start;
        var end = req.query.end;
        var obj = {
            today : null,
            yesterDay : null
        }
        requestAPI("getCovid19SidoInfStateJson", page, numOfRow, start, start,function(data){
            if(res){
                obj.today = data;
                requestAPI("getCovid19SidoInfStateJson", page, numOfRow, end, end,function(data){
                    if(res){
                        obj.yesterDay = data;
                        res.send(obj);
                    }
                    else {
                        res.send(false)
                    }
                });
            }
            else {
                res.send(false)
            }
        });
    });

    // 질병관리본부 테이블의 제목ID에 맞는 내용을 가져와라
    app.get('/getComment',function(req,res){
        var id = req.query.id;
        var table = req.query.table;
        mySql_Query = "SELECT * from " + table + " WHERE id="+id+"";
        console.log("mySql_Query : " , mySql_Query);
        try{
            connection.query(mySql_Query, function(err, rows) {
                if(err) throw err; // 에러가 있을경우 에러메시지를 출력
                res.send(rows);      // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
            });
        }
        catch(e){
            res.send(e);
        }
    });
    // 1. 먼저 테이블의 레코드 개수를 가져온다
    // 2. 테이블의 제목을 날짜순으로 모두 가져온다
    // 합쳐서 레코드개수와 제목들을 함께 응답해준다.
    app.get('/getTitle',function(req,res){
        var table = req.query.table;
        var page = req.query.page;
        try{
            mySql_Query = "SELECT COUNT(*) AS count from " + table +";"; // 레코드 개수 가져오는명령
            connection.query(mySql_Query, function(err, rows) {
                if(err){
                    console.log("err : " ,err);
                    res.send(err);
                }
                var count = rows[0].count; // 첫번째 connection.query를 통해 가져온 레코드 개수를 저장
                var startID = (count-1) - ((page-1) * 10) ;
                var endID = startID - 9 ;
                mySql_Query = "SELECT * from " + table +" WHERE id BETWEEN " + endID + " AND " + startID + " ORDER BY id DESC";
                console.log("mySql_Query : " , mySql_Query)
                connection.query(mySql_Query, function(err, rows) { // 테이블의 제목을 날짜순으로 모두 가져오는 명령
                    if(err) throw err;
                    res.send({count:count, rows:rows}); // 레코드개수와 테이블제목들을 응답.
                });
            });
        }catch(e){
            res.send(e);
        }
    });
    app.get('/getGunpo', function(req, res){
        var date = req.query.date
        var mySql_Query;
        
        mySql_Query = "SELECT CMonth,count FROM gunpo;"
        console.log("mysql_query : ",mySql_Query);
        connection.query(mySql_Query,function(err, rows){
            if(err) throw err;
            res.send(rows);
        })
    });
    
    app.get('/getAllGunpo', async function(req, res) {
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.gunpo.go.kr/www/index.do',{timeout: 0, waitUntil: 'domcontentloaded'});
        const gunpoNum = await page.$eval('.issue_list .issue_item .issue_number', issue_number => issue_number.textContent.trim());
        console.log(gunpoNum);
        
        res.send(gunpoNum)
        await browser.close();
    })


}
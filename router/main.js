module.exports = function(app, connection)
{
	// 127.0.0.1:3000/ 로 들어왔을때 처리하는 서버코드
	app.get('/',function(req,res){
			// index.html을 클라이언트에게 rendering해라.
			res.render('index.html');
	});

	/**
		*  127.0.0.1:3000/getAccmulate?date='날짜'로 들어왔을때 처리하는 서버코드
		*    클라이언트(WebSite)에게 받은 날짜를 가지고, 데이터베이스에게 조회를 요청합니다.
		*    ex : 127.0.0.1:3000/getAccmulate
		*/
	app.get('/getAccmulate',function(req,res){
		var date = req.query.date + " 00:00:00"; 	// 클라이언트에게 받은 시간
		var mode = req.query.mode;			// 클라이언트에게 받은 모드("weeks" or "days")
		var mySql_Query;				// MySQL 언어를 저장할 변수

		switch(mode){
			case "weeks" :
				// "최근 1주일의 누적 확진자수를 검색해줘" MySQL 명령문장을 저장.
				// mySql_Query = "SELECT * FROM accumulate_logtable WHERE date > date_add(now(),interval -8 day);"
				mySql_Query = "SELECT * from accumulate_logtable ORDER BY date DESC limit 7";
				break;
			case "days" :
				 // "클라이언트에게 받은 날짜의 확진자수를 검색해줘" MySQL 명령문장을 저장.
				mySql_Query = "SELECT * FROM accumulate_logtable WHERE date=\"" + date + "\";"
				break;
		}
		console.log("mySql_Query : " , mySql_Query); // 서버 콘솔창에 출력. 이 문장은 위에서 담은 MySQL 변수를 출력

		// 데이터베이스 정보를 담은 변수를 사용해서 MYSQL 언어를 데이터베이스에 전달한다.
		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; // 에러가 있을경우 에러메시지를 출력
			res.send(rows);		 // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
		});
	});


	/**
		*  127.0.0.1:3000/getDays?date='날짜'로 들어왔을때 처리하는 서버코드
		*    클라이언트(WebSite)에게 받은 날짜를 가지고, 데이터베이스에게 조회를 요청합니다.
		*    ex : 127.0.0.1:3000/getDays?date='2020-05-03' => 2020-05-03 날짜의 일일 데이터
		*/
	app.get('/getDays', function(req,res){
		var date = req.query.date + " 00:00:00"; 	// 클라이언트에게 받은 시간
		var mode = req.query.mode;			// 클라이언트에게 받은 모드("weeks" or "days")
		var mySql_Query;				// MySQL 언어를 저장할 변수

		switch(mode){
			case "weeks" :
				// "최근 1주일의 일일 확진자수를 검색해줘" MySQL 명령문장을 저장.
				// mySql_Query = "SELECT * FROM days_logtable WHERE date > date_add(now(),interval -8 day);"
				mySql_Query = "SELECT * from days_logtable ORDER BY date DESC limit 7";
				break;
			case "days" :
				// "클라이언트에게 받은 날짜의 확진자수를 검색해줘" MySQL 명령문장을 저장.
				mySql_Query = "SELECT * FROM days_logtable WHERE date=\"" + date + "\";"
				break;
		}
		console.log("mySql_Query : " , mySql_Query);// 서버 콘솔창에 출력. 이 문장은 위에서 담은 MySQL 변수를 출력

		// 데이터베이스 정보를 담은 변수를 사용해서 MYSQL 언어를 데이터베이스에 전달한다.
		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; // 에러가 있을경우 에러메시지를 출력
			res.send(rows);		 // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
		});
	});


	/**
		*	사용자가 요청한 화면을 응답하여 웹사이트를 그려준다.
		*   ex) 클라이언트에서 차트버튼을 누름 =>  127.0.0.1:3000/page/chart 요청  => chart.html을 그려줌
		*/
	app.get('/page/:category',function(req,res){
			const category = req.params.category;
			console.log("category : " , category);
			res.render(category +'.html');
	});

	app.get('/getLatestDay',function(req,res){
		// mySql_Query = "SELECT Seoul+Busan+Daegu+Incheon+Gwangju+Daejeon+Ulsan+Sejong+Gyeonggi+Gangwon+Chungbuk+Chungnam+Jeonbuk+Jeonnam+Gyeongbuk+Gyeongnam+Jeju AS ROW_SUM FROM days_logtable ORDER BY date DESC LIMIT 1; "
		mySql_Query = "SELECT * from days_logtable ORDER BY date DESC limit 2;"
		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; // 에러가 있을경우 에러메시지를 출력
			res.send(rows);		 // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
		});
	});

	app.get('/getLatestAccmulate',function(req,res){
		// mySql_Query = "SELECT Seoul+Busan+Daegu+Incheon+Gwangju+Daejeon+Ulsan+Sejong+Gyeonggi+Gangwon+Chungbuk+Chungnam+Jeonbuk+Jeonnam+Gyeongbuk+Gyeongnam+Jeju AS ROW_SUM FROM days_logtable ORDER BY date DESC LIMIT 1; "
		mySql_Query = "SELECT * from accumulate_logtable ORDER BY date DESC limit 1;"
		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; // 에러가 있을경우 에러메시지를 출력
			res.send(rows);		 // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
		});
	});
	// 질병관리본부 테이블의 제목ID에 맞는 내용을 가져와라
	app.get('/getComment',function(req,res){
		var id = req.query.id;
		var table = req.query.table;
		mySql_Query = "SELECT * from " + table + " WHERE id="+id+"";
		console.log("mySql_Query : " , mySql_Query);
		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; // 에러가 있을경우 에러메시지를 출력
			res.send(rows);		 // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
		});
	});

	// 질병관리본부 테이블의 제목을 날짜순으로 모두 가져와라
	app.get('/getTitle',function(req,res){
		var table = req.query.table;
		mySql_Query = "SELECT * from " + table +" ORDER BY date DESC;"
		connection.query(mySql_Query, function(err, rows) {
			if(err) throw err; // 에러가 있을경우 에러메시지를 출력
			res.send(rows);		 // 에러가 없을경우 클라이언트에게 결과값(rows)를 응답.
		});
	});

}
module.exports = function(app,connection)
{
    
    app.get('/',function(req,res){
        res.render('index.html');
    })

    app.get('/days_logtable', function(req,res){
        connection.query('SELECT * from days_logtable',(error,rows,fields)=>{
            if(error) throw error;
            //console.log('days_logtable is: ', rows);
            res.send(rows);
        })
    })

    
}
const Router = require('koa-router');
const re = require('../../lib/re');
const guid = require('uuid/v4');
const config = require('../../config');

let router = new Router();

router.get('/account_catalog', async ctx => {
  ctx.body = ['娱乐','汽车','情感','美食','时尚','xxx'];
});

router.get('/get_province', async ctx => {
  ctx.body = await ctx.db.query('SELECT * FROM province');
});

router.get('/get_city/:proId', async ctx => {
  let {proId} = ctx.params;
  ctx.body = await ctx.db.query('SELECT * FROM city WHERE proID=?', proId);
});

router.post('/reg', async ctx => {
  let post = ctx.request.fields;

  if(!re.email.test(post['email'])){
    ctx.body = {err: 1, msg: 'email incorrect'};
  }else{
    await ctx.db.query('INSERT INTO user_table (email,password,type,display_name,slogan,catalog,icon,description,other_channels,name,identify_number,province,city,qq_wx,recommend_code,token,token_expires) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[post['email'],post['password'],post['type'],post['display_name'],post['slogan'],post['catalog'],post['icon'],post['description'],post['other_channels'],post['name'],post['identify_number'],post['province'],post['city'],post['qq_wx'],post['recommend_code'],'',0]);
    ctx.body = {err: 0};
  }

});

router.post('/login', async ctx => {
  let {email,password} = ctx.request.fields;

  let rows = await ctx.db.query('SELECT * from user_table WHERE email=?',[email]);
  if(rows.length == 0){
    ctx.body = {err: 1,msg: 'no this user'};
  }else{
    let row = rows[0];
    if(row['password'] != password){
      ctx.body = {err: 1,msg: 'password incorrect'};
    }else{
      token = guid().replace(/\-/g,'');
      token_expires = Math.floor((Date.now() + config.TOKEN_AGE) / 1000);

      await ctx.db.query('UPDATE user_table set token=?,token_expires=?',[token,token_expires]);
      ctx.body = {err: 0, token};
    }
  }
})

module.exports = router.routes();
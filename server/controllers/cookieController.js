const cookieController = {};


/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {


  res.cookie('ssid', `testvalue`, { maxAge: 30000 }, { httpOnly: true })

  return next()
}

cookieController.checkCookie = (req, res, next) => {
  const currSSID = req.cookies.ssid
  console.log('curr cookie is', currSSID)

  if (currSSID) {
    return next()
  } else {
    res.redirect('http://localhost:3000/login')
  }
}


module.exports = cookieController;

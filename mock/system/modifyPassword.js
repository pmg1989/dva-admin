let adminListData = global.AdminUsers

module.exports = {

  'PUT /api/modifyPassword': function (req, res) {
    const editItem = req.body
    let flag = false

    adminListData = adminListData.map((item) => {
      if (item.username === editItem.username) {
        flag = item.password !== editItem.oldPassword
        return flag ? item : editItem
      }
      return item
    })
    if (!flag) {
      res.json({ success: true, msg: '密码修改成功！' })
    } else {
      res.json({ success: false, msg: '旧密码不正确' })
    }
  },

}
